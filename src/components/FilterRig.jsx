import { FILTERS, SIZES } from '../lib/tank'
import { filterRoomGeometry } from '../lib/filterGeometry'

export default function FilterRig({ tank }) {
  const filter = FILTERS.find(item => item.id === tank.filter)
  const size = SIZES.find(item => item.id === tank.size)
  const p = filterRoomGeometry(filter, size)
  if (!p) return null
  const hoseWidth = filter.hoseMm === '12/16' ? 6 : 8
  const hosePaths = [
    `M ${p.x + p.width * .35} ${p.y + 10} C ${p.x + p.width * .32} ${p.y - 42}, ${p.tankRight + 38} ${p.tankTop + 24}, ${p.tankRight + 23} ${p.tankTop - 15} Q ${p.tankRight + 8} ${p.tankTop - 39}, ${p.outletX + 12} ${p.tankTop - 18} Q ${p.outletX} ${p.tankTop - 9}, ${p.outletX} ${p.tankTop + 4}`,
    `M ${p.x + p.width * .67} ${p.y + 10} C ${p.x + p.width * .65} ${p.y - 38}, ${p.tankRight + 61} ${p.tankTop + 22}, ${p.tankRight + 45} ${p.tankTop - 15} Q ${p.tankRight + 24} ${p.tankTop - 38}, ${p.inletX + 13} ${p.tankTop - 17} Q ${p.inletX} ${p.tankTop - 7}, ${p.inletX} ${p.tankTop + 4}`,
  ]
  return <svg className="room-filter-rig" viewBox="0 0 1000 660" preserveAspectRatio="none" role="img" aria-label={`${filter.name} external filter to the right of the aquarium, connected by two clear hoses and glass inlet and outlet lily pipes`}>
    <defs>
      <linearGradient id="clear-filter-hose" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#536d72" stopOpacity=".58"/><stop offset=".23" stopColor="#ebfbf9" stopOpacity=".75"/><stop offset=".65" stopColor="#a6c8c5" stopOpacity=".36"/><stop offset="1" stopColor="#56787c" stopOpacity=".62"/></linearGradient>
    </defs>
    <ellipse cx={p.x + p.width / 2} cy="609" rx={p.width * .58} ry="7" fill="#51635e" opacity=".18" />
    {hosePaths.map((path, i) => <g key={i} fill="none" strokeLinecap="round"><path d={path} stroke="#4e6c73" strokeOpacity=".32" strokeWidth={hoseWidth + 2} /><path d={path} stroke="url(#clear-filter-hose)" strokeWidth={hoseWidth} /><path d={path} stroke="#fff" strokeOpacity=".65" strokeWidth="1.4" /></g>)}
    <image href={filter.modelArt} x={p.x} y={p.y} width={p.width} height={p.height} preserveAspectRatio="none" />
  </svg>
}
