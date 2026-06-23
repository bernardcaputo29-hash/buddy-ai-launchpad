import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseA: number;
  twSpeed: number;
  twOffset: number;
  layer: number; // for parallax
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shooting: Shooting[] = [];
    let nextShootingAt = performance.now() + 4000;

    const seed = (count: number): Star[] => {
      const out: Star[] = [];
      for (let i = 0; i < count; i++) {
        const layer = i % 3; // 0 far, 1 mid, 2 near
        out.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: layer === 2 ? Math.random() * 1.4 + 0.6 : Math.random() * 0.9 + 0.25,
          baseA: layer === 2 ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.4,
          twSpeed: 0.4 + Math.random() * 1.2,
          twOffset: Math.random() * Math.PI * 2,
          layer,
        });
      }
      return out;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = Math.min(1, (width * height) / (1920 * 1080));
      const count = Math.floor(220 * density) + 90;
      stars = seed(count);
    };
    resize();
    window.addEventListener("resize", resize);

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const spawnShooting = () => {
      const startX = Math.random() * width * 0.6;
      const startY = Math.random() * height * 0.4;
      const angle = Math.PI / 5 + (Math.random() - 0.5) * 0.4;
      const speed = 8 + Math.random() * 4;
      shooting.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    };

    let raf = 0;
    let last = performance.now();
    const render = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const parallax = s.layer * 0.08;
        const y = s.y - scrollY * parallax;
        const yy = ((y % height) + height) % height;
        const tw = prefersReduced
          ? 1
          : 0.55 + 0.45 * Math.sin(now * 0.001 * s.twSpeed + s.twOffset);
        const alpha = s.baseA * tw;
        ctx.beginPath();
        ctx.fillStyle = `rgba(246,239,228,${alpha.toFixed(3)})`;
        ctx.arc(s.x, yy, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.layer === 2 && tw > 0.9) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(180,200,255,${(alpha * 0.4).toFixed(3)})`;
          ctx.arc(s.x, yy, s.r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Shooting stars
      if (!prefersReduced && now > nextShootingAt && shooting.length < 2) {
        spawnShooting();
        nextShootingAt = now + 15000 + Math.random() * 6000;
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.life += dt / 16.6;
        m.x += m.vx;
        m.y += m.vy;
        const t = m.life / m.maxLife;
        const a = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const tailX = m.x - m.vx * 10;
        const tailY = m.y - m.vy * 10;
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, "rgba(246,239,228,0)");
        grad.addColorStop(1, `rgba(246,239,228,${(0.85 * a).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        // bright head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (m.life >= m.maxLife || m.x > width + 50 || m.y > height + 50) {
          shooting.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-[#03040a]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(40,30,90,0.55) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(20,60,80,0.5) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(10,10,30,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Nebula clouds */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      {/* Starfield canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Distant sun / planet arc in top-right */}
      <div
        className="absolute -top-48 -right-48 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,179,92,0.35) 0%, rgba(123,112,216,0.18) 35%, transparent 65%)",
          boxShadow:
            "0 0 200px 40px rgba(255,179,92,0.12), inset -40px -40px 120px rgba(0,0,0,0.6)",
          filter: "blur(2px)",
        }}
      />

      {/* Orbiting planets */}
      <div className="orbit-system">
        <div className="orbit orbit-1">
          <span className="planet planet-teal" />
        </div>
        <div className="orbit orbit-2">
          <span className="planet planet-purple" />
        </div>
        <div className="orbit orbit-3">
          <span className="planet planet-amber" />
        </div>
      </div>

      {/* Vignette for legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,4,10,0.7)_100%)]" />
    </div>
  );
}
