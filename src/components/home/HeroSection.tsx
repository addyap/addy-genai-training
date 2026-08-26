import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Signature hero — « De l'intention à l'intelligence ».
 * A real French instruction types itself while a cursor-reactive constellation
 * of particles converges out of noise into an ordered "intelligence": the brand's
 * promise (turn a plain sentence into a reliable AI result) performed, not described.
 * Pure Canvas 2D, no dependencies. Fully degrades under prefers-reduced-motion.
 */

const PROMPT_TEXT = "Résume ce rapport de 40 pages en 5 points pour mon équipe.";

const HeroSection = () => {
  const handleNavClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  // Mutable animation state kept in refs so the rAF loop never re-renders React.
  const mouse = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const warm = useRef({ t: 0, v: 0 });   // CTA-hover warmth 0..1
  const scroll = useRef(0);              // first-scroll dissolve 0..1

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, cx = 0, cy = 0, R = 0;
    let particles: {
      x: number; y: number; z: number;
      sx: number; sy: number; sz: number;
      amber: boolean; tw: number; sp: number;
    }[] = [];

    const buildParticles = () => {
      const N = W > 820 ? 900 : 520;
      R = Math.min(W, H) * (W > 820 ? 0.30 : 0.34);
      particles = [];
      for (let i = 0; i < N; i++) {
        const torus = i % 3 === 0;
        let x: number, y: number, z: number;
        if (torus) {
          const a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI * 2;
          const rr = R * 0.62, tube = R * 0.16;
          x = (rr + tube * Math.cos(b)) * Math.cos(a);
          y = tube * Math.sin(b) * 1.4;
          z = (rr + tube * Math.cos(b)) * Math.sin(a);
        } else {
          const u = Math.random(), v = Math.random();
          const th = Math.acos(2 * u - 1), ph = 2 * Math.PI * v;
          const rad = R * (0.72 + Math.random() * 0.28);
          x = rad * Math.sin(th) * Math.cos(ph);
          y = rad * Math.sin(th) * Math.sin(ph);
          z = rad * Math.cos(th);
        }
        particles.push({
          x, y, z,
          sx: (Math.random() - 0.5) * W * 2.2,
          sy: (Math.random() - 0.5) * H * 2.2,
          sz: (Math.random() - 0.5) * R * 6,
          amber: Math.random() < 0.12,
          tw: Math.random() * Math.PI * 2,
          sp: 0.6 + Math.random() * 0.8,
        });
      }
    };

    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W > 820 ? W * 0.68 : W * 0.5;
      cy = H * 0.5;
      buildParticles();
    };
    resize();

    let rotY = 0, rotX = 0;
    const born = performance.now();
    const INTRO = reduce ? 0 : 1500;
    const startDelay = reduce ? 0 : 850;

    let raf = 0;
    const frame = (now: number) => {
      const t = now - born;
      let conv = INTRO <= 0 ? 1 : Math.max(0, Math.min(1, (t - startDelay) / INTRO));
      conv = conv < 1 ? 1 - Math.pow(1 - conv, 3) : 1; // easeOutCubic

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      warm.current.v += (warm.current.t - warm.current.v) * 0.08;
      const mx = mouse.current.x, my = mouse.current.y, wv = warm.current.v;
      const scrollK = scroll.current;

      rotY += (reduce ? 0 : 0.0016) * (1 - scrollK * 0.7) + mx * 0.0009;
      rotX += (my * 0.35 - rotX) * 0.05;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const persp = R * 3.2;
      const lightX = mx * R * 1.3, lightY = my * R * 1.3, lightZ = R * 1.6;
      const expand = 1 + scrollK * 0.8;
      const globalFade = 1 - scrollK;

      ctx.clearRect(0, 0, W, H);
      if (globalFade <= 0.01) { raf = requestAnimationFrame(frame); return; }

      // core glow + luminous heart
      const coreR = R * 1.6 * (1 + wv * 0.05);
      const coreCol = wv > 0.02 ? '245,158,11' : '124,92,240';
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      g.addColorStop(0, `rgba(${coreCol},${0.20 * globalFade * (0.5 + conv * 0.5)})`);
      g.addColorStop(0.5, `rgba(124,92,240,${0.06 * globalFade})`);
      g.addColorStop(1, 'rgba(124,92,240,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      hg.addColorStop(0, `rgba(${wv > 0.02 ? '255,210,140' : '200,185,255'},${0.22 * globalFade * conv})`);
      hg.addColorStop(1, 'rgba(124,92,240,0)');
      ctx.fillStyle = hg; ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';

      const draw: { sx: number; sy: number; s: number; z: number; amber: boolean; tw: number; lit: number }[] = [];
      for (const p of particles) {
        const hx = p.x * expand, hy = p.y * expand, hz = p.z * expand;
        let bx = p.sx + (hx - p.sx) * conv;
        let by = p.sy + (hy - p.sy) * conv;
        const bz = p.sz + (hz - p.sz) * conv;
        bx += mx * R * 0.10 * p.sp * conv;
        by += my * R * 0.10 * p.sp * conv;

        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;
        const y1 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const s = persp / (persp - z2);
        const lit = 1 - Math.min(1, (Math.abs(x1 - lightX) + Math.abs(y1 - lightY) + Math.abs(z2 - lightZ)) / (R * 4));
        draw.push({ sx: cx + x1 * s, sy: cy + y1 * s, s, z: z2, amber: p.amber, tw: p.tw + now * 0.002 * p.sp, lit });
      }
      draw.sort((a, b) => a.z - b.z);

      const wr = Math.round(124 + (245 - 124) * wv);
      const wg = Math.round(92 + (158 - 92) * wv);
      const wb = Math.round(240 + (11 - 240) * wv);
      const violet = `${wr},${wg},${wb}`;

      for (const d of draw) {
        if (d.sx < -50 || d.sx > W + 50 || d.sy < -50 || d.sy > H + 50) continue;
        const depth = (d.z + R) / (2 * R);
        const tw = 0.6 + 0.4 * Math.sin(d.tw);
        const size = (d.amber ? 1.9 : 1.4) * d.s * tw;
        const alpha = (0.18 + depth * 0.72) * (0.4 + d.lit * 0.6) * globalFade * (0.25 + conv * 0.75) * tw;
        if (alpha <= 0.01) continue;
        const col = d.amber ? '245,158,11' : violet;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${col},${alpha * 0.5})`;
        ctx.arc(d.sx, d.sy, size * 2.6, 0, 6.283);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${d.amber ? '255,220,150' : '220,210,255'},${alpha})`;
        ctx.arc(d.sx, d.sy, size, 0, 6.283);
        ctx.fill();
      }

      // connective filaments among front particles — "structure" out of noise
      if (conv > 0.55) {
        const front = draw.slice(Math.max(0, draw.length - 70));
        const thr = R * 0.34, thr2 = thr * thr;
        const lw = wv > 0.02 ? '245,190,90' : '150,130,255';
        ctx.lineWidth = 1;
        for (let a = 0; a < front.length; a++) {
          const A = front[a];
          for (let b = a + 1; b < front.length; b++) {
            const B = front[b];
            const dx = A.sx - B.sx, dy = A.sy - B.sy, dd = dx * dx + dy * dy;
            if (dd < thr2) {
              const la = (1 - dd / thr2) * 0.16 * globalFade * (conv - 0.55) / 0.45;
              if (la <= 0.008) continue;
              ctx.strokeStyle = `rgba(${lw},${la})`;
              ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(B.sx, B.sy); ctx.stroke();
            }
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // ---- interactions ----
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onScroll = () => {
      scroll.current = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.85)));
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    // ---- entrance: reveal + typing ----
    stage.classList.add('is-live');
    let typeTimer: number | undefined;
    if (reduce) {
      if (typedRef.current) typedRef.current.textContent = PROMPT_TEXT;
      if (caretRef.current) caretRef.current.style.display = 'none';
    } else {
      const type = (i: number) => {
        if (i > PROMPT_TEXT.length) return;
        if (typedRef.current) typedRef.current.textContent = PROMPT_TEXT.slice(0, i);
        const ch = PROMPT_TEXT[i - 1] || '';
        const delay = ch === ' ' ? 34 : ch === '.' ? 260 : 30 + Math.random() * 45;
        typeTimer = window.setTimeout(() => type(i + 1), delay);
      };
      typeTimer = window.setTimeout(() => type(1), 1250);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      if (typeTimer) clearTimeout(typeTimer);
    };
  }, []);

  const warmOn = () => { warm.current.t = 1; };
  const warmOff = () => { warm.current.t = 0; };

  return (
    <section ref={stageRef} className="hero-stage">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      <div className="relative z-[3] w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <span className="hero-kicker hero-reveal">
          <span className="dot" />
          Formation IA générative · Antony Addy
        </span>

        <h1 className="hero-head mt-6 text-white">
          <span className="line"><span>De l'intention</span></span>
          <span className="line"><span>à&nbsp;<span className="hero-grad">l'intelligence</span></span></span>
        </h1>

        <div className="hero-prompt hero-reveal mt-7">
          <span className="chev">&gt;_</span>
          <span className="typed" ref={typedRef} />
          <span className="hero-caret" ref={caretRef} />
        </div>

        <p className="hero-sub hero-reveal mt-6 max-w-[46ch] text-lg sm:text-xl text-white/80 leading-relaxed">
          Je forme vos équipes à transformer une phrase du quotidien en un résultat{' '}
          <b className="font-semibold text-white">fiable</b> avec l'IA générative —{' '}
          <b className="font-semibold text-white">sans jargon</b>, sur vos propres cas d'usage.
        </p>

        <p
          className="hero-meta hero-reveal mt-4 text-sm text-white/55 tracking-wide"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Formateur Professionnel d'Adultes certifié d'État · Fréjus · présentiel &amp; distanciel
        </p>

        <div className="hero-cta hero-reveal mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch sm:items-center">
          <Link to="/contact" onClick={handleNavClick} onPointerEnter={warmOn} onPointerLeave={warmOff}>
            <Button size="lg" className="w-full sm:w-auto text-base">
              Demander un devis
            </Button>
          </Link>

          <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-base">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </a>

          <Link to="/formations" onClick={handleNavClick}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/60 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-base"
            >
              Voir les formations
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-cue hero-reveal" aria-hidden="true">
        <span>Scroll</span>
        <span className="rail" />
      </div>
    </section>
  );
};

export default HeroSection;
