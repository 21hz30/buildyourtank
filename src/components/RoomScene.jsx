import { useState } from 'react'
import Icon from './Icon'
import TankObserver from './TankObserver'
import TankScene from './TankScene'
import { SIZES } from '../lib/tank'

export default function RoomScene({ tank, feeding = false, changedWater = false, compact = false, showDimensions = true, observe = !compact }) {
  const [observing, setObserving] = useState(false)
  const size = SIZES.find(item => item.id === tank.size)
  const widths = { '60p': 24, '120p': 48, '150p': 60 }
  return <><div className={`room-scene ${compact ? 'room-compact' : ''}`} aria-label={`Room view: ${size.name}, ${size.dimensions}. Furniture stays the same size for comparison.`}>
    <div className="room-world">
      <img className="room-background" src="/art/room.svg" alt="A quiet room with an ivory wall, a window, a cabinet and plants" />
      <div className={`room-tank glass-${tank.glass || 'regular'}`} style={{ width: `${widths[tank.size]}%` }}><TankScene tank={tank} feeding={feeding} changedWater={changedWater} mini={compact} /><div className="tank-shadow" />{showDimensions && <div className="dimension-line"><span>{size.lengthCm} cm</span></div>}</div>
    </div>
    {observe && <button className="observe-button" onClick={() => setObserving(true)}><Icon name="search" size={15} />Observe tank</button>}
    {!compact && <div className="room-caption"><span className="small-dot" />Same room. A different little world.</div>}
  </div>{observing && <TankObserver key={`${tank.id || tank.name}-${tank.size}`} tank={tank} feeding={feeding} changedWater={changedWater} onClose={() => setObserving(false)} />}</>
}
