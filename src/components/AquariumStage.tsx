import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { Sparkles, Sun, Sunset, Moon, Utensils, Zap } from 'lucide-react';
import {
  FISH_SPECIES,
  WATER_LIGHTING,
  type FishSpecies,
  type FishSpeciesId,
  type WaterLightingId,
} from '../data/fishData';
import { AnimatedFishSvg } from './AnimatedFishSvg';
import { STUDENT_CONFIG } from '../studentConfig';

interface AquariumStageProps {
  selectedSpecies: FishSpecies;
  onSelectSpecies: (id: FishSpeciesId) => void;
  lightingId: WaterLightingId;
  onSelectLighting: (id: WaterLightingId) => void;
  motionPaused: boolean;
  shouldReduceMotion: boolean;
}

interface Pellet {
  id: number;
  xPct: number;
  yPct: number;
}

interface Ripple {
  id: number;
  xPct: number;
  yPct: number;
}

interface BurstBubble {
  id: number;
  xPct: number;
  yPct: number;
  size: number;
}

const AMBIENT_BUBBLES = [
  { left: '14%', size: 10, dur: '5.5s', delay: '0s' },
  { left: '26%', size: 7, dur: '6.8s', delay: '1.2s' },
  { left: '42%', size: 13, dur: '5.2s', delay: '0.6s' },
  { left: '58%', size: 8, dur: '7.1s', delay: '2.1s' },
  { left: '74%', size: 11, dur: '5.9s', delay: '0.4s' },
  { left: '86%', size: 9, dur: '6.4s', delay: '1.7s' },
];

export function AquariumStage({
  selectedSpecies,
  onSelectSpecies,
  lightingId,
  onSelectLighting,
  motionPaused,
  shouldReduceMotion,
}: AquariumStageProps) {
  const tankRef = useRef<HTMLDivElement | null>(null);
  const [tankSize, setTankSize] = useState({ width: 920, height: 460 });

  const [facingRight, setFacingRight] = useState(true);
  const [pitchDeg, setPitchDeg] = useState(0);
  const [turbo, setTurbo] = useState(false);
  const [eating, setEating] = useState(false);
  const [feedCount, setFeedCount] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  const [pellets, setPellets] = useState<Pellet[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [burstBubbles, setBurstBubbles] = useState<BurstBubble[]>([]);

  const pointerActiveRef = useRef(false);
  const lastTargetRef = useRef({ x: 460, y: 210 });
  const pelletCounterRef = useRef(1);

  const targetX = useMotionValue(360);
  const targetY = useMotionValue(175);

  const smoothX = useSpring(targetX, {
    stiffness: turbo ? 145 : 70,
    damping: turbo ? 14 : 16,
    mass: 0.9,
  });
  const smoothY = useSpring(targetY, {
    stiffness: turbo ? 145 : 70,
    damping: turbo ? 14 : 16,
    mass: 0.9,
  });

  const lighting = WATER_LIGHTING[lightingId];
  const isDeep = lightingId === 'deep';

  // Măsoară acvariul pentru coordonate corecte pe desktop și mobil
  useEffect(() => {
    const el = tankRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setTankSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steerFishTo = (nextX: number, nextY: number) => {
    const fishHalfW = tankSize.width < 540 ? 90 : 120;
    const fishHalfH = tankSize.width < 540 ? 55 : 72;

    const clampedX = Math.max(fishHalfW, Math.min(tankSize.width - fishHalfW, nextX));
    const clampedY = Math.max(fishHalfH + 16, Math.min(tankSize.height - fishHalfH - 42, nextY));

    const dx = clampedX - lastTargetRef.current.x;
    const dy = clampedY - lastTargetRef.current.y;

    if (Math.abs(dx) > 6) {
      setFacingRight(dx >= 0);
    }

    const tilt = Math.max(-16, Math.min(16, (dy / 160) * 14));
    setPitchDeg(dx >= 0 ? tilt : -tilt);

    lastTargetRef.current = { x: clampedX, y: clampedY };
    targetX.set(clampedX - fishHalfW);
    targetY.set(clampedY - fishHalfH);
  };

  // Înot autonom în formă de infinit (figure-8) când utilizatorul nu mișcă cursorul sau urmărește mâncarea
  useEffect(() => {
    if (pellets.length > 0) {
      const targetPellet = pellets[0];
      const px = (targetPellet.xPct / 100) * tankSize.width;
      const py = (targetPellet.yPct / 100) * tankSize.height;
      steerFishTo(px, py);
      return;
    }

    if (shouldReduceMotion) {
      steerFishTo(tankSize.width * 0.5, tankSize.height * 0.45);
      return;
    }

    let angle = 0;
    const timer = window.setInterval(() => {
      if (pointerActiveRef.current) return;
      angle += turbo ? 0.16 : 0.065;
      const cx = tankSize.width * 0.5 + Math.sin(angle) * (tankSize.width * 0.27);
      const cy = tankSize.height * 0.44 + Math.sin(angle * 2) * (tankSize.height * 0.14);
      steerFishTo(cx, cy);
    }, 60);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pellets, tankSize.width, tankSize.height, turbo, shouldReduceMotion]);

  const spawnFoodAt = (xPct: number, yPct: number) => {
    const id = pelletCounterRef.current++;
    const safeX = Math.max(12, Math.min(88, xPct));
    const safeY = Math.max(15, Math.min(72, yPct));

    setPellets((prev) => [...prev.slice(-3), { id, xPct: safeX, yPct: safeY }]);
    setRipples((prev) => [...prev.slice(-4), { id, xPct: safeX, yPct: safeY }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 750);

    window.setTimeout(() => {
      setPellets((prev) => prev.filter((p) => p.id !== id));
      setEating(true);
      setFeedCount((c) => c + 1);

      const bubbles: BurstBubble[] = Array.from({ length: 5 }, (_, i) => ({
        id: id * 10 + i,
        xPct: safeX + (i - 2) * 3.5,
        yPct: safeY,
        size: 7 + (i % 3) * 4,
      }));
      setBurstBubbles((prev) => [...prev, ...bubbles]);

      window.setTimeout(() => setEating(false), 480);
      window.setTimeout(() => {
        const ids = new Set(bubbles.map((b) => b.id));
        setBurstBubbles((prev) => prev.filter((b) => !ids.has(b.id)));
      }, 1100);
    }, shouldReduceMotion ? 220 : 620);
  };

  const handleTankClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = tankRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    spawnFoodAt(xPct, yPct);
  };

  const handleTankPointerMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || pellets.length > 0) return;
    const el = tankRef.current;
    if (!el) return;
    pointerActiveRef.current = true;
    const rect = el.getBoundingClientRect();
    steerFishTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const triggerTurbo = () => {
    setTurbo(true);
    setSpinCount((s) => s + 1);
    const idBase = pelletCounterRef.current++ * 10;
    const bubbles: BurstBubble[] = Array.from({ length: 7 }, (_, i) => ({
      id: idBase + i,
      xPct: 35 + i * 5,
      yPct: 48 + (i % 2) * 8,
      size: 6 + (i % 3) * 4,
    }));
    setBurstBubbles((prev) => [...prev, ...bubbles]);

    window.setTimeout(() => setTurbo(false), 1200);
    window.setTimeout(() => {
      const ids = new Set(bubbles.map((b) => b.id));
      setBurstBubbles((prev) => prev.filter((b) => !ids.has(b.id)));
    }, 1100);
  };

  return (
    <section id="acvariu" className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      {/* Header personalizat din studentConfig.ts */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-semibold text-[var(--accent-reef)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Proiect starter pentru Fork • {STUDENT_CONFIG.numeStudent}
          </div>
          <h1
            id="continut-principal"
            tabIndex={-1}
            className="mt-3 font-[var(--font-display)] text-3xl font-bold leading-tight text-[var(--ink-main)] focus:outline-none sm:text-5xl"
          >
            Acvariul lui {STUDENT_CONFIG.numePeste}
          </h1>
          <p className="mt-2 max-w-[60ch] text-base text-[var(--ink-muted)]">
            Mișcă mouse-ul prin apă ca să ghidezi peștele, dă click în acvariu ca să îi arunci hrană sau schimbă specia și lumina recifului.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-card)] px-3.5 py-2 font-[var(--font-mono)] text-xs font-semibold text-[var(--ink-main)]">
            Hrăniri: <span className="text-[var(--accent-coral)]">{feedCount}</span>
          </div>
          <button
            type="button"
            onClick={() => spawnFoodAt(45 + Math.random() * 20, 28)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-coral)] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-92"
          >
            <Utensils className="h-3.5 w-3.5" aria-hidden="true" />
            Hrănește peștele
          </button>
          <button
            type="button"
            onClick={triggerTurbo}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-reef)] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-92"
          >
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Turbo!
          </button>
        </div>
      </div>

      {/* Scena Acvariului */}
      <div
        ref={tankRef}
        onClick={handleTankClick}
        onMouseMove={handleTankPointerMove}
        onMouseLeave={() => {
          pointerActiveRef.current = false;
        }}
        className="relative h-[430px] w-full cursor-crosshair overflow-hidden rounded-3xl border border-[var(--border-soft)] shadow-xl sm:h-[500px]"
        style={{
          background: `linear-gradient(180deg, ${lighting.gradientTop} 0%, ${lighting.gradientMid} 48%, ${lighting.gradientBottom} 100%)`,
          transition: 'background 0.6s ease',
        }}
      >
        {/* Raze solare animate */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {[14, 38, 66].map((leftPct, i) => (
            <div
              key={leftPct}
              className="sunbeam-ray absolute -top-12 h-[130%] w-24 blur-xl"
              style={
                {
                  left: `${leftPct}%`,
                  background: `linear-gradient(180deg, ${lighting.beamColor} 0%, transparent 90%)`,
                  '--ray-delay': `${i * 1.4}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Undă subtilă de suprafață */}
        <div
          aria-hidden="true"
          className="water-caustic pointer-events-none absolute inset-x-0 top-0 h-8 opacity-45"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.65) 0%, transparent 72%)',
          }}
        />

        {/* Bule ambientale */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {AMBIENT_BUBBLES.map((b, idx) => (
            <span
              key={idx}
              className="ambient-bubble absolute bottom-10 rounded-full border border-white/60 bg-white/25"
              style={
                {
                  left: b.left,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  '--b-dur': b.dur,
                  '--b-delay': b.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Unde de la click + granule de hrană + bule de bucurie */}
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={`ripple-${r.id}`}
              initial={{ scale: 0.3, opacity: 0.85 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              aria-hidden="true"
              className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80"
              style={{ left: `${r.xPct}%`, top: `${r.yPct}%` }}
            />
          ))}

          {pellets.map((p) => (
            <motion.div
              key={`pellet-${p.id}`}
              initial={{ scale: 0.4, y: -18, opacity: 0 }}
              animate={{ scale: 1, y: 12, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
              className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-900/40 bg-amber-300 shadow"
              style={{ left: `${p.xPct}%`, top: `${p.yPct}%` }}
            />
          ))}

          {burstBubbles.map((b) => (
            <motion.span
              key={`burst-${b.id}`}
              initial={{ y: 0, opacity: 0.9, scale: 0.7 }}
              animate={{ y: -90, opacity: 0, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, ease: 'easeOut' }}
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full border border-white/80 bg-white/35"
              style={{
                left: `${b.xPct}%`,
                top: `${b.yPct}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Peștele animat cu fizică Spring */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="pointer-events-none absolute left-0 top-0 z-10 w-[180px] sm:w-[240px]"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? { scaleX: facingRight ? 1 : -1, rotate: 0 }
                : {
                    scaleX: facingRight ? 1 : -1,
                    rotate: spinCount > 0 && turbo ? [0, 360] : pitchDeg,
                    scale: turbo ? [1, 1.08, 1] : 1,
                  }
            }
            transition={{
              scaleX: { type: 'spring', stiffness: 260, damping: 22 },
              rotate:
                spinCount > 0 && turbo
                  ? { duration: 0.65, ease: 'easeInOut' }
                  : { type: 'spring', stiffness: 160, damping: 18 },
            }}
          >
            <AnimatedFishSvg
              species={selectedSpecies}
              turbo={turbo}
              eating={eating}
              paused={motionPaused}
              className="h-auto w-full drop-shadow-[0_14px_20px_rgba(19,34,43,0.28)]"
            />
          </motion.div>
        </motion.div>

        {/* Fundul acvariului: nisip + alge SVG ondulate */}
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-32"
        >
          {/* Alge spate */}
          <g fill={lighting.kelpBack} opacity="0.88">
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '5.4s', '--sway-delay': '0.2s' } as React.CSSProperties}
              d="M80 150 C70 110, 96 76, 82 36 C96 58, 108 106, 100 150 Z"
            />
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '4.9s', '--sway-delay': '1.1s' } as React.CSSProperties}
              d="M210 152 C196 108, 224 72, 214 34 C230 62, 238 110, 228 152 Z"
            />
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '5.8s', '--sway-delay': '0.6s' } as React.CSSProperties}
              d="M990 150 C976 112, 1006 72, 994 28 C1012 60, 1020 110, 1012 150 Z"
            />
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '4.6s', '--sway-delay': '1.5s' } as React.CSSProperties}
              d="M1110 152 C1098 118, 1122 80, 1110 42 C1126 68, 1134 114, 1126 152 Z"
            />
          </g>

          {/* Alge față */}
          <g fill={lighting.kelpFront}>
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '4.2s', '--sway-delay': '0s' } as React.CSSProperties}
              d="M126 156 C114 116, 144 82, 128 42 C148 70, 154 114, 144 156 Z"
            />
            <path
              className="kelp-arm"
              style={{ '--sway-dur': '4.7s', '--sway-delay': '0.9s' } as React.CSSProperties}
              d="M1044 156 C1030 118, 1062 84, 1048 48 C1068 74, 1074 118, 1064 156 Z"
            />
          </g>

          {/* Strat de nisip */}
          <path
            d="M0 124 Q240 106, 520 122 T1020 114 Q1120 112, 1200 122 L1200 160 L0 160 Z"
            fill={lighting.seabedFill}
          />
          <circle cx="170" cy="138" r="10" fill={lighting.kelpBack} opacity="0.25" />
          <circle cx="940" cy="136" r="12" fill={lighting.kelpBack} opacity="0.22" />
        </svg>

        {/* Etichetă discretă în colț cu numele speciei */}
        <div
          className={`pointer-events-none absolute left-4 top-4 rounded-xl px-3.5 py-2 text-xs backdrop-blur-md ${
            isDeep
              ? 'border border-white/20 bg-slate-900/60 text-white'
              : 'border border-white/60 bg-white/80 text-[var(--ink-main)]'
          }`}
        >
          <span className="font-bold">{selectedSpecies.name}</span>{' '}
          <span className="opacity-75 italic">({selectedSpecies.scientific})</span>
        </div>
      </div>

      {/* Bară de control specie și atmosferă */}
      <div className="mt-5 grid gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-4 sm:grid-cols-2 sm:items-center sm:p-5">
        <div>
          <span className="block text-xs font-semibold text-[var(--ink-muted)]">
            Alege specia de pește
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {FISH_SPECIES.map((sp) => {
              const active = sp.id === selectedSpecies.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelectSpecies(sp.id)}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[var(--accent-reef)] bg-[var(--accent-reef)] text-white'
                      : 'border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink-main)] hover:border-[var(--accent-reef)]'
                  }`}
                >
                  {sp.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:text-right">
          <span className="block text-xs font-semibold text-[var(--ink-muted)]">
            Iluminare acvariu
          </span>
          <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
            {(
              [
                { id: 'day', label: 'Zi de recif', icon: Sun },
                { id: 'sunset', label: 'Apus tropical', icon: Sunset },
                { id: 'deep', label: 'Adâncime nocturnă', icon: Moon },
              ] as const
            ).map((mode) => {
              const Icon = mode.icon;
              const active = lightingId === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelectLighting(mode.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[var(--ink-main)] bg-[var(--ink-main)] text-white'
                      : 'border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink-main)] hover:border-[var(--ink-main)]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
