import type { SectionName } from '@/lib/types'

// Line drawings used for the section intro slides and the header mark.
// All share one tooth outline (viewBox 0 0 200 240) and draw in currentColor.
const TOOTH =
  'M58 52 C54 26 82 14 100 30 C118 14 146 26 142 52 C140 74 130 90 130 116 C130 150 128 214 114 214 C102 214 106 156 100 152 C94 156 98 214 86 214 C72 214 70 150 70 116 C70 90 60 74 58 52 Z'
const PONTIC =
  'M58 52 C54 26 82 14 100 30 C118 14 146 26 142 52 C140 74 130 90 130 116 C130 126 124 132 115 134 C105 138 95 138 85 134 C76 132 70 126 70 116 C70 90 60 74 58 52 Z'
const CHAMBER =
  'M82 62 C82 50 94 46 100 56 C106 46 118 50 118 62 C118 80 112 92 110 104 C106 108 94 108 90 104 C88 92 82 80 82 62 Z'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const

/** Small tooth for the header. */
export function ToothMark() {
  return (
    <svg viewBox="50 10 100 210" className="tooth-mark" aria-hidden="true">
      <path d={TOOTH} {...stroke} strokeWidth={9} />
    </svg>
  )
}

function Endodontics() {
  return (
    <svg viewBox="0 0 200 240" className="intro-art" aria-hidden="true">
      <path d={TOOTH} {...stroke} />
      <path d={CHAMBER} {...stroke} />
      <path d="M92 104 C90 140 86 178 80 204" {...stroke} />
      <path d="M108 104 C110 140 114 178 120 204" {...stroke} />
    </svg>
  )
}

function Operative() {
  return (
    <svg viewBox="0 0 200 240" className="intro-art" aria-hidden="true">
      <path d={TOOTH} {...stroke} />
      <path
        d="M70 46 C70 36 82 32 90 38 C94 46 90 56 82 58 C74 58 70 52 70 46 Z"
        {...stroke}
        fill="currentColor"
        fillOpacity={0.35}
      />
      <circle cx="81" cy="46" r="19" {...stroke} strokeDasharray="2 5" />
      <path d="M150 24 L158 12 M158 40 L172 38 M146 8 L146 -2" {...stroke} />
    </svg>
  )
}

function Prosthodontics() {
  return (
    <svg viewBox="0 0 440 240" className="intro-art intro-art-wide" aria-hidden="true">
      <path d={TOOTH} {...stroke} />
      <path d="M68 98 C90 106 110 106 132 98" {...stroke} />
      <g transform="translate(120 0)">
        <path d={PONTIC} {...stroke} />
      </g>
      <g transform="translate(240 0)">
        <path d={TOOTH} {...stroke} />
        <path d="M68 98 C90 106 110 106 132 98" {...stroke} />
      </g>
      <path d="M131 100 H189 M130 116 H190 M251 100 H309 M250 116 H310" {...stroke} />
    </svg>
  )
}

const art: Record<SectionName, () => React.JSX.Element> = {
  Endodontics,
  'Operative Dentistry': Operative,
  'Fixed Prosthodontics': Prosthodontics,
}

export function SectionArt({ section }: { section: SectionName }) {
  const Art = art[section]
  return <Art />
}
