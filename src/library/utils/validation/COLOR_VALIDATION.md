# Color Validation System

FlowBitz sekarang dilengkapi dengan sistem validasi warna yang komprehensif untuk semua komponen yang menggunakan properti warna.

## ✨ Fitur

- ✅ Validasi format warna lengkap (hex, rgb/rgba, hsl/hsla, named colors, CSS variables)
- ✅ Normalisasi otomatis (menambahkan `#` untuk hex tanpa prefix, lowercase untuk named colors)
- ✅ Error messages yang jelas dengan suggestions
- ✅ Validasi untuk color arrays (gradients)
- ✅ Type safety dengan detailed validation response

## 📦 Komponen yang Menggunakan Validasi Warna

### Text Components
1. **gradientText** - `wb-colors`, `wb-border-color`
2. **shinyText** - `wb-text-color`, `wb-shine-color`
3. **tooltipText** - `wb-tooltip-background`, `wb-tooltip-color`
4. **textPressure** - `wb-text-color`, `wb-stroke-color`
5. **shuffle** - `wb-color-from`, `wb-color-to`
6. **rotatingText** - `wb-text-color`, `wb-background-color`

### Button Components
7. **gradientButton** - `wb-colors`, `wb-text-color`
8. **rippleButton** - `wb-ripple-color`

## 🎨 Format Warna yang Didukung

### 1. Hex Colors
```html
<!-- 3-digit hex -->
<div wb-gradient-text wb-border-color="#FFF">Text</div>

<!-- 6-digit hex -->
<div wb-gradient-text wb-border-color="#40ffaa">Text</div>

<!-- 8-digit hex with alpha -->
<div wb-gradient-text wb-border-color="#40ffaacc">Text</div>

<!-- Hex without # (akan dinormalisasi otomatis) -->
<div wb-gradient-text wb-border-color="FFF">Text</div>
```

### 2. RGB/RGBA Colors
```html
<!-- RGB -->
<div wb-tooltip-text wb-tooltip-background="rgb(0, 0, 0)">Text</div>

<!-- RGBA with alpha -->
<div wb-ripple-button color="rgba(255, 255, 255, 0.6)">Button</div>
```

### 3. HSL/HSLA Colors
```html
<!-- HSL -->
<div wb-text-pressure wb-text-color="hsl(120, 100%, 50%)">Text</div>

<!-- HSLA with alpha -->
<div wb-gradient-button wb-text-color="hsla(240, 100%, 50%, 0.9)">Button</div>
```

### 4. Named Colors
```html
<!-- CSS named colors -->
<div wb-tooltip-text wb-tooltip-color="white">Text</div>
<div wb-shuffle wb-color-to="crimson">Text</div>
<div wb-shiny-text wb-text-color="rebeccapurple">Text</div>
```

### 5. CSS Keywords
```html
<!-- currentColor (inherit dari parent) -->
<div wb-text-pressure wb-text-color="currentColor">Text</div>

<!-- transparent -->
<div wb-tooltip-text wb-tooltip-background="transparent">Text</div>
```

### 6. CSS Variables
```html
<!-- Custom properties -->
<div wb-gradient-text wb-border-color="var(--primary-color)">Text</div>
<div wb-gradient-button wb-text-color="var(--text-color)">Button</div>
```

### 7. Color Arrays (Gradients)
```html
<!-- JSON array format -->
<div wb-gradient-text wb-colors='["#40ffaa", "#4079ff", "#ff40aa"]'>
  Gradient Text
</div>

<!-- Comma-separated format -->
<div wb-gradient-button wb-colors="#40ffaa, #4079ff, rgb(255, 64, 170)">
  Gradient Button
</div>

<!-- Mix formats -->
<div wb-gradient-text wb-colors='["#FF5733", "rgb(64, 255, 170)", "hsl(240, 100%, 50%)"]'>
  Mixed Gradient
</div>
```

## 🔍 Validasi & Error Handling

### Validasi Otomatis
Semua warna akan divalidasi saat parsing. Jika format tidak valid, Anda akan mendapat warning di console:

```
WebflowBits: Invalid color format for wb-text-color: RGB values must be between 0-255
```

### Normalisasi Otomatis
Warna akan otomatis dinormalisasi:
- `FFF` → `#FFF`
- `RED` → `red`
- `CURRENTCOLOR` → `currentColor`

### Error Messages dengan Suggestions
Jika format salah, sistem memberikan suggestions:
```
WebflowBits: Invalid color format for wb-colors: "300, 100, 100"
Suggestion: RGB format should be: rgb(255, 255, 255) or rgba(255, 255, 255, 0.5)
```

## 💻 API Reference

### `validateColor(color)`
Validasi warna dengan detail response.

```javascript
import { validateColor } from './utils/validation/colorValidator.js';

const result = validateColor('#FF5733');
// {
//   isValid: true,
//   normalizedValue: '#FF5733',
//   format: 'hex',
//   error: null
// }
```

### `isValidColor(color)`
Quick validation (boolean only).

```javascript
import { isValidColor } from './utils/validation/colorValidator.js';

isValidColor('#FF5733'); // true
isValidColor('invalid'); // false
```

### `normalizeColor(color)`
Normalisasi warna.

```javascript
import { normalizeColor } from './utils/validation/colorValidator.js';

normalizeColor('FFF');  // '#FFF'
normalizeColor('RED');  // 'red'
```

### `validateColorArray(colors)`
Validasi array of colors untuk gradients.

```javascript
import { validateColorArray } from './utils/validation/colorValidator.js';

const result = validateColorArray(['#FF5733', '#40ffaa', '#4079ff']);
// {
//   isValid: true,
//   normalizedValue: ['#FF5733', '#40ffaa', '#4079ff'],
//   errors: null
// }
```

### `getColorFormatSuggestion(color)`
Mendapatkan saran untuk format yang salah.

```javascript
import { getColorFormatSuggestion } from './utils/validation/colorValidator.js';

getColorFormatSuggestion('FF5733');
// "Did you mean "#FF5733"? (hex colors need # prefix)"
```

## 📝 Contoh Penggunaan dalam Komponen

### Menggunakan di Custom Component
```javascript
import { parseElementConfig } from './utils/core/attributeParser.js';

class MyComponent {
  parseConfig(element) {
    const attributeMap = {
      // Single color
      textColor: { attribute: 'wb-text-color', type: 'color' },
      
      // Color array (gradient)
      colors: { attribute: 'wb-colors', type: 'colorArray', minColors: 2 },
      
      // Required color
      backgroundColor: { 
        attribute: 'wb-background-color', 
        type: 'color',
        required: true 
      }
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }
}
```

## ⚠️ Batasan & Catatan

1. **Minimum Colors untuk Gradient**: Minimal 2 warna untuk gradient arrays
2. **RGB Range**: RGB values harus 0-255
3. **HSL Range**: Hue 0-360, Saturation & Lightness 0-100%
4. **Alpha Range**: Alpha values (dalam rgba/hsla) harus 0-1
5. **CSS Variables**: Harus menggunakan format `var(--name)` dengan `--` prefix

## 🎯 Best Practices

1. **Gunakan Hex untuk Static Colors**
   ```html
   <div wb-gradient-text wb-border-color="#FF5733">Text</div>
   ```

2. **Gunakan RGBA untuk Transparency**
   ```html
   <button wb-ripple-button color="rgba(255, 255, 255, 0.6)">Click</button>
   ```

3. **Gunakan CSS Variables untuk Theming**
   ```html
   <div wb-gradient-button wb-text-color="var(--primary-color)">Button</div>
   ```

4. **Gunakan currentColor untuk Inheritance**
   ```html
   <div wb-text-pressure wb-text-color="currentColor">Text</div>
   ```

5. **Mix Formats dalam Gradients**
   ```html
   <div wb-gradient-text wb-colors='["#FF5733", "rgb(64, 255, 170)", "var(--accent)"]'>
     Flexible Gradient
   </div>
   ```

## 🚀 Update dari Versi Sebelumnya

Jika Anda mengupdate dari versi sebelumnya:

### Breaking Changes
- ❌ **Tidak ada breaking changes!** Semua format yang sudah ada tetap didukung
- ✅ Format invalid akan memberikan warning (bukan error)
- ✅ Sistem backward compatible dengan implementasi lama

### New Features
- ✅ Validasi format otomatis
- ✅ Normalisasi warna
- ✅ Error messages yang helpful
- ✅ Support untuk CSS variables
- ✅ Support untuk color keywords (currentColor, transparent)

## 📚 Resources

- **Color Validator Source**: `src/library/utils/validation/colorValidator.js`
- **Attribute Parser**: `src/library/utils/core/attributeParser.js`
- **MDN Color Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

---

**Version**: 2.1.2  
**Last Updated**: November 2025  
**Maintained by**: Slabpixel Studio

