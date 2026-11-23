import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { ANATOMY_HOTSPOTS, type FishSpecies } from '../data/fishData';
import { AnimatedFishSvg } from './AnimatedFishSvg';

interface AnatomyExplorerProps {
  species: FishSpecies;
  motionPaused: boolean;
}

export function AnatomyExplorer({ species, motionPaused }: AnatomyExplorerProps) {
  const [selectedId, setSelectedId] = useState(ANATOMY_HOTSPOTS[0].id);

  const selectedIndex = ANATOMY_HOTSPOTS.findIndex((h) => h.id === selectedId);
  const current = ANATOMY_HOTSPOTS[selectedIndex] ?? ANATOMY_HOTSPOTS[0];

  const handleCycle = (dir: -1 | 1) => {
    const nextIdx = (selectedIndex + dir + ANATOMY_HOTSPOTS.length) % ANATOMY_HOTSPOTS.length;
    setSelectedId(ANATOMY_HOTSPOTS[nextIdx].id);
  };

  return (
    <section
      id="anatomie"
      className="border-t border-[var(--border-soft)] bg-[var(--bg-card)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[64ch]">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-reef)]">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Anatomie interactivă
          </div>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--ink-main)]">
            Cum funcționează corpul unui {species.name}?
          </h2>
          <p className="mt-2 text-base text-[var(--ink-muted)]">
            Apasă pe oricare dintre punctele de pe diagramă pentru a vedea rolul fiecărei părți anatomice.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Diagrama cu hotspot-uri */}
          <div className="min-w-0 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-page)] p-6 sm:p-10">
              <div className="relative mx-auto max-w-[520px]">
                <AnimatedFishSvg
                  species={species}
                  paused={motionPaused}
                  className="h-auto w-full drop-shadow-[0_12px_18px_rgba(19,34,43,0.14)]"
                />

                {ANATOMY_HOTSPOTS.map((spot, idx) => {
                  const active = spot.id === current.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      aria-pressed={active}
                      aria-label={`Inspectează ${spot.title}`}
                      onClick={() => setSelectedId(spot.id)}
                      style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                      className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-[var(--font-mono)] text-xs font-bold shadow-md transition-transform ${
                        active
                          ? 'scale-115 border-white bg-[var(--accent-coral)] text-white'
                          : 'border-white bg-[var(--accent-reef)] text-white hover:scale-110'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card explicativ */}
          <div className="min-w-0 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-page)] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-lg bg-[var(--accent-reef)]/12 px-2.5 py-1 font-[var(--font-mono)] text-xs font-semibold text-[var(--accent-reef)]">
                    {current.role}
                  </span>
                  <span className="font-[var(--font-mono)] text-xs text-[var(--ink-muted)]">
                    {selectedIndex + 1} / {ANATOMY_HOTSPOTS.length}
                  </span>
                </div>

                <h3 className="mt-3 font-[var(--font-display)] text-2xl font-bold text-[var(--ink-main)]">
                  {current.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {current.explanation}
                </p>

                <div className="mt-4 rounded-xl border-l-4 border-[var(--accent-coral)] bg-white p-3.5 text-xs leading-relaxed text-[var(--ink-main)]">
                  <strong className="font-semibold text-[var(--accent-coral)]">Știai că: </strong>
                  {current.funFact}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border-soft)] pt-4">
                  <button
                    type="button"
                    onClick={() => handleCycle(-1)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-strong)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-main)] hover:border-[var(--accent-reef)]"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCycle(1)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-strong)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-main)] hover:border-[var(--accent-reef)]"
                  >
                    Următor
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
