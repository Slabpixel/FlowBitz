# Version Update Guideline

This guide outlines all the files and locations that need to be updated when releasing a new version of FlowBitz.

## 📋 Quick Checklist

- [ ] Update `package.json` version
- [ ] Update `README.md` version references
- [ ] Add new release entry to `src/app/pages/Release.jsx`
- [ ] Update `src/library/core/WebflowBits.js` version
- [ ] Update `docs/COMPONENT.md` last updated version
- [ ] Update `docs/DEVELOPMENT.md` if needed
- [ ] Verify all version references are consistent

---

## 📝 Detailed Update Instructions

### 1. `package.json`

**Location:** Root directory

**What to update:**
- `version` field in the root object

**Example:**
```json
{
  "name": "flowbitz",
  "version": "2.3.6",  // ← Update this
  ...
}
```

**Note:** This is the **source of truth** for version numbers. Scripts like `create-version.js` read from here.

---

### 2. `README.md`

**Location:** Root directory

**What to update:**

#### A. Version Badge (Line 3)
```markdown
[![Version](https://img.shields.io/badge/version-2.3.6-blue.svg)](https://github.com/Slabpixel/FlowBitz)
```

#### B. CDN Examples (Lines 144-156)
Update version references in CDN examples:
```markdown
- `@latest` — newest stable build
- `@2.3.6` — pinned release  // ← Update this
- `@beta` — beta channel

<!-- Stable UMD -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.3.6/dist/flowbitz.umd.js"></script>  // ← Update this

<!-- ES module -->
<script type="module">
  import FlowBitz from 'https://cdn.jsdelivr.net/npm/flowbitz@2.3.6/dist/flowbitz.es.js';  // ← Update this
  await FlowBitz.init();
</script>
```

---

### 3. `src/app/pages/Release.jsx`

**Location:** `src/app/pages/Release.jsx`

**What to update:**

#### A. Add New Release Entry (Top of releases array, around line 13)

Add a new release object at the **beginning** of the `releases` array:

```jsx
const releases = [
    {
        version: "2.3.6",  // ← New version
        date: "December 15, 2025",  // ← Update date
        type: "stable",  // or "pre-release"
        description: "Brief description of what's in this release",
        changes: [
            "Change 1",
            "Change 2",
            "Change 3",
            // ... more changes
        ]
    },
    {
        version: "2.3.5",  // ← Previous version stays below
        date: "November 11, 2025",
        ...
    },
    // ... rest of releases
];
```

**Template for new release:**
```jsx
{
    version: "X.Y.Z",
    date: "Month Day, Year",  // Format: "December 15, 2025"
    type: "stable",  // Options: "stable", "pre-release", "Project Started"
    description: "One-line summary of the release",
    changes: [
        "Feature or fix description 1",
        "Feature or fix description 2",
        "Feature or fix description 3",
    ]
}
```

#### B. Update Structured Data (around line 100)

Update the `structuredData` object:
```jsx
const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FlowBitz",
    "description": "Interactive components library for Webflow - Release notes and version history",
    "url": "https://www.flowbitz.dev/release",
    "version": "2.3.6",  // ← Update this
    "datePublished": "2025-12-15",  // ← Update this (YYYY-MM-DD format)
    "applicationCategory": "Web Development",
    "operatingSystem": "Web Browser"
}
```

---

### 4. `src/library/core/WebflowBits.js`

**Location:** `src/library/core/WebflowBits.js`

**What to update:**

#### A. File Header Comment (Line 5)
```javascript
/**
 * FlowBitz - CDN Entry Point
 * A collection of interactive components for Webflow
 * 
 * @version 2.3.6  // ← Update this
 * @author Slabpixel Studio
 * @license MIT
 */
```

#### B. Constructor Version Property (around line 48)
```javascript
class WebflowBits {
  constructor() {
    this.version = '2.3.6';  // ← Update this
    this.initialized = false;
    ...
  }
}
```

---

### 5. `docs/COMPONENT.md`

**Location:** `docs/COMPONENT.md`

**What to update:**

#### Last Updated Line (Line 771)
```markdown
**Last Updated:** Based on WebflowBits v2.3.6  // ← Update this
```

---

### 6. `docs/DEVELOPMENT.md` (Optional)

**Location:** `docs/DEVELOPMENT.md`

**What to check:**
- If version-specific examples or references exist, update them
- Currently, this file doesn't have hardcoded versions, but check if any examples reference specific versions

---

### 7. `src/app/components/layout/Footer.jsx` (Optional)

**Location:** `src/app/components/layout/Footer.jsx`

**Note:** This file uses `process.env.REACT_APP_VERSION` (line 208), so it should automatically pick up the version from environment variables. If you're setting this manually, update it here.

---

## 🚀 Release Workflow

### For Stable Releases

1. **Update all files above** with the new version number
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "chore: bump version to 2.3.6"
   ```
3. **Build and deploy:**
   ```bash
   npm run deploy:stable
   ```
   This will:
   - Build the library
   - Create versioned directory (`dist/v2.3.6/`)
   - Update the `latest` symlink
   - Deploy to Vercel

### For Beta Releases

1. **Update `package.json` version** (use beta suffix: `2.3.6-beta.1`)
2. **Build and deploy beta:**
   ```bash
   npm run deploy:beta
   ```
3. **When ready to promote:**
   ```bash
   npm run deploy:promote
   ```

---

## 🔍 Verification Steps

After updating, verify consistency:

1. **Search for old version number:**
   ```bash
   grep -r "2.3.5" --exclude-dir=node_modules --exclude-dir=dist .
   ```
   Replace `2.3.5` with the previous version to find any missed references.

2. **Check version consistency:**
   ```bash
   grep -r "version.*2.3.6" --exclude-dir=node_modules --exclude-dir=dist .
   ```
   Replace `2.3.6` with the new version to verify all updates.

3. **Test the build:**
   ```bash
   npm run build:library
   ```
   Verify the build completes without errors.

4. **Check version in built files:**
   ```bash
   grep -r "2.3.6" dist/
   ```

---

## 📌 Version Numbering Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backward compatible)
- **PATCH** (0.0.X): Bug fixes (backward compatible)

**Examples:**
- `2.3.5` → `2.3.6` (patch: bug fix)
- `2.3.5` → `2.4.0` (minor: new feature)
- `2.3.5` → `3.0.0` (major: breaking change)

---

## 🎯 Quick Reference: File Locations

| File | Location | Key Fields |
|------|----------|------------|
| `package.json` | Root | `version` |
| `README.md` | Root | Badge, CDN examples |
| `Release.jsx` | `src/app/pages/` | New release entry, structuredData |
| `WebflowBits.js` | `src/library/core/` | Header comment, constructor |
| `COMPONENT.md` | `docs/` | Last updated line |

---

## ⚠️ Common Mistakes to Avoid

1. **Forgetting to add release entry** - Users won't see the new version in release notes
2. **Inconsistent date formats** - Use "Month Day, Year" format consistently
3. **Missing structured data update** - Affects SEO and schema markup
4. **Not updating both places in WebflowBits.js** - Header and constructor
5. **Forgetting to update README CDN examples** - Users might use old version URLs

---

## 📝 Release Notes Template

When adding a new release entry, use this template:

```jsx
{
    version: "X.Y.Z",
    date: "Month Day, Year",
    type: "stable",  // or "pre-release"
    description: "One-line summary: what's new in this release",
    changes: [
        "Major feature or improvement 1",
        "Major feature or improvement 2",
        "Bug fix or refinement 3",
        "Documentation or metadata update 4",
    ]
}
```

**Tips for writing release notes:**
- Start with the most important changes
- Use clear, user-friendly language
- Group related changes together
- Mention breaking changes first if any
- Include performance improvements
- Note any new components or features

---

## 🔗 Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Component Guide](./COMPONENT.md) - Adding new components
- [README](../README.md) - Project overview

---

**Last Updated:** Based on FlowBitz v2.3.5

