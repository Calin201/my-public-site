import { useId } from 'react';
import { motion } from 'motion/react';
import type { FishSpecies } from '../data/fishData';

interface AnimatedFishSvgProps {
  species: FishSpecies;
  turbo?: boolean;
  eating?: boolean;
  paused?: boolean;
  className?: string;
}

/**
 * Multi-layered vector fish with coordinated harmonic motion on tail, dorsal/ventral fins,
 * pectoral fin, breathing gill cover, blinking eye, and eating mouth animation.
 * Facing RIGHT (+X) by default so flipping scaleX(-1) mirrors cleanly.
 */
export function AnimatedFishSvg({
  species,
  turbo = false,
  eating = false,
  paused = false,
  className = '',
}: AnimatedFishSvgProps) {
  const uid = useId().replace(/:/g, '');
  const tailPeriod = turbo ? 0.32 : 0.85;
  const finPeriod = turbo ? 0.45 : 1.15;

  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={`Pește animat ${species.name}`}
      className={`overflow-visible select-none ${className}`}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0%" y1="15%" x2="90%" y2="85%">
          <stop offset="0%" stopColor={species.bodyHighlight} />
          <stop offset="55%" stopColor={species.bodyBase} />
          <stop offset="100%" stopColor={species.bellyTone} />
        </linearGradient>

        <linearGradient id={`fin-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={species.finColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={species.finAccent} stopOpacity="0.82" />
        </linearGradient>
      </defs>

      {/* Coada (Înotătoarea caudală) — pivot la baza pedunculului caudal */}
      <motion.g
        style={{ transformOrigin: '96px 102px' }}
        animate={
          paused
            ? { rotate: 0, scaleX: 1 }
            : {
                rotate: turbo ? [-16, 16, -16] : [-9, 9, -9],
                scaleX: turbo ? [0.9, 1.06, 0.9] : [0.94, 1.04, 0.94],
              }
        }
        transition={{
          duration: tailPeriod,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {species.tailType === 'veil' ? (
          <path
            d="M98 102 C68 62, 24 44, 14 70 C34 90, 32 102, 12 122 C28 152, 70 138, 98 102 Z"
            fill={`url(#fin-${uid})`}
            stroke={species.stripeOutline}
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        ) : species.tailType === 'fan' ? (
          <path
            d="M98 102 C72 74, 34 62, 26 84 C32 100, 32 104, 26 120 C34 142, 72 130, 98 102 Z"
            fill={`url(#fin-${uid})`}
            stroke={species.stripeOutline}
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M98 102 C72 68, 30 50, 22 68 C48 88, 52 102, 22 136 C30 152, 72 136, 98 102 Z"
            fill={`url(#fin-${uid})`}
            stroke={species.stripeOutline}
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
        )}
      </motion.g>

      {/* Înotătoarea dorsală */}
      <motion.path
        d={
          species.tailType === 'veil'
            ? 'M120 68 C134 20, 186 16, 206 60 C176 62, 148 64, 120 68 Z'
            : 'M128 66 C142 30, 184 30, 202 62 C178 64, 152 66, 128 66 Z'
        }
        fill={`url(#fin-${uid})`}
        stroke={species.stripeOutline}
        strokeOpacity="0.3"
        strokeWidth="1.5"
        style={{ transformOrigin: '166px 64px' }}
        animate={paused ? { rotate: 0, skewX: 0 } : { rotate: [-4, 4, -4], skewX: [-4, 4, -4] }}
        transition={{ duration: finPeriod, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
      />

      {/* Înotătoarea ventrală */}
      <motion.path
        d={
          species.tailType === 'veil'
            ? 'M132 134 C144 176, 182 180, 198 136 C172 134, 152 134, 132 134 Z'
            : 'M138 134 C148 162, 178 162, 188 136 C168 134, 152 134, 138 134 Z'
        }
        fill={`url(#fin-${uid})`}
        stroke={species.stripeOutline}
        strokeOpacity="0.3"
        strokeWidth="1.5"
        style={{ transformOrigin: '164px 134px' }}
        animate={paused ? { rotate: 0 } : { rotate: [4, -4, 4] }}
        transition={{ duration: finPeriod, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
      />

      {/* Corpul principal */}
      <g>
        <path
          d="M90 102 C112 64, 168 52, 224 66 C262 76, 286 90, 290 104 C286 120, 260 134, 220 140 C166 148, 112 136, 90 102 Z"
          fill={`url(#body-${uid})`}
          stroke={species.stripeOutline}
          strokeOpacity="0.45"
          strokeWidth="2"
        />

        {/* Marcaje specifice per specie */}
        {species.id === 'koi' && (
          <g opacity="0.92">
            <path
              d="M132 72 C152 60, 186 64, 194 84 C180 98, 154 96, 132 88 Z"
              fill={species.patternColor}
            />
            <path
              d="M214 66 C236 68, 256 78, 252 94 C236 100, 218 92, 214 66 Z"
              fill={species.patternColor}
            />
            <path
              d="M110 104 C124 94, 138 100, 136 116 C122 120, 112 114, 110 104 Z"
              fill={species.patternColor}
            />
          </g>
        )}

        {species.id === 'betta' && (
          <g opacity="0.35">
            <path d="M126 96 C158 84, 194 84, 226 94" stroke="#E0F2FE" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M136 112 C168 104, 200 104, 228 112" stroke="#E0F2FE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {species.id === 'clown' && (
          <g>
            {/* Dungi albe cu contur fin */}
            <path
              d="M136 74 C146 72, 152 130, 140 132 C130 130, 128 76, 136 74 Z"
              fill={species.patternColor}
              stroke={species.stripeOutline}
              strokeWidth="2.5"
            />
            <path
              d="M188 60 C200 62, 202 140, 190 140 C178 138, 178 62, 188 60 Z"
              fill={species.patternColor}
              stroke={species.stripeOutline}
              strokeWidth="2.5"
            />
            <path
              d="M242 71 C250 74, 252 128, 240 132 C232 126, 232 76, 242 71 Z"
              fill={species.patternColor}
              stroke={species.stripeOutline}
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Luciu superior subtil */}
        <path
          d="M138 72 C172 62, 214 66, 248 78"
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Opercul (branhii) cu respirație ritmică */}
      <motion.path
        d="M224 78 C214 96, 214 114, 224 128"
        fill="none"
        stroke={species.stripeOutline}
        strokeOpacity="0.65"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transformOrigin: '220px 104px' }}
        animate={paused ? { scaleX: 1 } : { scaleX: [1, 1.18, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Înotătoarea pectorală */}
      <motion.path
        d="M196 110 C180 116, 166 134, 176 144 C190 144, 204 128, 204 114 Z"
        fill={`url(#fin-${uid})`}
        stroke={species.stripeOutline}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        style={{ transformOrigin: '198px 112px' }}
        animate={
          paused
            ? { rotate: 0 }
            : { rotate: turbo ? [-14, 18, -14] : [-8, 12, -8] }
        }
        transition={{ duration: finPeriod * 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gură cu animație de mâncare */}
      <motion.path
        d="M276 106 Q284 110 288 105"
        fill="none"
        stroke={species.stripeOutline}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transformOrigin: '282px 106px' }}
        animate={eating && !paused ? { scaleY: [1, 2.2, 0.8, 1.8, 1] } : { scaleY: 1 }}
        transition={{ duration: 0.45 }}
      />

      {/* Ochi lucios + clipit periodic */}
      <motion.g
        style={{ transformOrigin: '258px 92px' }}
        animate={
          paused
            ? { scaleY: 1 }
            : {
                scaleY: [1, 1, 0.12, 1, 1],
              }
        }
        transition={{
          duration: 4.4,
          times: [0, 0.92, 0.95, 0.98, 1],
          repeat: Infinity,
        }}
      >
        <circle cx="258" cy="92" r="8.5" fill="#FFFFFF" stroke="#13222B" strokeWidth="1.5" />
        <circle cx="260" cy="92" r="4.5" fill="#13222B" />
        <circle cx="261.5" cy="90" r="1.6" fill="#FFFFFF" />
      </motion.g>
    </svg>
  );
}
