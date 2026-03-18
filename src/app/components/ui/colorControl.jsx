import React from "react";
import { Input } from "./input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.jsx";
import { ColorPicker } from "./colorPicker.jsx";

/* ─── Named color fallback map ─── */
const NAMED_COLORS = {
  white: { r: 255, g: 255, b: 255, a: 1 },
  black: { r: 0, g: 0, b: 0, a: 1 },
  red: { r: 255, g: 0, b: 0, a: 1 },
  green: { r: 0, g: 128, b: 0, a: 1 },
  blue: { r: 0, g: 0, b: 255, a: 1 },
  yellow: { r: 255, g: 255, b: 0, a: 1 },
  cyan: { r: 0, g: 255, b: 255, a: 1 },
  magenta: { r: 255, g: 0, b: 255, a: 1 },
  transparent: { r: 0, g: 0, b: 0, a: 0 },
  currentcolor: { r: 255, g: 255, b: 255, a: 1 },
};

/* ─── Color parsing / conversion helpers ─── */

const parseToRgb = (colorStr) => {
  if (!colorStr) return { r: 0, g: 0, b: 0, a: 1 };

  const rgbaMatch = colorStr.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
  );
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  const hex8 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    colorStr,
  );
  if (hex8) {
    return {
      r: parseInt(hex8[1], 16),
      g: parseInt(hex8[2], 16),
      b: parseInt(hex8[3], 16),
      a: parseInt(hex8[4], 16) / 255,
    };
  }

  const hex6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorStr);
  if (hex6) {
    return {
      r: parseInt(hex6[1], 16),
      g: parseInt(hex6[2], 16),
      b: parseInt(hex6[3], 16),
      a: 1,
    };
  }

  return NAMED_COLORS[colorStr.toLowerCase()] || { r: 0, g: 0, b: 0, a: 1 };
};

const toHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;

  let h = 0;
  let s = 0;
  const l = sum / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    if (max === r) h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / diff + 2) / 6;
    else h = ((r - g) / diff + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
};

/** Split a comma-separated gradient value into individual colour strings */
const parseMultipleColors = (value) => {
  if (!value) return ["#000000", "#ffffff"];
  const parts = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return ["#000000", "#ffffff"];
  return parts.map((part) => part.replace(/\s+\d+%$/, "").trim());
};

/* ─── Shared input class ─── */
const INPUT_CLASS =
  "h-10 text-center text-link text-foreground px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

/* ═══════════════════════════════════════════════════════
   ColorRow — single colour: swatch + format selector + value inputs
   ═══════════════════════════════════════════════════════ */

const ColorRow = ({
  value,
  onChange,
  disabled,
  supportsAlpha = false,
  onRemove,
  canRemove = false,
  defaultFormat = "rgb",
}) => {
  const [format, setFormat] = React.useState(defaultFormat);

  const rgb = parseToRgb(value);
  const hexDisplay = toHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const emitChange = (r, g, b, a) => {
    if (supportsAlpha && a < 1) {
      onChange(`rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`);
    } else {
      onChange(toHex(r, g, b));
    }
  };

  const handleRgbFieldChange = (component, val) => {
    const numVal = Math.max(0, Math.min(255, parseInt(val) || 0));
    const newRgb = { ...rgb, [component]: numVal };
    emitChange(newRgb.r, newRgb.g, newRgb.b, newRgb.a);
  };

  const handleHexFieldChange = (hexVal) => {
    if (/^#[0-9A-Fa-f]{6}$/i.test(hexVal)) {
      onChange(hexVal);
    }
  };

  const handleHslFieldChange = (component, val) => {
    const max = component === "h" ? 360 : 100;
    const numVal = Math.max(0, Math.min(max, parseInt(val) || 0));
    const newHsl = { ...hsl, [component]: numVal };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    emitChange(newRgb.r, newRgb.g, newRgb.b, rgb.a);
  };

  const swatchColor = value?.startsWith("currentColor")
    ? "#ffffff"
    : value || "#000000";

  return (
    <div className="flex items-center gap-1 py-[0.375rem]">
      {/* Color Swatch — opens popover picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="w-6 h-6 rounded-md shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden"
            style={{ backgroundColor: swatchColor }}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[288px] p-3 rounded-lg border border-foreground/10"
          align="start"
          sideOffset={8}
        >
          <ColorPicker
            value={value}
            onChange={onChange}
            disabled={disabled}
            supportsAlpha={supportsAlpha}
            popoverOnly
          />
        </PopoverContent>
      </Popover>

      {/* Format selector (RGB / HSL / HEX) */}
      <Select value={format} onValueChange={setFormat}>
        <SelectTrigger className="w-[72px] shrink-0 h-10 px-2 py-3 gap-1 text-[0.875rem] leading-[100%] -tracking-[0.01em] font-medium text-foreground bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rgb">RGB</SelectItem>
          <SelectItem value="hsl">HSL</SelectItem>
          <SelectItem value="hex">HEX</SelectItem>
        </SelectContent>
      </Select>

      {/* Value inputs */}
      {format === "rgb" ? (
        <div className="flex gap-1.5 flex-1 min-w-0 text-[0.875rem] leading-[100%] -tracking-[0.01em] font-medium text-foreground">
          <Input
            type="number"
            value={rgb.r}
            onChange={(e) => handleRgbFieldChange("r", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="255"
          />
          <Input
            type="number"
            value={rgb.g}
            onChange={(e) => handleRgbFieldChange("g", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="255"
          />
          <Input
            type="number"
            value={rgb.b}
            onChange={(e) => handleRgbFieldChange("b", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="255"
          />
        </div>
      ) : format === "hsl" ? (
        <div className="flex gap-1.5 flex-1 min-w-0 text-[0.875rem] leading-[100%] -tracking-[0.01em] font-medium text-foreground">
          <Input
            type="number"
            value={hsl.h}
            onChange={(e) => handleHslFieldChange("h", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="360"
          />
          <Input
            type="number"
            value={hsl.s}
            onChange={(e) => handleHslFieldChange("s", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="100"
          />
          <Input
            type="number"
            value={hsl.l}
            onChange={(e) => handleHslFieldChange("l", e.target.value)}
            disabled={disabled}
            className={INPUT_CLASS}
            min="0"
            max="100"
          />
        </div>
      ) : (
        <Input
          type="text"
          value={hexDisplay}
          onChange={(e) => handleHexFieldChange(e.target.value.trim())}
          disabled={disabled}
          className="flex-1 h-10 text-link font-mono text-[0.875rem] leading-[100%] -tracking-[0.01em] font-medium text-foreground"
          placeholder="#000000"
        />
      )}

      {/* Remove button (only shown when multiple colours exist) */}
      {canRemove && onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="w-6 h-6 shrink-0 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors duration-150 disabled:opacity-50 text-sm"
        >
          ×
        </button>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MultiColorControl — gradient colour list with preview
   ═══════════════════════════════════════════════════════ */

const MultiColorControl = ({ value, onChange, disabled }) => {
  const colors = parseMultipleColors(value);

  const handleColorChange = (index, newColor) => {
    const next = [...colors];
    next[index] = newColor;
    onChange(next.join(", "));
  };

  const handleAddColor = () => {
    const last = colors[colors.length - 1] || "#000000";
    onChange([...colors, last].join(", "));
  };

  const handleRemoveColor = (index) => {
    if (colors.length <= 2) return;
    onChange(colors.filter((_, i) => i !== index).join(", "));
  };

  return (
    <div className="flex flex-col">
      {/* Gradient Preview */}
      <div
        className="w-full my-2 rounded-md h-6"
        style={{
          background: `linear-gradient(to right, ${colors.join(", ")})`,
        }}
      />

      {/* Colour rows */}
      {colors.map((color, index) => (
        <ColorRow
          key={index}
          value={color}
          onChange={(newColor) => handleColorChange(index, newColor)}
          disabled={disabled}
          supportsAlpha={false}
          onRemove={() => handleRemoveColor(index)}
          canRemove={colors.length > 2}
          defaultFormat="hex"
        />
      ))}

      {/* Add colour button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleAddColor}
        className="flex items-center justify-center gap-1.5 py-4 text-link font-medium text-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-base leading-none">+</span>
        <span>Add</span>
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ColorControl — main exported component
   ═══════════════════════════════════════════════════════ */

const ColorControl = ({
  value,
  onChange,
  disabled,
  supportsAlpha = false,
  multiple = false,
}) => {
  if (multiple) {
    return (
      <MultiColorControl
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return (
    <ColorRow
      value={value}
      onChange={onChange}
      disabled={disabled}
      supportsAlpha={supportsAlpha}
    />
  );
};

export { ColorControl };
