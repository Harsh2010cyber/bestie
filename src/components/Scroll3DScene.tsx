"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useCursor } from "./CustomCursor";

export default function Scroll3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelType, setModelType] = useState<"rose" | "ring">("rose");
  const [scrollPct, setScrollPct] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  // Animation state references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const roseGroupRef = useRef<THREE.Group | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const targetRotation = useRef({ x: 0.2, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0.2, y: 0, z: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const currentScrollProgress = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const width = 360;
    const height = 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 2.5);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const warmFillLight = new THREE.DirectionalLight(0xc59b6d, 2.0);
    warmFillLight.position.set(-6, -4, 4);
    scene.add(warmFillLight);

    const rimLight = new THREE.PointLight(0xffa07a, 3, 20);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    // ==========================================
    // BUILD PROCEDURAL 3D ROSE
    // ==========================================
    const roseGroup = new THREE.Group();
    roseGroupRef.current = roseGroup;

    // Rose Petal Materials
    const velvetPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b1c2e, // Deep velvety crimson rose
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const innerPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xc42b42, // Vibrant glowing inner rose
      roughness: 0.3,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden edge shimmer
      roughness: 0.25,
      metalness: 0.85,
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x224422, // Deep forest emerald stem
      roughness: 0.6,
      metalness: 0.2,
    });

    // Petal helper function: organic curved shell
    const createCurvedPetal = (
      radius: number,
      height: number,
      curveStrength: number,
      mat: THREE.Material
    ) => {
      const geom = new THREE.CylinderGeometry(
        radius * 0.9,
        radius * 0.4,
        height,
        16,
        8,
        true,
        0,
        Math.PI * 0.95
      );
      // Deform vertices for natural petal curvature
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

    // Layer 1: Core Spiral Bud (tight petals)
    const budGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const angle = (i * Math.PI * 2) / 7;
      const petal = createCurvedPetal(0.6, 1.2, 0.25, innerPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.18;
      petal.rotation.x = 0.15;
      petal.position.y = 0.2;
      budGroup.add(petal);
    }
    roseGroup.add(budGroup);

    // Layer 2: Mid Blooming Petals
    const midGroup = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const angle = (i * Math.PI * 2) / 9 + 0.3;
      const petal = createCurvedPetal(1.1, 1.5, 0.4, velvetPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.35;
      petal.rotation.x = 0.25;
      petal.position.y = 0.1;
      midGroup.add(petal);
    }
    roseGroup.add(midGroup);

    // Layer 3: Outer Blossoming Petals
    const outerGroup = new THREE.Group();
    for (let i = 0; i < 11; i++) {
      const angle = (i * Math.PI * 2) / 11 + 0.6;
      const petal = createCurvedPetal(1.6, 1.7, 0.55, velvetPetalMaterial);
      petal.rotation.y = angle;
      petal.rotation.z = 0.52;
      petal.rotation.x = 0.35;
      petal.position.y = -0.1;
      outerGroup.add(petal);
    }
    roseGroup.add(outerGroup);

    // Golden Core Stamen
    const stamenGeom = new THREE.SphereGeometry(0.35, 16, 16);
    const stamen = new THREE.Mesh(stamenGeom, goldAccentMaterial);
    stamen.position.y = 0.3;
    roseGroup.add(stamen);

    // Stem
    const stemGeom = new THREE.CylinderGeometry(0.09, 0.08, 3.2, 16);
    const stem = new THREE.Mesh(stemGeom, stemMaterial);
    stem.position.y = -1.8;
    roseGroup.add(stem);

    // Leaves
    for (let i = 0; i < 3; i++) {
      const leafGeom = new THREE.ConeGeometry(0.35, 1.0, 5);
      const leaf = new THREE.Mesh(leafGeom, stemMaterial);
      leaf.position.set(i % 2 === 0 ? 0.35 : -0.35, -1.2 - i * 0.5, 0.1);
      leaf.rotation.z = i % 2 === 0 ? -1.1 : 1.1;
      leaf.rotation.x = 0.4;
      roseGroup.add(leaf);
    }

    roseGroup.scale.set(1.1, 1.1, 1.1);
    roseGroup.position.set(0, 0.3, 0);
    scene.add(roseGroup);

    // ==========================================
    // BUILD PROCEDURAL 3D DIAMOND RING
    // ==========================================
    const ringGroup = new THREE.Group();
    ringGroupRef.current = ringGroup;

    // Gold Band Material
    const goldBandMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      emissive: 0x221100,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Brilliant Cut Diamond Material
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 2.42,
      metalness: 0.1,
      specularColor: new THREE.Color(0xfff5ea),
    });

    // Gold Band
    const bandGeom = new THREE.TorusGeometry(1.6, 0.22, 32, 100);
    const band = new THREE.Mesh(bandGeom, goldBandMaterial);
    ringGroup.add(band);

    // Diamond Crown Setting (6 Prongs)
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.65, 0);

    for (let i = 0; i < 6; i++) {
      const prongAngle = (i * Math.PI * 2) / 6;
      const prongGeom = new THREE.CylinderGeometry(0.04, 0.05, 0.5, 8);
      const prong = new THREE.Mesh(prongGeom, goldBandMaterial);
      prong.position.set(
        Math.cos(prongAngle) * 0.42,
        0.18,
        Math.sin(prongAngle) * 0.42
      );
      prong.rotation.z = -Math.cos(prongAngle) * 0.25;
      prong.rotation.x = Math.sin(prongAngle) * 0.25;
      crownGroup.add(prong);
    }

    // Solitaire Brilliant Faceted Diamond
    const diamondTopGeom = new THREE.ConeGeometry(0.65, 0.45, 12);
    const diamondTop = new THREE.Mesh(diamondTopGeom, diamondMaterial);
    diamondTop.position.y = 0.45;
    diamondTop.rotation.x = Math.PI;
    crownGroup.add(diamondTop);

    const diamondBaseGeom = new THREE.ConeGeometry(0.65, 0.7, 12);
    const diamondBase = new THREE.Mesh(diamondBaseGeom, diamondMaterial);
    diamondBase.position.y = -0.05;
    crownGroup.add(diamondBase);

    // Accent Small Gems on Shoulders
    for (let side = -1; side <= 1; side += 2) {
      for (let g = 0; g < 3; g++) {
        const smallGemGeom = new THREE.OctahedronGeometry(0.07, 1);
        const smallGem = new THREE.Mesh(smallGemGeom, diamondMaterial);
        const theta = Math.PI / 2 + side * (0.2 + g * 0.12);
        smallGem.position.set(Math.cos(theta) * 1.6, Math.sin(theta) * 1.6, 0);
        ringGroup.add(smallGem);
      }
    }

    ringGroup.add(crownGroup);
    ringGroup.scale.set(1.0, 1.0, 1.0);
    ringGroup.visible = false;
    scene.add(ringGroup);

    // ==========================================
    // FLOATING STARDUST SPARKLES
    // ==========================================
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffdfa0,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // ==========================================
    // SCROLL LISTENER FOR 3D ROTATION MOTION
    // ==========================================
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      currentScrollProgress.current = progress;
      setScrollPct(Math.round(progress * 100));

      // Drive 3D rotation based on scroll motion
      if (!isDragging.current) {
        targetRotation.current.y = progress * Math.PI * 4;
        targetRotation.current.x = 0.25 + Math.sin(progress * Math.PI * 2) * 0.5;
        targetRotation.current.z = Math.cos(progress * Math.PI * 2) * 0.3;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // ==========================================
    // MOUSE DRAG TO FREELY ROTATE 3D OBJECT
    // ==========================================
    const canvas = canvasRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.015;
      targetRotation.current.x += deltaY * 0.015;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for drag
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.02;
      targetRotation.current.x += deltaY * 0.02;

      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ==========================================
    // RENDER LOOP (BUTTERY SMOOTH INERTIA)
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerping to target rotation
      const lerpFactor = 0.08;
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * lerpFactor;

      // Apply rotations
      if (roseGroupRef.current) {
        roseGroupRef.current.rotation.x = currentRotation.current.x;
        roseGroupRef.current.rotation.y = currentRotation.current.y;
        roseGroupRef.current.rotation.z = currentRotation.current.z;
        // Subtle floating breathing
        roseGroupRef.current.position.y =
          0.25 + Math.sin(elapsedTime * 1.5) * 0.08;
      }

      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.x = currentRotation.current.x;
        ringGroupRef.current.rotation.y = currentRotation.current.y;
        ringGroupRef.current.rotation.z = currentRotation.current.z;
        // Subtle floating breathing
        ringGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // Sparkles orbiting drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.12;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Toggle model between 3D Rose and 3D Ring
  useEffect(() => {
    if (roseGroupRef.current && ringGroupRef.current) {
      if (modelType === "rose") {
        roseGroupRef.current.visible = true;
        ringGroupRef.current.visible = false;
      } else {
        roseGroupRef.current.visible = false;
        ringGroupRef.current.visible = true;
      }
    }
  }, [modelType]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none transition-all duration-500"
      style={{
        opacity: isHovered ? 1 : 0.92,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor("button", "INSPECT 3D");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
    >
      {/* 3D Canvas Container with Glassmorphism Backing */}
      <div className="relative pointer-events-auto rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:border-bronze/50 hover:shadow-[0_20px_60px_rgba(197,155,109,0.2)]">
        {/* Header with Switcher Pill */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-ivory/70 uppercase">
              3D MOTION
            </span>
          </div>

          {/* Model Switcher: Rose vs Ring */}
          <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
            <button
              onClick={() => setModelType("rose")}
              className={`px-2.5 py-0.5 text-[9px] font-mono tracking-wider rounded-full transition-all ${
                modelType === "rose"
                  ? "bg-bronze text-dark font-semibold shadow"
                  : "text-ivory/60 hover:text-ivory"
              }`}
              data-cursor="button"
              data-cursor-label="ROSE"
            >
              🌹 Rose
            </button>
            <button
              onClick={() => setModelType("ring")}
              className={`px-2.5 py-0.5 text-[9px] font-mono tracking-wider rounded-full transition-all ${
                modelType === "ring"
                  ? "bg-bronze text-dark font-semibold shadow"
                  : "text-ivory/60 hover:text-ivory"
              }`}
              data-cursor="button"
              data-cursor-label="RING"
            >
              💍 Ring
            </button>
          </div>
        </div>

        {/* The 3D Canvas */}
        <div className="relative w-48 h-56 md:w-56 md:h-64 cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            title="Drag to rotate, scroll to tumble"
          />

          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-bronze/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Footer with Scroll Sync Indicator */}
        <div className="flex items-center justify-between px-3 py-1 text-[8px] font-mono uppercase tracking-widest text-ivory/50 border-t border-white/10">
          <span>DRAG TO ROTATE</span>
          <span className="text-bronze font-semibold">{scrollPct}% SCROLL</span>
        </div>
      </div>
    </div>
  );
}
