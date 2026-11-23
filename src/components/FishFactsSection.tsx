import { FileCode2, Fish } from 'lucide-react';
import { FISH_METRICS, type FishSpecies } from '../data/fishData';
import { STUDENT_CONFIG } from '../studentConfig';

interface FishFactsSectionProps {
  species: FishSpecies;
}

export function FishFactsSection({ species }: FishFactsSectionProps) {
  return (
    <section
      id="fisa-speciei"
      className="border-t border-[var(--border-soft)] bg-[var(--bg-page)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Metrici și curiozități despre specia selectată */}
          <div className="min-w-0 lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-reef)]">
              <Fish className="h-4 w-4" aria-hidden="true" />
              Fișa speciei selectate
            </div>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--ink-main)] sm:text-3xl">
              {species.name} — {species.origin}
            </h2>
            <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-[var(--ink-muted)]">
              {species.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FISH_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-4"
                >
                  <div className="text-xs font-semibold text-[var(--ink-muted)]">{m.label}</div>
                  <div className="mt-1 font-[var(--font-display)] text-3xl font-bold text-[var(--accent-reef)]">
                    {m.value}
                    {m.suffix}
                  </div>
                  <div className="mt-1 text-xs text-[var(--ink-muted)]">{m.detail}</div>
                </div>
              ))}
            </div>

            <ul className="mt-5 space-y-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-5 text-sm text-[var(--ink-main)]">
              {species.facts.map((fact, idx) => (
                <li key={idx}>• {fact}</li>
              ))}
            </ul>
          </div>

          {/* Card personalizat din studentConfig.ts */}
          <div className="min-w-0 lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-coral)]/12 px-2.5 py-1 font-[var(--font-mono)] text-xs font-semibold text-[var(--accent-coral)]">
                <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                src/studentConfig.ts
              </div>
              <h3 className="mt-3 font-[var(--font-display)] text-xl font-bold text-[var(--ink-main)]">
                Fișa Fork-ului Tău
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">
                Datele de mai jos sunt citite direct din <code className="font-semibold text-[var(--ink-main)]">src/studentConfig.ts</code>. După ce faci Fork pe GitHub, editează acel fișier cu numele tău și observă cum platforma aleasă actualizează pagina live!
              </p>

              <dl className="mt-5 space-y-3 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-page)] p-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[var(--ink-muted)]">Nume pește:</dt>
                  <dd className="font-semibold text-[var(--ink-main)]">{STUDENT_CONFIG.numePeste}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[var(--ink-muted)]">Student:</dt>
                  <dd className="font-semibold text-[var(--ink-main)]">{STUDENT_CONFIG.numeStudent}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[var(--ink-muted)]">Grupa:</dt>
                  <dd className="font-[var(--font-mono)] text-xs font-semibold text-[var(--accent-reef)]">
                    {STUDENT_CONFIG.grupa}
                  </dd>
                </div>
                <div className="border-t border-[var(--border-soft)] pt-2.5">
                  <dt className="text-xs text-[var(--ink-muted)]">Mesaj:</dt>
                  <dd className="mt-0.5 text-sm font-medium text-[var(--ink-main)]">
                    „{STUDENT_CONFIG.mesaj}”
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
