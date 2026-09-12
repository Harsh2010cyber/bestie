"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  isPetal?: boolean;
  rotation?: number;
  rotationSpeed?: number;
}

export default function MouseInteractiveConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -200, y: -200, prevX: -200, prevY: -200, speed: 0 });
  const particles = useRef<Particle[]>([]);
  const aura = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const colors = ["#C59B6D", "#DFC09B", "#E07A43", "#FBF8F2", "#E8A598"];

    // Spawn stardust on mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.speed = speed;

      // Emit particles based on velocity
      const count = Math.min(Math.floor(speed / 4) + 1, 6);
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.5 - dx * 0.05,
          vy: (Math.random() - 0.5) * 1.5 - dy * 0.05 - 0.3,
          size: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30,
        });
      }
    };

    // Burst blossom & diamond sparkles on click
    const onMouseDown = (e: MouseEvent) => {
      // Create 24 sparkling particles radiating outwards
      for (let i = 0; i < 24; i++) {
        const angle = (i * Math.PI * 2) / 24 + (Math.random() - 0.5) * 0.3;
        const velocity = Math.random() * 5 + 2;
        const isPetal = i % 3 === 0;

        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: isPetal ? Math.random() * 5 + 4 : Math.random() * 3 + 1.5,
          color: isPetal ? "#C42B42" : colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 50 + 40,
          isPetal,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    // Touch support for mobile devices
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current.x = touch.clientX;
        mouse.current.y = touch.clientY;

        for (let i = 0; i < 3; i++) {
          particles.current.push({
            x: touch.clientX + (Math.random() - 0.5) * 20,
            y: touch.clientY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            life: 0,
            maxLife: Math.random() * 35 + 25,
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp aura spotlight
      aura.current.x += (mouse.current.x - aura.current.x) * 0.08;
      aura.current.y += (mouse.current.y - aura.current.y) * 0.08;

      // Draw subtle ambient cursor halo
      if (aura.current.x > 0 && aura.current.y > 0) {
        const gradient = ctx.createRadialGradient(
          aura.current.x,
          aura.current.y,
          0,
          aura.current.x,
          aura.current.y,
          180
        );
        gradient.addColorStop(0, "rgba(197, 155, 109, 0.06)");
        gradient.addColorStop(0.5, "rgba(224, 122, 67, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(aura.current.x, aura.current.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellation lines between nearby particles
      const pCount = particles.current.length;
      for (let i = 0; i < pCount; i++) {
        for (let j = i + 1; j < pCount; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 55) {
            const lineAlpha = (1 - dist / 55) * 0.25 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(197, 155, 109, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        // Apply physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.isPetal) {
          // Petal drifts down and spins
          p.vy += 0.04;
          p.rotation = (p.rotation || 0) + (p.rotationSpeed || 0.05);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(196, 43, 66, ${p.alpha * 0.9})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Sparkle stardust particle
          ctx.save();
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Clean dead particles
        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1);
        }
      }

      // Cap maximum active particles for high FPS
      if (particles.current.length > 250) {
        particles.current.splice(0, particles.current.length - 250);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99990]"
      style={{ willChange: "transform" }}
    />
  );
}
