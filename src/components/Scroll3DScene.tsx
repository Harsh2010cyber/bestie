"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scroll3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation state references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const roseGroupRef = useRef<THREE.Group | null>(null);
  const cubesGroupRef = useRef<THREE.Group | null>(null);
  const cubeObjects = useRef<
    Array<{
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
      depthFactor: number;
    }>
  >([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const targetRotation = useRef({ x: 0.25, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0.25, y: 0, z: 0 });
  const currentScrollProgress = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup (matches full window aspect)
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // 3. High-performance WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    // 4. Cinematic Background Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaee, 2.8);
    mainLight.position.set(6, 9, 7);
    scene.add(mainLight);

    const warmFillLight = new THREE.DirectionalLight(0xc59b6d, 2.2);
    warmFillLight.position.set(-7, -5, 5);
    scene.add(warmFillLight);

    const rimLight = new THREE.PointLight(0xff6b81, 3.5, 25);
    rimLight.position.set(0, -6, -3);
    scene.add(rimLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 2.0, 18);
    goldPoint.position.set(4, 3, 2);
    scene.add(goldPoint);

    // ==========================================
    // BUILD PROCEDURAL 3D VELVETY ROSE
    // ==========================================
    const roseGroup = new THREE.Group();
    roseGroupRef.current = roseGroup;

    // Rose Petal Materials
    const velvetPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x9e1b32, // Deep velvety royal crimson rose
      roughness: 0.38,
      metalness: 0.18,
      side: THREE.DoubleSide,
    });

    const innerPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xc92a45, // Radiant inner blossom
      roughness: 0.3,
      metalness: 0.22,
      side: THREE.DoubleSide,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden core stamen
      roughness: 0.25,
      metalness: 0.85,
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3f20, // Deep emerald stem
      roughness: 0.65,
      metalness: 0.2,
    });

    // Petal helper: organic curved cylinder petal
    const createCurvedPetal = (
      radius: number,
      height: number,
      curveStrength: number,
      mat: THREE.Material
    ) => {
      const geom = new THREE.CylinderGeometry(
        radius * 0.9,
        radius * 0.38,
        height,
        18,
        8,
        true,
        0,
        Math.PI * 0.96
      );
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const curl = Math.sin((y / height) * Math.PI) * curveStrength;
        pos.setZ(i, z + curl);
      }
      geom.computeVertexNormals();
      return new THREE.Mesh(geom, mat);
    };

    // Layer 1: Core Spiral Bud
    const budGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const angle = (i * Math.PI * 2) / 7;
      const petal = createCurvedPetal(0.65, 1.25, 0.28, innerPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.2;
      petal.rotation.x = 0.16;
      petal.position.y = 0.2;
      budGroup.add(petal);
    }
    roseGroup.add(budGroup);

    // Layer 2: Mid Blooming Petals
    const midGroup = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const angle = (i * Math.PI * 2) / 9 + 0.35;
      const petal = createCurvedPetal(1.15, 1.55, 0.42, velvetPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.38;
      petal.rotation.x = 0.26;
      petal.position.y = 0.1;
      midGroup.add(petal);
    }
    roseGroup.add(midGroup);

    // Layer 3: Outer Blossoming Petals
    const outerGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12 + 0.65;
      const petal = createCurvedPetal(1.68, 1.75, 0.58, velvetPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.55;
      petal.rotation.x = 0.36;
      petal.position.y = -0.12;
      outerGroup.add(petal);
    }
    roseGroup.add(outerGroup);

    // Golden Core Stamen
    const stamenGeom = new THREE.SphereGeometry(0.38, 16, 16);
    const stamen = new THREE.Mesh(stamenGeom, goldAccentMaterial);
    stamen.position.y = 0.32;
    roseGroup.add(stamen);

    // Stem
    const stemGeom = new THREE.CylinderGeometry(0.1, 0.08, 3.4, 16);
    const stem = new THREE.Mesh(stemGeom, stemMaterial);
    stem.position.y = -1.9;
    roseGroup.add(stem);

    // Leaves
    for (let i = 0; i < 4; i++) {
      const leafGeom = new THREE.ConeGeometry(0.38, 1.1, 6);
      const leaf = new THREE.Mesh(leafGeom, stemMaterial);
      leaf.position.set(i % 2 === 0 ? 0.38 : -0.38, -1.1 - i * 0.45, 0.12);
      leaf.rotation.z = i % 2 === 0 ? -1.15 : 1.15;
      leaf.rotation.x = 0.35;
      roseGroup.add(leaf);
    }

    // Scale and position rose in majestic background perspective
    roseGroup.scale.set(1.25, 1.25, 1.25);
    roseGroup.position.set(2.4, -0.4, -1.0); // Flanked toward the right background for editorial layout
    scene.add(roseGroup);

    // ==========================================
    // 3D GLASS SMALL CUBES RANDOMLY FLOATING
    // ==========================================
    const cubesGroup = new THREE.Group();
    cubesGroupRef.current = cubesGroup;
    scene.add(cubesGroup);

    const cubeList: Array<{
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
      depthFactor: number;
    }> = [];

    // Realistic Frosted / Refractive Glass Materials for Cubes
    const glassMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.94,
        opacity: 0.85,
        transparent: true,
        roughness: 0.08,
        ior: 1.54,
        metalness: 0.08,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xf6e5d2, // Warm champagne glass
        transmission: 0.92,
        opacity: 0.88,
        transparent: true,
        roughness: 0.12,
        ior: 1.52,
        metalness: 0.1,
        clearcoat: 0.9,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xffeef2, // Rose quartz translucent glass
        transmission: 0.95,
        opacity: 0.82,
        transparent: true,
        roughness: 0.06,
        ior: 1.58,
        metalness: 0.05,
        clearcoat: 1.0,
      }),
    ];

    const cubeCount = 42; // Scatter of floating 3D glass cubes
    for (let i = 0; i < cubeCount; i++) {
      const size = 0.15 + Math.random() * 0.38; // Varied small cube dimensions
      const cubeGeom = new THREE.BoxGeometry(size, size, size);
      const mat = glassMaterials[i % glassMaterials.length];
      const cube = new THREE.Mesh(cubeGeom, mat);

      // Random 3D spatial dispersal around the scene
      const posX = (Math.random() - 0.5) * 16;
      const posY = (Math.random() - 0.5) * 14;
      const posZ = -4 + Math.random() * 6; // from deep background to near midground

      cube.position.set(posX, posY, posZ);
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      cubesGroup.add(cube);

      cubeList.push({
        mesh: cube,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.018,
          z: (Math.random() - 0.5) * 0.012,
        },
        floatSpeed: 0.8 + Math.random() * 1.2,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: posY,
        depthFactor: (posZ + 5) / 10,
      });
    }

    cubeObjects.current = cubeList;

    // ==========================================
    // FLOATING STARDUST SPARKLES
    // ==========================================
    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffdfa0,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // ==========================================
    // SCROLL LISTENER FOR 3D BACKGROUND MOTION
    // ==========================================
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      currentScrollProgress.current = progress;

      // Rose rotation driven organically by page scrolling
      targetRotation.current.y = progress * Math.PI * 5;
      targetRotation.current.x =
        0.28 + Math.sin(progress * Math.PI * 2.5) * 0.45;
      targetRotation.current.z = Math.cos(progress * Math.PI * 2) * 0.35;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize handler for responsive fullscreen canvas
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);

      // Adapt rose position on mobile vs desktop
      if (roseGroupRef.current) {
        if (w < 768) {
          roseGroupRef.current.position.set(0.6, -0.6, -1.8);
          roseGroupRef.current.scale.set(0.95, 0.95, 0.95);
        } else {
          roseGroupRef.current.position.set(2.4, -0.4, -1.0);
          roseGroupRef.current.scale.set(1.25, 1.25, 1.25);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // ==========================================
    // RENDER LOOP (BUTTERY SMOOTH PARALLAX)
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp to target rotation
      const lerpFactor = 0.06;
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * lerpFactor;

      // Animate Rose Model in Background
      if (roseGroupRef.current) {
        roseGroupRef.current.rotation.x = currentRotation.current.x;
        roseGroupRef.current.rotation.y = currentRotation.current.y;
        roseGroupRef.current.rotation.z = currentRotation.current.z;

        // Gentle breathing float
        const baseOffset = window.innerWidth < 768 ? -0.6 : -0.4;
        roseGroupRef.current.position.y =
          baseOffset + Math.sin(elapsedTime * 1.3) * 0.12;
      }

      // Animate Floating 3D Glass Cubes
      const scrollOffset = currentScrollProgress.current * 4;
      for (let i = 0; i < cubeObjects.current.length; i++) {
        const item = cubeObjects.current[i];
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        // Floating hover + scroll parallax
        const floatY =
          Math.sin(elapsedTime * item.floatSpeed + item.floatOffset) * 0.35;
        item.mesh.position.y =
          item.baseY + floatY - scrollOffset * item.depthFactor;
      }

      // Sparkles orbiting drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.08;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.15) * 0.06;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Fullscreen Three.js WebGL canvas in background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-85 transition-opacity duration-1000"
      />

      {/* Subtle Warm Vignette Overlay to blend seamlessly with dark luxury theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080A]/40 via-transparent to-[#08080A]/60 pointer-events-none" />
    </div>
  );
}
