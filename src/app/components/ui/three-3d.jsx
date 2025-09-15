import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Helper function to convert degrees to radians
const degToRad = (degrees) => (degrees * Math.PI) / 180;

const Three3D = ({
  modelPath = '/3d/model.glb',
  className = '',
  fallbackImage = null,
  autoRotate = false,
  rotateSpeed = 0.5,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  // Simple orbit controls settings (in degrees - much easier to understand!)
  enableOrbit = true,
  orbitMinDistance = 2,
  orbitMaxDistance = 10,
  // Vertical rotation limits (up/down movement)
  yMin = 0,     // Minimum vertical angle (degrees)
  yMax = 180,   // Maximum vertical angle (degrees)
  // Horizontal rotation limits (left/right movement)
  xMin = -180,  // Minimum horizontal angle (degrees)
  xMax = 180,   // Maximum horizontal angle (degrees)
  orbitDamping = true,
  orbitDampingFactor = 0.05,
  // Simple mouse tracking (optional - doesn't interfere with orbit controls)
  enableMouseTracking = false,  // Set to true to enable mouse following
  mouseSensitivity = 0.3,       // How much the model follows mouse (0.1-1.0)
  // 3D Object Customization Props
  modelSize = 2,                // Model size multiplier (1=small, 2=normal, 4=large)
  modelPosition = [0, 0, 0],    // Model position [x, y, z] (manual override)
  useManualPosition = false,    // Use manual position instead of auto-centering
  // Camera Settings
  cameraPosition = [0, 0, 5],   // Camera position [x, y, z]
  cameraFOV = 50,               // Camera field of view (30-90 degrees)
  // Material Settings
  metalness = 0.0,              // Material metalness (0.0-1.0)
  roughness = 1.0,              // Material roughness (0.0-1.0)
  modelColor = null,            // Model color (hex string like "#ff0000" or null for original)
  // Lighting Settings
  ambientLightIntensity = 1.0,  // Ambient light intensity (0.0-2.0)
  directionalLightIntensity = 1.0, // Directional light intensity (0.0-2.0)
  directionalLightPosition = [5, 5, 5], // Directional light position [x, y, z]
  pointLightIntensity = 0.5,    // Point light intensity (0.0-2.0)
  pointLightPosition = [-5, -5, 5], // Point light position [x, y, z]
  // Light Colors (hex strings)
  ambientLightColor = "#ffffff",    // Ambient light color
  directionalLightColor = "#ffffff", // Directional light color
  pointLightColor = "#ffffff",       // Point light color
  // Advanced Lighting Settings
  directionalLightCastShadow = false, // Directional light casts shadows
  directionalLightShadowMapSize = 2048, // Shadow map resolution (512, 1024, 2048, 4096)
  directionalLightShadowCameraSize = 10, // Shadow camera frustum size
  pointLightCastShadow = false,      // Point light casts shadows
  pointLightShadowMapSize = 1024,    // Point light shadow map resolution
  pointLightDistance = 0,            // Point light distance (0 = infinite)
  pointLightDecay = 2,               // Point light decay factor (0 = no decay)
  // Model Static Rotation (in degrees)
  modelRotationX = 0,                // Model X rotation (degrees)
  modelRotationY = 0,                // Model Y rotation (degrees) 
  modelRotationZ = 0                 // Model Z rotation (degrees)
}) => {
  // Convert degrees to radians for Three.js (internal conversion)
  const orbitMinPolarAngle = degToRad(yMin);
  const orbitMaxPolarAngle = degToRad(yMax);
  const orbitMinAzimuthAngle = degToRad(xMin);
  const orbitMaxAzimuthAngle = degToRad(xMax);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const controlsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerReadyRef = useRef(false);
  
  // Simple mouse tracking state (only if enabled)
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const initializedRef = useRef(false);

  // Callback ref to detect when container is ready
  const setContainerRef = React.useCallback((element) => {
    console.log('setContainerRef called with:', element);
    containerRef.current = element;
    if (element && !containerReadyRef.current) {
      console.log('Setting container ready');
      containerReadyRef.current = true;
      // Force re-render to trigger useEffect
      setLoading(prev => !prev);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect running, containerReady:', containerReadyRef.current, 'containerRef:', !!containerRef.current, 'initialized:', initializedRef.current);
    
    if (!containerReadyRef.current || !containerRef.current) {
      console.log('Container not ready, returning');
      return;
    }

    if (initializedRef.current) {
      console.log('Already initialized, skipping Three.js setup');
      return;
    }

    console.log('Starting Three.js initialization');
    initializedRef.current = true;
    const container = containerRef.current;
    
    // ===== SCENE SETTINGS =====
    const scene = new THREE.Scene();
    scene.background = null; // Change to new THREE.Color(0x000000) for black background
    sceneRef.current = scene;

    // ===== CAMERA SETTINGS =====
    const camera = new THREE.PerspectiveCamera(
      cameraFOV, // FOV: 30-90 degrees (50=normal, 30=zoomed, 90=wide)
      container.clientWidth / container.clientHeight,
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    // Camera position from props [x, y, z]
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    cameraRef.current = camera;

    // ===== RENDERER SETTINGS =====
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // Smooth edges
      alpha: true // Transparent background
    });
    
    // Get actual container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    console.log('Container dimensions:', width, 'x', height);
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 5)); // Limit pixel ratio for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    // Ensure canvas fills container completely
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ===== ORBIT CONTROLS SETTINGS =====
    if (enableOrbit) {
      const controls = new OrbitControls(camera, renderer.domElement);
      
      // ===== ORBIT LIMITS =====
      controls.minDistance = orbitMinDistance; // Closest zoom
      controls.maxDistance = orbitMaxDistance; // Farthest zoom
      controls.minPolarAngle = orbitMinPolarAngle; // Vertical rotation limit (top)
      controls.maxPolarAngle = orbitMaxPolarAngle; // Vertical rotation limit (bottom)
      controls.minAzimuthAngle = orbitMinAzimuthAngle; // Horizontal rotation limit (left)
      controls.maxAzimuthAngle = orbitMaxAzimuthAngle; // Horizontal rotation limit (right)
      
      // ===== ORBIT BEHAVIOR =====
      controls.enableDamping = orbitDamping; // Smooth movement
      controls.dampingFactor = orbitDampingFactor; // How smooth (0.01-0.1)
      controls.enableZoom = enableZoom; // Mouse wheel zoom
      controls.enablePan = enablePan; // Right-click drag to pan
      controls.enableRotate = enableRotate; // Left-click drag to rotate
      
      // ===== ORBIT TARGET =====
      controls.target.set(0, 0, 0); // Point to orbit around
      
      // ===== ORBIT SPEED =====
      controls.rotateSpeed = 0.8; // Rotation speed (0.1-2.0)
      controls.zoomSpeed = 1.0; // Zoom speed (0.1-3.0)
      controls.panSpeed = 0.8; // Pan speed (0.1-3.0)
      
      controls.update();
      controlsRef.current = controls;
      
      console.log('Orbit controls initialized with limits:', {
        minDistance: orbitMinDistance,
        maxDistance: orbitMaxDistance,
        yMin: yMin + '°',
        yMax: yMax + '°',
        xMin: xMin + '°',
        xMax: xMax + '°'
      });
    }

    // ===== MOUSE TRACKING =====
    if (enableMouseTracking) {
      const handleMouseMove = (event) => {
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;  // 0 to 1
        const y = (event.clientY - rect.top) / rect.height;  // 0 to 1
        
        // Center the coordinates (-0.5 to 0.5)
        const centeredX = x;
        const centeredY = y - 0.5;
        
        // Store mouse position
        mousePositionRef.current = { x: centeredX, y: centeredY };
      };

      container.addEventListener('mousemove', handleMouseMove);
      console.log('Simple mouse tracking enabled with sensitivity:', mouseSensitivity);
    }

    // ===== LIGHTING SETTINGS =====
    // Ambient Light - Overall brightness from props
    const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
    scene.add(ambientLight);

    // Directional Light - Main light source from props
    const directionalLight = new THREE.DirectionalLight(directionalLightColor, directionalLightIntensity);
    directionalLight.position.set(directionalLightPosition[0], directionalLightPosition[1], directionalLightPosition[2]);
    directionalLight.castShadow = directionalLightCastShadow;
    
    // Advanced directional light settings
    if (directionalLightCastShadow) {
      directionalLight.shadow.mapSize.width = directionalLightShadowMapSize;
      directionalLight.shadow.mapSize.height = directionalLightShadowMapSize;
      directionalLight.shadow.camera.left = -directionalLightShadowCameraSize;
      directionalLight.shadow.camera.right = directionalLightShadowCameraSize;
      directionalLight.shadow.camera.top = directionalLightShadowCameraSize;
      directionalLight.shadow.camera.bottom = -directionalLightShadowCameraSize;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 50;
    }
    
    scene.add(directionalLight);

    // Point Light - Secondary light from props
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity);
    
    // Advanced point light settings
    pointLight.castShadow = pointLightCastShadow;
    pointLight.distance = pointLightDistance;
    pointLight.decay = pointLightDecay;
    
    if (pointLightCastShadow) {
      pointLight.shadow.mapSize.width = pointLightShadowMapSize;
      pointLight.shadow.mapSize.height = pointLightShadowMapSize;
      pointLight.shadow.camera.near = 0.1;
      pointLight.shadow.camera.far = 50;
    }
    pointLight.position.set(pointLightPosition[0], pointLightPosition[1], pointLightPosition[2]);
    scene.add(pointLight);

    // ===== MODEL LOADING =====
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // ===== MODEL SCALING & POSITIONING =====
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Model size from props
        const scale = modelSize / maxDim; 
        
        model.scale.setScalar(scale);
        
        if (useManualPosition) {
          // Use manual position from props
          model.position.set(modelPosition[0], modelPosition[1], modelPosition[2]);
        } else {
          // Auto-center the model
          model.position.sub(center.multiplyScalar(scale));
        }
        
        // ===== MODEL ROTATION SETTINGS =====
        // Apply static rotation from props (convert degrees to radians)
        model.rotation.x = (modelRotationX * Math.PI) / 180;
        model.rotation.y = (modelRotationY * Math.PI) / 180;
        model.rotation.z = (modelRotationZ * Math.PI) / 180;

        // ===== MODEL MATERIAL SETTINGS =====
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              // Material properties from props
              child.material.metalness = metalness;
              child.material.roughness = roughness;
              
              // Apply color if provided
              if (modelColor) {
                child.material.color = new THREE.Color(modelColor);
              }
            }
          }
        });

        // ===== APPLY INITIAL ROTATION =====
        model.rotation.x = rotationX;
        model.rotation.y = rotationY;
        model.rotation.z = rotationZ;

        scene.add(model);
        modelRef.current = model;
        setLoading(false);
      },
      (progress) => {
        // Optional: Show loading progress
      },
      (error) => {
        console.error('Error loading model:', error);
        setError(true);
        setLoading(false);
      }
    );

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update orbit controls (required for damping)
      if (controlsRef.current && enableOrbit) {
        controlsRef.current.update();
      }

      // Simple mouse tracking effect (subtle rotation based on mouse position)
      if (enableMouseTracking && modelRef.current) {
        const mouse = mousePositionRef.current;
        const targetRotationX = rotationX + mouse.y * mouseSensitivity * 0.5;
        const targetRotationY = rotationY + mouse.x * mouseSensitivity * 0.5;
        
        // Smooth interpolation to target rotation
        modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.1;
        modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.1;
      }

      if (modelRef.current && autoRotate) {
        modelRef.current.rotation.y += rotateSpeed * 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      console.log('Resize to:', width, 'x', height);
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      // Update orbit controls after resize
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Ensure canvas still fills container
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      console.log('Cleaning up Three.js');
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      initializedRef.current = false;
    };
  }, [loading, modelPath, rotationX, rotationY, rotationZ, enableOrbit, orbitMinDistance, orbitMaxDistance, yMin, yMax, xMin, xMax, orbitDamping, orbitDampingFactor, enableZoom, enablePan, enableRotate, enableMouseTracking, mouseSensitivity, modelSize, modelPosition, useManualPosition, cameraPosition, cameraFOV, metalness, roughness, modelColor, ambientLightIntensity, directionalLightIntensity, directionalLightPosition, pointLightIntensity, pointLightPosition, ambientLightColor, directionalLightColor, pointLightColor, directionalLightCastShadow, directionalLightShadowMapSize, directionalLightShadowCameraSize, pointLightCastShadow, pointLightShadowMapSize, pointLightDistance, pointLightDecay, modelRotationX, modelRotationY, modelRotationZ]); // Re-run when settings change

  if (loading) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ 
        width: '100%', 
        height: '100%'
      }}>
        {/* Three.js container */}
        <div
          ref={setContainerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        {/* Loading overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error && fallbackImage) {
    return (
      <div className={className}>
        {fallbackImage}
      </div>
    );
  }

  return (
    <div
      ref={setContainerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default Three3D;