"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };
type Packet = { a: number; b: number; t: number; speed: number; hue: 0 | 1 };

const JADE: [number, number, number] = [0, 217, 163];
const VIOLET: [number, number, number] = [124, 108, 255];

const rgba = (c: [number, number, number], a: number) =>
  `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

/**
 * Drifting node graph with packets travelling the edges, a nod to the ingestion
 * pipelines in the work below. Pauses offscreen and degrades to a still frame
 * when the visitor prefers reduced motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK_DIST = 168;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const nodes: Node[] = [];
    const packets: Packet[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      nodes.length = 0;
      packets.length = 0;
      // Scale count with area so phones don't render a hairball.
      const count = Math.round(
        Math.min(86, Math.max(26, (width * height) / 16500))
      );
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.9,
          hue: Math.random() > 0.82 ? 1 : 0,
        });
      }
    }

    function spawnPacket() {
      if (packets.length > 14 || nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = -1;
      let best = LINK_DIST;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[a].x - nodes[i].x, nodes[a].y - nodes[i].y);
        if (d < best) {
          best = d;
          b = i;
        }
      }
      if (b === -1) return;
      packets.push({
        a,
        b,
        t: 0,
        speed: 0.004 + Math.random() * 0.007,
        hue: Math.random() > 0.7 ? 1 : 0,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = width + 40;
        if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40;
        if (n.y > height + 40) n.y = -40;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          const fade = 1 - d / LINK_DIST;
          ctx.strokeStyle = rgba(JADE, fade * 0.13);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Cursor hub links whatever is nearby to the pointer
      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d > 210) continue;
          const fade = 1 - d / 210;
          ctx.strokeStyle = rgba(JADE, fade * 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const c = n.hue === 1 ? VIOLET : JADE;
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 210)
          : 0;
        ctx.fillStyle = rgba(c, 0.4 + near * 0.55);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets in flight
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          packets.splice(i, 1);
          continue;
        }
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const c = p.hue === 1 ? VIOLET : JADE;
        // Fade in and out at the ends so packets don't pop.
        const alpha = Math.sin(p.t * Math.PI);

        ctx.fillStyle = rgba(c, alpha * 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = rgba(c, alpha * 0.7);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (Math.random() < 0.05) spawnPacket();
    }

    function loop() {
      if (running) draw();
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(); // one still frame
      return () => window.removeEventListener("resize", resize);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    // Don't burn frames while the hero is scrolled away or the tab is hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
