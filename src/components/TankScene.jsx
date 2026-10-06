import { CATALOG, SIZES } from '../lib/tank'
import { fishPlacement } from '../lib/fishScale'
import { plantPlacement } from '../lib/plantScale'
import { co2Level } from '../lib/co2'
import { scapeFor } from '../lib/scapes'

const fishSlots = [
  [53, 39], [28, 40], [35, 49], [43, 32], [63, 47], [72, 28], [21, 26], [49, 56], [75, 58], [31, 59], [64, 25], [17, 53],
]
const plantSlots = [[18, 0], [76, 3], [11, 1], [86, -1], [29, 1], [65, 0], [40, 1], [53, -1]]

export default function TankScene({ tank, feeding, changedWater, mini = false }) {
  const size = SIZES.find(item => item.id === tank.size)
  const fish = CATALOG.fish.flatMap(item => Array.from({ length: tank.fish[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  const plants = CATALOG.plants.flatMap(item => Array.from({ length: tank.plants[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  const co2 = co2Level(tank)
  const scape = scapeFor(tank)
  return <div className={`aquarium aquarium-${tank.sand} ${feeding ? 'is-feeding' : ''} ${changedWater ? 'is-refreshing' : ''} ${mini ? 'aquarium-mini' : ''}`} style={{ '--tank-ratio': size.lengthCm / size.heightCm }} role="img" aria-label={`${tank.name}: ${fish.length} fish and ${plants.length} plants in a ${size.name} tank with ${scape.name.toLowerCase()}${co2 > 0 ? ` and a CO₂ diffuser at level ${co2} of 10` : ''}`}>
    <div className="water-surface" />
    <div className="light-ray ray-one" /><div className="light-ray ray-two" />
    <div className="distant-rock rock-one" /><div className="distant-rock rock-two" />
    <div className="substrate"><div className="substrate-top" /><div className="small-stones"><i /><i /><i /><i /><i /><i /></div></div>
    <img className={`scene-hardscape scene-hardscape-${scape.id}`} src={scape.art} alt="" />
    {co2 > 0 && <div className="co2-system" aria-hidden="true">
      <span className="co2-tubing" /><span className="co2-diffuser"><i /></span>
      {Array.from({ length: 4 + co2 * 2 }, (_, i) => <span key={i} className="co2-microbubble" style={{ left: `${7.2 + i % 7 * .45}%`, '--co2-rest': `${25 + i % 6 * 10}%`, '--co2-drift': `${(i % 5 - 2) * 4}px`, '--co2-delay': `${-i * .39}s`, '--co2-duration': `${4.7 - co2 * .16 + i % 3 * .3}s`, '--co2-size': `${2 + i % 3 * .55}px` }} />)}
    </div>}
    {plants.map((plant, i) => { const slot = plantSlots[i % plantSlots.length]; return <div key={plant.key} className={`scene-plant scene-plant-${plant.id}`} style={{ ...plantPlacement(plant, size, slot), zIndex: i % 2 ? 6 : 2, '--sway-delay': `${i * -1.4}s` }}><img src={plant.art} alt="" /></div> })}
    {fish.map((item, i) => { const slot = fishSlots[i % fishSlots.length]; return <div key={item.key} className={`scene-fish scene-fish-${item.id}`} style={{ ...fishPlacement(item, size, slot), '--swim-delay': `${-i * 1.1}s`, '--swim-duration': `${7 + i % 4}s`, zIndex: i % 3 === 0 ? 7 : 4 }}><img style={{ transform: i % 3 === 0 ? 'scaleX(-1)' : undefined }} src={item.art} alt="" /></div> })}
    {[0, 1, 2, 3, 4].map(i => <span key={i} className="air-bubble" style={{ left: `${82 + i % 2 * 2}%`, '--bubble-delay': `${i * -1.5}s`, '--bubble-size': `${4 + i % 3 * 2}px` }} />)}
    {feeding && Array.from({ length: 8 }, (_, i) => <span key={i} className="food-particle" style={{ left: `${35 + i * 4}%`, animationDelay: `${i * .15}s` }} />)}
    <div className="tank-edge" />
    {fish.length === 0 && !mini && <div className="scene-empty">A whole little world is waiting<br /><span>Add your first fish from the store</span></div>}
  </div>
}
