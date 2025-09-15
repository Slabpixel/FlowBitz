# Three3D Advanced Settings Guide

The `Three3D` component now supports advanced model rotation and lighting controls!

## 🎯 Model Rotation (in degrees)

Control the static rotation of your 3D model:

```jsx
<Three3D 
  modelPath="/3d/your-model.glb"
  // Model Rotation (in degrees)
  modelRotationX={-15}            // Model X rotation (degrees)
  modelRotationY={25}             // Model Y rotation (degrees)
  modelRotationZ={5}              // Model Z rotation (degrees)
/>
```

### Rotation Examples:
- **`modelRotationX={-15}`** - Tilt model backward 15°
- **`modelRotationY={25}`** - Rotate model right 25°
- **`modelRotationZ={5}`** - Roll model clockwise 5°

## 💡 Advanced Lighting Controls

### Shadow Settings

#### Directional Light Shadows
```jsx
<Three3D 
  modelPath="/3d/your-model.glb"
  // Directional Light Shadow Settings
  directionalLightCastShadow={true}           // Enable shadows
  directionalLightShadowMapSize={2048}       // Shadow quality (512, 1024, 2048, 4096)
  directionalLightShadowCameraSize={10}      // Shadow coverage area
/>
```

#### Point Light Shadows
```jsx
<Three3D 
  modelPath="/3d/your-model.glb"
  // Point Light Shadow Settings
  pointLightCastShadow={true}                // Enable shadows
  pointLightShadowMapSize={1024}             // Shadow quality
  pointLightDistance={20}                    // Light reach distance (0 = infinite)
  pointLightDecay={2}                        // Light falloff (0 = no falloff, 2 = realistic)
/>
```

### Light Spread & Blur

#### Shadow Map Sizes (Quality vs Performance):
- **`512`** - Low quality, fast rendering
- **`1024`** - Medium quality (default for point lights)
- **`2048`** - High quality (default for directional lights)
- **`4096`** - Ultra high quality, slower rendering

#### Shadow Camera Size (Directional Lights):
- **`5`** - Tight shadow coverage
- **`10`** - Medium coverage (default)
- **`20`** - Wide shadow coverage
- **`50`** - Very wide coverage

#### Light Distance & Decay (Point Lights):
- **`pointLightDistance={0}`** - Infinite light reach
- **`pointLightDistance={10}`** - Light reaches 10 units
- **`pointLightDecay={0}`** - No light falloff (unrealistic)
- **`pointLightDecay={2}`** - Realistic light falloff

## 🎨 Complete Example

```jsx
<Three3D 
  modelPath="/3d/character.glb"
  
  // Model Settings
  modelSize={3}
  modelPosition={[0, 0, 0]}
  useManualPosition={false}
  
  // Model Rotation
  modelRotationX={-10}
  modelRotationY={15}
  modelRotationZ={0}
  
  // Basic Lighting
  ambientLightIntensity={1.2}
  directionalLightIntensity={1.5}
  directionalLightPosition={[5, 5, 5]}
  pointLightIntensity={0.8}
  pointLightPosition={[-3, 2, 4]}
  
  // Advanced Lighting
  directionalLightCastShadow={true}
  directionalLightShadowMapSize={2048}
  directionalLightShadowCameraSize={8}
  pointLightCastShadow={true}
  pointLightShadowMapSize={1024}
  pointLightDistance={15}
  pointLightDecay={2}
  
  // Light Colors
  ambientLightColor="#f0f0f0"
  directionalLightColor="#ffffff"
  pointLightColor="#ffeb3b"
/>
```

## 🔧 Performance Tips

### For Better Performance:
```jsx
// Lower shadow quality
directionalLightShadowMapSize={1024}
pointLightShadowMapSize={512}

// Disable shadows entirely
directionalLightCastShadow={false}
pointLightCastShadow={false}
```

### For Better Quality:
```jsx
// Higher shadow quality
directionalLightShadowMapSize={4096}
pointLightShadowMapSize={2048}

// Enable shadows
directionalLightCastShadow={true}
pointLightCastShadow={true}
```

## 📝 Quick Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `modelRotationX` | number | 0 | X-axis rotation (degrees) |
| `modelRotationY` | number | 0 | Y-axis rotation (degrees) |
| `modelRotationZ` | number | 0 | Z-axis rotation (degrees) |
| `directionalLightCastShadow` | boolean | false | Enable directional light shadows |
| `directionalLightShadowMapSize` | number | 2048 | Shadow quality (512-4096) |
| `directionalLightShadowCameraSize` | number | 10 | Shadow coverage area |
| `pointLightCastShadow` | boolean | false | Enable point light shadows |
| `pointLightShadowMapSize` | number | 1024 | Point light shadow quality |
| `pointLightDistance` | number | 0 | Light reach distance |
| `pointLightDecay` | number | 2 | Light falloff factor |

## 🎯 Common Use Cases

### Product Showcase
```jsx
modelRotationX={-5}
modelRotationY={20}
directionalLightCastShadow={true}
directionalLightShadowMapSize={2048}
```

### Character Display
```jsx
modelRotationX={0}
modelRotationY={0}
pointLightCastShadow={true}
pointLightDecay={1}
```

### Architectural Visualization
```jsx
modelRotationX={0}
modelRotationY={45}
directionalLightShadowCameraSize={20}
pointLightDistance={50}
```

Now you have complete control over model rotation and advanced lighting effects! 🎉
