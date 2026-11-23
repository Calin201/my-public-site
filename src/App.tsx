import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Fish, Pause, Play } from 'lucide-react';
import {
  FISH_SPECIES,
  type FishSpeciesId,
  type WaterLightingId,
} from './data/fishData';
import { STUDENT_CONFIG } from './studentConfig';
import { AquariumStage } from './components/AquariumStage';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { FishFactsSection } from './components/FishFactsSection';

export function App() {
  const [speciesId, setSpeciesId] = useState<FishSpeciesId>('koi');
  const [lightingId, setLightingId] = useState<WaterLightingId>('day');
  const [motionPaused, setMotionPaused] = useState(false);

  const [osReducedMotion, setOsReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setOsReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const shouldReduceMotion = motionPaused || osReducedMotion;
  const selectedSpecies = FISH_SPECIES.find((s) => s.id === speciesId) ?? FISH_SPECIES[0];

  return (
    <MotionConfig reducedMotion={motionPaused ? 'always' : 'user'}>
      <div className={`app-root min-h-screen ${motionPaused ? 'motion-paused' : ''}`}>
        <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-white/90 backdrop-blur-md">
          <a href="#continut-principal" className="skip-link visually-hidden">
            Sari la acvariu
          </a>

          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="#acvariu"
              className="flex items-center gap-2.5 rounded-lg py-1 pr-2 no-underline"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-reef)] text-white">
                <Fish className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-[var(--font-display)] text-base font-bold text-[var(--ink-main)]">
                {STUDENT_CONFIG.numePeste}
              </span>
            </a>

            <nav aria-label="Secțiuni pagină" className="hidden items-center gap-2 sm:flex">
              <a
                href="#acvariu"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--ink-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--ink-main)]"
              >
                Acvariu
              </a>
              <a
                href="#anatomie"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--ink-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--ink-main)]"
              >
                Anatomie
              </a>
              <a
                href="#fisa-speciei"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--ink-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--ink-main)]"
              >
                Fișa speciei
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setMotionPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-main)] hover:border-[var(--accent-reef)]"
            >
              {motionPaused ? (
                <>
                  <Play className="h-3.5 w-3.5 text-[var(--accent-reef)]" aria-hidden="true" />
                  <span>Pornește animații</span>
                </>
              ) : (
                <>
                  <Pause className="h-3.5 w-3.5 text-[var(--ink-main)]" aria-hidden="true" />
                  <span>Pauză animații</span>
                </>
              )}
            </button>
          </div>
        </header>

        <main>
          <AquariumStage
            selectedSpecies={selectedSpecies}
            onSelectSpecies={setSpeciesId}
            lightingId={lightingId}
            onSelectLighting={setLightingId}
            motionPaused={motionPaused}
            shouldReduceMotion={shouldReduceMotion}
          />

          <AnatomyExplorer species={selectedSpecies} motionPaused={motionPaused} />

          <FishFactsSection species={selectedSpecies} />
        </main>

        <footer className="border-t border-[var(--border-soft)] bg-white py-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 text-xs text-[var(--ink-muted)] sm:px-6 lg:px-8">
            <p>
              Proiect starter React + Motion • Personalizat pentru <strong>{STUDENT_CONFIG.numeStudent}</strong>
            </p>
            <p>Pregătit pentru GitHub Pages, Vercel, Netlify și Railway</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
