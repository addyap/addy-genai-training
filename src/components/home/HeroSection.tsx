import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useLocale, localizePath, type Locale } from '@/i18n';

/**
 * Signature hero — « De l'intention à l'intelligence ».
 * A real instruction types itself while a cursor-reactive constellation
 * of particles converges out of noise into an ordered "intelligence": the brand's
 * promise (turn a plain sentence into a reliable AI result) performed, not described.
 * Pure Canvas 2D, no dependencies. Fully degrades under prefers-reduced-motion.
 */

const HERO = {
  fr: {
    kicker: 'Formation IA générative · Antony Addy',
    prompt: 'Résume ce rapport de 40 pages en 5 points pour mon équipe.',
    head1: "De l'intention",
    head2a: 'à ',
    head2b: "l'intelligence",
    subA: 'Je forme vos équipes à transformer une phrase du quotidien en un résultat ',
    subFiable: 'fiable',
    subB: " avec l'IA générative — ",
    subJargon: 'sans jargon',
    subC: ', sur vos propres cas d’usage.',
    meta: "Formateur certifié d'État · Fréjus · présentiel & distanciel · en français ou en anglais",
    quote: 'Demander un devis',
    seeTraining: 'Voir les formations',
    whatsapp: 'Une question ? WhatsApp',
    newTab: " (s'ouvre dans un nouvel onglet)",
  },
  en: {
    kicker: 'Generative AI training · Antony Addy',
    prompt: 'Summarise this 40-page report into 5 points for my team.',
    head1: 'From intention',
    head2a: 'to ',
    head2b: 'intelligence',
    subA: 'I train your teams to turn an everyday sentence into a ',
    subFiable: 'reliable',
    subB: ' result with generative AI — ',
    subJargon: 'no jargon',
    subC: ', on your own real use cases.',
    meta: 'State-certified trainer · Fréjus · on-site & remote · in French or English',
    quote: 'Get a quote',
    seeTraining: 'See the training',
    whatsapp: 'A question? WhatsApp',
    newTab: ' (opens in a new tab)',
  },
} satisfies Record<Locale, Record<string, string>>;

const SEEN_KEY = 'hero-seen';

const HeroSection = () => {
  const locale = useLocale();
  const t = HERO[locale];
  const lp = (href: string) => localizePath(href, locale);
  const handleNavClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

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

    // Second visit in this session: skip the performance, keep the composition.
    let quick = false;
    try {
      quick = sessionStorage.getItem(SEEN_KEY) === '1';
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch { /* storage blocked — play the full intro */ }

    let W = 0, H = 0, cx = 0, cy = 0, R = 0, veil = 1;
    let particles: {
      x: number; y: number; z: number;
      sx: number; sy: number; sz: number;
      amber: boolean; tw: number; sp: number;
    }[] = [];

    const buildParticles = () => {
      // Phones get fewer, dimmer particles: the constellation sits behind the copy there.
      const N = W > 820 ? 900 : 360;
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
      // A collapsed or hidden stage would make R zero and the gradients NaN.
      if (W < 2 || H < 2) { R = 0; particles = []; return; }
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W > 820 ? W * 0.68 : W * 0.5;
      cy = H * 0.5;
      veil = W > 820 ? 1 : 0.55;
      buildParticles();
    };
    resize();

    // ---- story state: the typed instruction pulls the noise into order ----
    const promptText = t.prompt;
    let progress = 0;      // share of the prompt typed, 0..1
    let done = false;      // prompt "sent"
    let conv = 0;          // noise → form, eased toward its target
    let filament = 0;      // connective structure, appears once the prompt is sent
    let pulse = 0;         // brief glow when the prompt is sent
    let rotY = 0, rotX = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      if (R <= 0) return;

      const mx = mouse.current.x, my = mouse.current.y, wv = warm.current.v;
      const scrollK = scroll.current;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const persp = R * 3.2;
      const lightX = mx * R * 1.3, lightY = my * R * 1.3, lightZ = R * 1.6;
      const expand = (1 + scrollK * 0.8) * (1 + pulse * 0.05);
      const globalFade = (1 - scrollK) * veil;
      if (globalFade <= 0.01) return;

      // core glow + luminous heart
      const coreR = R * 1.6 * (1 + wv * 0.05);
      const coreCol = wv > 0.02 ? '245,158,11' : '124,92,240';
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      g.addColorStop(0, `rgba(${coreCol},${(0.20 * (0.5 + conv * 0.5) + pulse * 0.14) * globalFade})`);
      g.addColorStop(0.5, `rgba(124,92,240,${0.06 * globalFade})`);
      g.addColorStop(1, 'rgba(124,92,240,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      hg.addColorStop(0, `rgba(${wv > 0.02 ? '255,210,140' : '200,185,255'},${(0.22 * conv + pulse * 0.2) * globalFade})`);
      hg.addColorStop(1, 'rgba(124,92,240,0)');
      ctx.fillStyle = hg; ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';

      const pts: { sx: number; sy: number; s: number; z: number; amber: boolean; tw: number; lit: number }[] = [];
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

        const sc = persp / (persp - z2);
        const lit = 1 - Math.min(1, (Math.abs(x1 - lightX) + Math.abs(y1 - lightY) + Math.abs(z2 - lightZ)) / (R * 4));
        pts.push({ sx: cx + x1 * sc, sy: cy + y1 * sc, s: sc, z: z2, amber: p.amber, tw: p.tw + now * 0.002 * p.sp, lit });
      }
      pts.sort((a, b) => a.z - b.z);

      const wr = Math.round(124 + (245 - 124) * wv);
      const wg = Math.round(92 + (158 - 92) * wv);
      const wb = Math.round(240 + (11 - 240) * wv);
      const violet = `${wr},${wg},${wb}`;

      for (const d of pts) {
        if (d.sx < -50 || d.sx > W + 50 || d.sy < -50 || d.sy > H + 50) continue;
        const depth = (d.z + R) / (2 * R);
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(d.tw);
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
      if (filament > 0.01) {
        const front = pts.slice(Math.max(0, pts.length - 70));
        const thr = R * 0.34, thr2 = thr * thr;
        const lw = wv > 0.02 ? '245,190,90' : '150,130,255';
        ctx.lineWidth = 1;
        for (let a = 0; a < front.length; a++) {
          const A = front[a];
          for (let b = a + 1; b < front.length; b++) {
            const B = front[b];
            const dx = A.sx - B.sx, dy = A.sy - B.sy, dd = dx * dx + dy * dy;
            if (dd < thr2) {
              const la = (1 - dd / thr2) * (0.16 + pulse * 0.12) * globalFade * filament;
              if (la <= 0.008) continue;
              ctx.strokeStyle = `rgba(${lw},${la})`;
              ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(B.sx, B.sy); ctx.stroke();
            }
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    stage.classList.add('is-live');

    // ---- reduced motion: one composed, still frame; no loop, no pointer tracking ----
    if (reduce) {
      if (typedRef.current) typedRef.current.textContent = promptText;
      conv = 1; filament = 1; done = true;
      stage.classList.add('is-done');
      const still = () => { resize(); draw(0); };
      still();
      window.addEventListener('resize', still);
      return () => window.removeEventListener('resize', still);
    }

    // ---- loop: runs only while the hero is on screen and the tab is visible ----
    let raf = 0, running = false, last = 0, onScreen = true;
    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const k = (ms: number) => 1 - Math.exp(-dt / ms); // frame-rate independent easing

      const target = done ? 1 : 0.06 + 0.82 * progress;
      conv += (target - conv) * k(done ? 260 : 140);
      filament += ((done ? 1 : 0) - filament) * k(320);
      pulse *= Math.exp(-dt / 420);

      mouse.current.x += (mouse.current.tx - mouse.current.x) * k(260);
      mouse.current.y += (mouse.current.ty - mouse.current.y) * k(260);
      warm.current.v += (warm.current.t - warm.current.v) * k(200);
      rotY += (0.0016 * (1 - scroll.current * 0.7) + mouse.current.x * 0.0009) * (dt / 16.7);
      rotX += (mouse.current.y * 0.35 - rotX) * k(320);

      draw(now);
      if (running) raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      const should = onScreen && !document.hidden;
      if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
      if (!should && running) { running = false; cancelAnimationFrame(raf); }
    };
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    io.observe(stage);
    sync();

    // ---- interactions ----
    const onMove = (e: PointerEvent) => {
      if (!running) return;
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
    document.addEventListener('visibilitychange', sync);

    // ---- the instruction types itself; sending it completes the form ----
    let typeTimer: number | undefined;
    const send = () => {
      done = true;
      pulse = 1;
      stage.classList.remove('is-typing');
      stage.classList.add('is-done');
    };
    if (quick) {
      stage.classList.add('is-quick');
      if (typedRef.current) typedRef.current.textContent = promptText;
      progress = 1; conv = 0.7;
      send();
      pulse = 0;
    } else {
      const type = (i: number) => {
        if (typedRef.current) typedRef.current.textContent = promptText.slice(0, i);
        progress = i / promptText.length;
        if (i >= promptText.length) { typeTimer = window.setTimeout(send, 220); return; }
        const ch = promptText[i];
        const delay = ch === ' ' ? 40 : ch === ',' ? 160 : 20 + Math.random() * 20;
        typeTimer = window.setTimeout(() => type(i + 1), delay);
      };
      typeTimer = window.setTimeout(() => {
        stage.classList.add('is-typing');
        type(1);
      }, 650);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
      if (typeTimer) clearTimeout(typeTimer);
    };
  }, [t.prompt]);

  const warmOn = () => { warm.current.t = 1; };
  const warmOff = () => { warm.current.t = 0; };

  return (
    <section ref={stageRef} className="hero-stage">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      <div className="hero-content relative z-[3] w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <span className="hero-kicker hero-reveal">
          <span className="dot" />
          {t.kicker}
        </span>

        <h1 className="hero-head mt-6 text-white">
          <span className="line"><span>{t.head1}</span></span>
          <span className="line"><span>{t.head2a}<span className="hero-grad">{t.head2b}</span></span></span>
        </h1>

        <div className="hero-prompt hero-reveal mt-7">
          <span className="chev">&gt;_</span>
          <span className="typed" ref={typedRef} />
          <span className="hero-caret" />
        </div>

        <p className="hero-sub hero-reveal mt-6 max-w-[46ch] text-lg sm:text-xl text-white/80 leading-relaxed">
          {t.subA}
          <b className="font-semibold text-white">{t.subFiable}</b>{t.subB}
          <b className="font-semibold text-white">{t.subJargon}</b>{t.subC}
        </p>

        <p
          className="hero-meta hero-reveal mt-4 text-sm text-white/55 tracking-wide"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          {t.meta}
        </p>

        {/* One primary action; training is the secondary path; WhatsApp a quiet direct line */}
        <div className="hero-cta hero-reveal mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-4 items-stretch sm:items-center">
          <Link to={lp('/contact')} onClick={handleNavClick} onPointerEnter={warmOn} onPointerLeave={warmOff}>
            <Button size="lg" className="w-full sm:w-auto text-base">
              {t.quote}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link to={lp('/formations')} onClick={handleNavClick}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/40 bg-white/5 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-base"
            >
              {t.seeTraining}
            </Button>
          </Link>

          <a
            href="https://wa.me/33649829826"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium text-white/75 transition-colors duration-fast hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <MessageCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
            {t.whatsapp}
            <span className="sr-only">{t.newTab}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
