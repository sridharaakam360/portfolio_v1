// // import { useEffect, useState } from "react";

// // const CustomCursor = () => {
// //   const [position, setPosition] = useState({ x: -100, y: -100 });
// //   const [isHovering, setIsHovering] = useState(false);
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     // Only run on non-touch devices
// //     if (window.matchMedia("(pointer: coarse)").matches) return;

// //     let requestRef: number;
// //     let targetX = -100;
// //     let targetY = -100;

// //     const onMouseMove = (e: MouseEvent) => {
// //       targetX = e.clientX;
// //       targetY = e.clientY;
// //       setIsVisible(true);

// //       const target = e.target as HTMLElement;
// //       const isPointer = window.getComputedStyle(target).cursor === "pointer";
// //       const isClickable = 
// //         target.tagName.toLowerCase() === "a" || 
// //         target.tagName.toLowerCase() === "button" || 
// //         target.closest("a") !== null || 
// //         target.closest("button") !== null;

// //       setIsHovering(isPointer || isClickable);
// //     };

// //     const updatePosition = () => {
// //       setPosition((prev) => {
// //         // Fast follow for the inner dot, slightly slower for outer ring if done in CSS
// //         // Simply returning targetX/Y for immediate update since CSS smooths the outer ring
// //         return { x: targetX, y: targetY }; 
// //       });
// //       requestRef = requestAnimationFrame(updatePosition);
// //     };

// //     const handleMouseLeave = () => setIsVisible(false);
// //     const handleMouseEnter = () => setIsVisible(true);

// //     window.addEventListener("mousemove", onMouseMove);
// //     window.addEventListener("mouseleave", handleMouseLeave);
// //     window.addEventListener("mouseenter", handleMouseEnter);
    
// //     requestRef = requestAnimationFrame(updatePosition);

// //     return () => {
// //       window.removeEventListener("mousemove", onMouseMove);
// //       window.removeEventListener("mouseleave", handleMouseLeave);
// //       window.removeEventListener("mouseenter", handleMouseEnter);
// //       cancelAnimationFrame(requestRef);
// //     };
// //   }, []);

// //   // Return nothing on server or touch devices
// //   if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       {/* Inner Dot */}
// //       <div
// //         className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[10000]"
// //         style={{
// //           transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${isHovering ? 0 : 1})`,
// //           opacity: isVisible ? 1 : 0,
// //           transition: "transform 0.15s ease-out, opacity 0.3s ease",
// //         }}
// //       />
// //       {/* Outer Glow Ring */}
// //       <div
// //         className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-primary rounded-full pointer-events-none z-[9999]"
// //         style={{
// //           transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`,
// //           backgroundColor: isHovering ? "hsl(var(--primary) / 0.1)" : "transparent",
// //           opacity: isVisible ? 1 : 0,
// //           transition: "transform 0.25s ease-out, background-color 0.2s ease, opacity 0.3s ease",
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default CustomCursor;



// import { useEffect, useRef } from "react";

// interface Segment {
//   x: number;
//   y: number;
//   angle: number;
//   phase: number;
//   age: number;
// }

// const SEG_LEN = 18;
// const MAX_SEGS = 28;
// const HELIX_W = 14;
// const HELIX_H = 22;
// const SPIN_SPEED = 0.18;

// const COLORS = {
//   strand1: "#7F77DD",
//   strand2: "#1D9E75",
//   rungs:   "#D4537E",
// };

// const DNACursor = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const dotRef    = useRef<HTMLDivElement>(null);
//   const state = useRef({
//     mx: -999,
//     my: -999,
//     segments: [] as Segment[],
//     raf: 0,
//   });

//   useEffect(() => {
//     if (window.matchMedia("(pointer: coarse)").matches) return;

//     const canvas = canvasRef.current!;
//     const dot    = dotRef.current!;
//     const ctx    = canvas.getContext("2d")!;
//     const s      = state.current;

//     const resize = () => {
//       canvas.width  = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const onMouseMove = (e: MouseEvent) => {
//       s.mx = e.clientX;
//       s.my = e.clientY;
//       dot.style.opacity  = "1";
//       dot.style.left     = `${s.mx}px`;
//       dot.style.top      = `${s.my}px`;

//       const last = s.segments[0];
//       const dist = last ? Math.hypot(s.mx - last.x, s.my - last.y) : Infinity;
//       if (dist > SEG_LEN * 0.6) {
//         const dx    = last ? s.mx - last.x : 0;
//         const dy    = last ? s.my - last.y : 0;
//         const angle = Math.atan2(dy, dx);
//         s.segments.unshift({ x: s.mx, y: s.my, angle, phase: 0, age: 0 });
//         if (s.segments.length > MAX_SEGS) s.segments.pop();
//       }
//     };

//     const onMouseLeave = () => { dot.style.opacity = "0"; };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       s.segments.forEach(seg => {
//         seg.age   += 0.03;
//         seg.phase += SPIN_SPEED;
//       });
//       s.segments = s.segments.filter(seg => seg.age < 1);

//       const n = s.segments.length;

//       for (let i = 0; i < n - 1; i++) {
//         const s0 = s.segments[i];
//         const s1 = s.segments[i + 1];
//         const t     = i / (n - 1);
//         const alpha = (1 - s0.age) * (1 - t * 0.4);
//         if (alpha <= 0) continue;

//         const perp  = s0.angle - Math.PI / 2;
//         const phase = s0.phase;

//         const ax = s0.x + Math.cos(perp) * Math.cos(phase) * HELIX_W;
//         const ay = s0.y + Math.sin(perp) * Math.cos(phase) * HELIX_H;
//         const bx = s0.x - Math.cos(perp) * Math.cos(phase) * HELIX_W;
//         const by = s0.y - Math.sin(perp) * Math.cos(phase) * HELIX_H;

//         const np = s1.angle - Math.PI / 2;
//         const ax2 = s1.x + Math.cos(np) * Math.cos(s1.phase) * HELIX_W;
//         const ay2 = s1.y + Math.sin(np) * Math.cos(s1.phase) * HELIX_H;
//         const bx2 = s1.x - Math.cos(np) * Math.cos(s1.phase) * HELIX_W;
//         const by2 = s1.y - Math.sin(np) * Math.cos(s1.phase) * HELIX_H;

//         ctx.globalAlpha = alpha * 0.85;
//         ctx.lineWidth   = 2;
//         ctx.lineCap     = "round";

//         ctx.strokeStyle = COLORS.strand1;
//         ctx.beginPath();
//         ctx.moveTo(ax, ay);
//         ctx.lineTo(ax2, ay2);
//         ctx.stroke();

//         ctx.strokeStyle = COLORS.strand2;
//         ctx.beginPath();
//         ctx.moveTo(bx, by);
//         ctx.lineTo(bx2, by2);
//         ctx.stroke();

//         const crossAlpha = Math.abs(Math.sin(phase));
//         if (crossAlpha > 0.3) {
//           ctx.globalAlpha = alpha * crossAlpha * 0.6;
//           ctx.strokeStyle = COLORS.rungs;
//           ctx.lineWidth   = 1.5;
//           ctx.beginPath();
//           ctx.moveTo(ax, ay);
//           ctx.lineTo(bx, by);
//           ctx.stroke();
//         }

//         ctx.globalAlpha = alpha;
//         const r = 3 * (1 - t * 0.5);

//         ctx.fillStyle = COLORS.strand1;
//         ctx.beginPath();
//         ctx.arc(ax, ay, r, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.fillStyle = COLORS.strand2;
//         ctx.beginPath();
//         ctx.arc(bx, by, r, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       ctx.globalAlpha = 1;
//       s.raf = requestAnimationFrame(draw);
//     };

//     s.raf = requestAnimationFrame(draw);

//     return () => {
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       cancelAnimationFrame(s.raf);
//     };
//   }, []);

//   if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
//     return null;
//   }

//   return (
//     <>
//       {/* Full-page canvas for the trail */}
//       <canvas
//         ref={canvasRef}
//         className="fixed inset-0 pointer-events-none z-[9999]"
//         style={{ cursor: "none" }}
//       />
//       {/* Cursor dot */}
//       <div
//         ref={dotRef}
//         className="fixed top-0 left-0 pointer-events-none z-[10000]"
//         style={{
//           width: 8,
//           height: 8,
//           borderRadius: "50%",
//           background: COLORS.strand1,
//           transform: "translate(-50%, -50%)",
//           opacity: 0,
//           transition: "opacity 0.2s",
//         }}
//       />
//     </>
//   );
// };

// export default DNACursor;

import { useEffect, useRef } from "react";

const MAX_PTS = 70;
const STAMP_MS = 12;
const HW = 14;
const HH = 22;
const SPIN_HZ = 1.4;
const PITCH = 70;
const FADE_MS = 800;
const DOT_R = 3.2;

const COLORS = {
  strand1: "#7F77DD",
  strand2: "#1D9E75",
  rungs: "#D4537E",
};

const PI2 = Math.PI * 2;

interface TrailPoint {
  x: number;
  y: number;
  stamp: number;
}

export default function DNACursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current!;
    const dot = dotRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let targetX = -999;
    let targetY = -999;

    let smoothX = -999;
    let smoothY = -999;

    let active = false;

    let lastStamp = 0;
    let phase = 0;
    let lastFrame = performance.now();

    const trail: TrailPoint[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!active) {
        smoothX = targetX;
        smoothY = targetY;
        active = true;
      }

      dot.style.opacity = "1";
    };

    const onLeave = () => {
      active = false;
      dot.style.opacity = "0";
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;

    const draw = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      phase += dt * SPIN_HZ * PI2;

      if (active) {
        const speed = Math.hypot(
          targetX - smoothX,
          targetY - smoothY
        );

        const dynamicLerp = Math.min(
          0.35,
          0.08 + speed * 0.002
        );

        smoothX += (targetX - smoothX) * dynamicLerp;
        smoothY += (targetY - smoothY) * dynamicLerp;

        dot.style.left = `${smoothX}px`;
        dot.style.top = `${smoothY}px`;
      }

      if (active && now - lastStamp > STAMP_MS) {
        trail.unshift({
          x: smoothX,
          y: smoothY,
          stamp: now,
        });

        if (trail.length > MAX_PTS) {
          trail.pop();
        }

        lastStamp = now;
      }

      const cutoff = now - FADE_MS;

      while (
        trail.length &&
        trail[trail.length - 1].stamp < cutoff
      ) {
        trail.pop();
      }

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      const n = trail.length;

      if (n < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const nx = new Float32Array(n);
      const ny = new Float32Array(n);
      const dist = new Float32Array(n);

      dist[0] = 0;

      for (let i = 1; i < n; i++) {
        const dx = trail[i - 1].x - trail[i].x;
        const dy = trail[i - 1].y - trail[i].y;

        dist[i] =
          dist[i - 1] + Math.sqrt(dx * dx + dy * dy);
      }

      for (let i = 0; i < n; i++) {
        let dx: number;
        let dy: number;

        if (i === 0) {
          dx = trail[0].x - trail[1].x;
          dy = trail[0].y - trail[1].y;
        } else if (i === n - 1) {
          dx = trail[n - 2].x - trail[n - 1].x;
          dy = trail[n - 2].y - trail[n - 1].y;
        } else {
          dx = trail[i - 1].x - trail[i + 1].x;
          dy = trail[i - 1].y - trail[i + 1].y;
        }

        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        nx[i] = -dy / len;
        ny[i] = dx / len;
      }

      const strandA = (i: number) => {
        const theta = phase + dist[i] * PI2 / PITCH;

        const cosT = Math.cos(theta);

        return [
          trail[i].x + nx[i] * cosT * HW,
          trail[i].y + ny[i] * cosT * HH,
        ];
      };

      const strandB = (i: number) => {
        const theta = phase + dist[i] * PI2 / PITCH;

        const cosT = Math.cos(theta);

        return [
          trail[i].x - nx[i] * cosT * HW,
          trail[i].y - ny[i] * cosT * HH,
        ];
      };

      ctx.save();

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Strand A

      ctx.strokeStyle = COLORS.strand1;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLORS.strand1;

      for (let i = 0; i < n - 1; i++) {
        const alpha =
          (1 - (now - trail[i].stamp) / FADE_MS) * 0.95;

        if (alpha <= 0) continue;

        ctx.globalAlpha = alpha;

        const p1 = strandA(i);
        const p2 = strandA(i + 1);

        const prev =
          i > 0 ? strandA(i - 1) : p1;

        const next =
          i < n - 2 ? strandA(i + 2) : p2;

        ctx.beginPath();

        ctx.moveTo(p1[0], p1[1]);

        ctx.bezierCurveTo(
          p1[0] + (p2[0] - prev[0]) * 0.15,
          p1[1] + (p2[1] - prev[1]) * 0.15,

          p2[0] - (next[0] - p1[0]) * 0.15,
          p2[1] - (next[1] - p1[1]) * 0.15,

          p2[0],
          p2[1]
        );

        ctx.stroke();
      }

      // Strand B

      ctx.strokeStyle = COLORS.strand2;
      ctx.shadowColor = COLORS.strand2;

      for (let i = 0; i < n - 1; i++) {
        const alpha =
          (1 - (now - trail[i].stamp) / FADE_MS) * 0.95;

        if (alpha <= 0) continue;

        ctx.globalAlpha = alpha;

        const p1 = strandB(i);
        const p2 = strandB(i + 1);

        const prev =
          i > 0 ? strandB(i - 1) : p1;

        const next =
          i < n - 2 ? strandB(i + 2) : p2;

        ctx.beginPath();

        ctx.moveTo(p1[0], p1[1]);

        ctx.bezierCurveTo(
          p1[0] + (p2[0] - prev[0]) * 0.15,
          p1[1] + (p2[1] - prev[1]) * 0.15,

          p2[0] - (next[0] - p1[0]) * 0.15,
          p2[1] - (next[1] - p1[1]) * 0.15,

          p2[0],
          p2[1]
        );

        ctx.stroke();
      }

      // Rungs

      ctx.lineWidth = 1.3;
      ctx.strokeStyle = COLORS.rungs;
      ctx.shadowBlur = 0;

      for (let i = 0; i < n; i++) {
        const theta =
          phase + dist[i] * PI2 / PITCH;

        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const depth = (sinT + 1) * 0.5;

        const alpha =
          (1 - (now - trail[i].stamp) / FADE_MS) *
          depth *
          0.8;

        if (alpha < 0.05) continue;

        ctx.globalAlpha = alpha;

        const ax =
          trail[i].x + nx[i] * cosT * HW;

        const ay =
          trail[i].y + ny[i] * cosT * HH;

        const bx =
          trail[i].x - nx[i] * cosT * HW;

        const by =
          trail[i].y - ny[i] * cosT * HH;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // Nodes

      for (let i = 0; i < n; i += 2) {
        const theta =
          phase + dist[i] * PI2 / PITCH;

        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const depth = (sinT + 1) * 0.5;

        const alpha =
          (1 - (now - trail[i].stamp) / FADE_MS) *
          (0.3 + depth * 0.7);

        if (alpha < 0.05) continue;

        const r =
          DOT_R * (0.7 + depth * 0.9);

        const ax =
          trail[i].x + nx[i] * cosT * HW;

        const ay =
          trail[i].y + ny[i] * cosT * HH;

        const bx =
          trail[i].x - nx[i] * cosT * HW;

        const by =
          trail[i].y - ny[i] * cosT * HH;

        ctx.globalAlpha = alpha;

        ctx.fillStyle = COLORS.strand1;
        ctx.beginPath();
        ctx.arc(ax, ay, r, 0, PI2);
        ctx.fill();

        ctx.fillStyle = COLORS.strand2;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, PI2);
        ctx.fill();
      }

      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);

      cancelAnimationFrame(raf);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ cursor: "none" }}
      />

      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: COLORS.strand1,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity .15s",
          willChange: "left, top",
          boxShadow: `0 0 12px ${COLORS.strand1}`,
        }}
      />
    </>
  );
}