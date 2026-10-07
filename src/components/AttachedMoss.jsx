import { useId } from 'react'
import { hardscapeViewBox, mossAttachment, MOSS_PATCHES_PER_PORTION } from '../lib/mossAttachments'

export default function AttachedMoss({ plants, scape }) {
  const maskId = `moss-surface-${scape.id}-${useId().replace(/:/g, '')}`
  if (!plants.length) return null
  const viewBox = hardscapeViewBox(scape)
  const [, , width, height] = viewBox.split(' ').map(Number)
  return <svg className={`scene-hardscape scene-hardscape-${scape.id} scene-moss`} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height} style={{ maskType: 'alpha' }}>
        <image href={scape.art} width={width} height={height} preserveAspectRatio="none" />
      </mask>
    </defs>
    <g mask={`url(#${maskId})`}>
      {plants.flatMap((plant, i) => Array.from({ length: MOSS_PATCHES_PER_PORTION }, (_, patch) => {
        const slot = mossAttachment(scape, i * MOSS_PATCHES_PER_PORTION + patch)
        return <g key={`${plant.key}-${patch}`} transform={`translate(${slot.x} ${slot.y}) rotate(${slot.angle})`}>
          <svg x={-slot.width / 2} y={-slot.height / 2} width={slot.width} height={slot.height} viewBox="0 101 240 42" preserveAspectRatio="none">
            <image href={plant.art} width="240" height="240" />
          </svg>
        </g>
      }))}
    </g>
  </svg>
}
