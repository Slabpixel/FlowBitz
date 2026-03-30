/**
 * FlowBitz - Color Utility Helpers
 * Provides color conversion utilities for Canvas 2D rendering.
 * Used by background components that need rgba() strings for fillStyle.
 */

/**
 * Convert a 3 or 6 digit hex color to an {r, g, b} object.
 * @param {string} hex - Hex color string (with or without #)
 * @returns {{ r: number, g: number, b: number } | null}
 */
export function hexToRgb(hex) {
  const clean = hex.replace('#', '');

  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }

  if (clean.length === 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  }

  return null;
}

/**
 * Convert any valid CSS color string to an rgba() string with the given alpha.
 * Supports: hex (#RGB, #RRGGBB), rgb(), rgba(), hsl(), hsla(), named colors.
 *
 * @param {string} color - Any valid CSS color string
 * @param {number} alpha - Alpha value between 0 and 1
 * @returns {string} rgba(r, g, b, alpha) string
 */
export function colorToRgba(color, alpha) {
  if (!color || typeof color !== 'string') {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const trimmed = color.trim();

  // --- hex ---
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmed)) {
    const rgb = hexToRgb(trimmed);
    if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }

  // --- rgba(...) — replace existing alpha ---
  const rgbaMatch = trimmed.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*[\d.]+\s*\)$/
  );
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`;
  }

  // --- rgb(...) — add alpha ---
  const rgbMatch = trimmed.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
  );
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
  }

  // --- hsla(...) — replace existing alpha ---
  const hslaMatch = trimmed.match(
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*[\d.]+\s*\)$/
  );
  if (hslaMatch) {
    return `hsla(${hslaMatch[1]}, ${hslaMatch[2]}%, ${hslaMatch[3]}%, ${alpha})`;
  }

  // --- hsl(...) — add alpha ---
  const hslMatch = trimmed.match(
    /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
  );
  if (hslMatch) {
    return `hsla(${hslMatch[1]}, ${hslMatch[2]}%, ${hslMatch[3]}%, ${alpha})`;
  }

  // --- named color — resolve via temporary canvas ---
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = trimmed;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch (_) {
      // fall through to default
    }
  }

  return `rgba(0, 0, 0, ${alpha})`;
}
