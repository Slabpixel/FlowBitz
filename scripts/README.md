# FlowBitz Build Scripts

This directory contains scripts for managing FlowBitz releases and versioning.

## 🚀 Available Scripts

### `create-beta.js`
Creates a beta version of the library for testing.

**Usage:**
```bash
npm run create-beta
```

**What it does:**
- Builds the library
- Creates `/dist/beta/` directory
- Copies library files to beta directory
- Creates version info file
- Provides beta URL for testing

### `create-version.js`
Creates a stable version of the library.

**Usage:**
```bash
npm run create-version
```

**What it does:**
- Builds the library
- Creates `/dist/v{version}/` directory
- Copies library files to versioned directory
- Updates `/dist/latest/` symlink
- Creates version info file

### `promote-beta.js`
Promotes beta version to stable release.

**Usage:**
```bash
npm run promote-beta
```

**What it does:**
- Reads current beta version
- Creates new stable version from beta
- Updates latest symlink
- Cleans up beta directory
- Provides stable URLs

## 🔄 Workflow

### Daily Development (Beta)
```bash
# 1. Make changes to library
# 2. Build and deploy beta
npm run build:beta
vercel --prod

# 3. Test beta version
# Visit: https://flowbitz.dev/beta/flowbitz.umd.js
```

### When Beta is Ready (Promote to Stable)
```bash
# 1. Update version number
npm version patch  # or minor/major

# 2. Promote beta to stable
npm run promote-beta

# 3. Deploy everything
vercel --prod
```

## 📁 Directory Structure

```
dist/
├── v1.0.0/                    # Stable version 1.0.0
│   ├── flowbitz.umd.js
│   ├── flowbitz.es.js
│   ├── flowbitz.umd.js.map
│   └── version.json
├── v1.1.0/                    # Stable version 1.1.0
│   ├── flowbitz.umd.js
│   ├── flowbitz.es.js
│   ├── flowbitz.umd.js.map
│   └── version.json
├── latest/                    # Symlink to current stable
│   ├── flowbitz.umd.js
│   ├── flowbitz.es.js
│   └── flowbitz.umd.js.map
└── beta/                      # Beta version (temporary)
    ├── flowbitz.umd.js
    ├── flowbitz.es.js
    ├── flowbitz.umd.js.map
    └── version.json
```

## 🌐 CDN URLs

### For Users
```html
<!-- Latest stable (recommended) -->
<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>

<!-- Specific version (for production) -->
<script src="https://flowbitz.dev/v1.0.0/flowbitz.umd.js"></script>

<!-- Beta version (for testing) -->
<script src="https://flowbitz.dev/beta/flowbitz.umd.js"></script>
```

### For Developers
```html
<!-- Simple URL (redirects to latest) -->
<script src="https://flowbitz.dev/flowbitz.umd.js"></script>
```

## ⚠️ Important Notes

- **Beta versions** are temporary and get cleaned up after promotion
- **Latest symlink** always points to the most recent stable version
- **Versioned URLs** are immutable and cached forever
- **Beta URLs** have short cache (5 minutes) for frequent updates
- **Latest URLs** have medium cache (1 hour) for balance

## 🐛 Troubleshooting

### Script fails with "No beta version found"
- Run `npm run build:beta` first to create beta version

### Script fails with "Source file not found"
- Run `npm run build:library` first to build the library

### Symlink creation fails
- Check if you have write permissions in the dist directory
- On Windows, you might need to run as administrator

### Version not updating
- Make sure to run `npm version` before promoting beta
- Check that package.json version is correct
