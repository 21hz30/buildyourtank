import { CATALOG } from '../lib/tank'

const fishSlots = [
  [53, 39], [28, 40], [35, 49], [43, 32], [63, 47], [72, 28], [21, 26], [49, 56], [75, 58], [31, 59], [64, 25], [17, 53],
]
const plantSlots = [[18, 0], [76, 3], [11, 1], [86, -1], [29, 1], [65, 0], [40, 1], [53, -1]]

export default function TankScene({ tank, feeding, changedWater, mini = false }) {
  const fish = CATALOG.fish.flatMap(item => Array.from({ length: tank.fish[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  const plants = CATALOG.plants.flatMap(item => Array.from({ length: tank.plants[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  return <div className={`aquarium aquarium-${tank.sand} ${feeding ? 'is-feeding' : ''} ${changedWater ? 'is-refreshing' : ''} ${mini ? 'aquarium-mini' : ''}`} role="img" aria-label={`${tank.name}: ${fish.length} fish and ${plants.length} plants in a ${tank.size.toUpperCase()} tank`}>
    <div className="water-surface" />
    <div className="light-ray ray-one" /><div className="light-ray ray-two" />
    <div className="distant-rock rock-one" /><div className="distant-rock rock-two" />
    <div className="substrate"><div className="substrate-top" /><div className="small-stones"><i /><i /><i /><i /><i /><i /></div></div>
    <img className="driftwood" src="/art/driftwood.svg" alt="" />
    {plants.map((plant, i) => { const slot = plantSlots[i % plantSlots.length]; return <div key={plant.key} className={`scene-plant scene-plant-${plant.id}`} style={{ left: `${slot[0]}%`, bottom: `${9 + slot[1]}%`, width: `${plant.id === 'grass' ? 25 : 22}%`, zIndex: i % 2 ? 6 : 2, '--sway-delay': `${i * -1.4}s` }}><img src={plant.art} alt="" /></div> })}
    {fish.map((item, i) => { const slot = fishSlots[i % fishSlots.length]; return <div key={item.key} className={`scene-fish scene-fish-${item.id}`} style={{ left: `${slot[0]}%`, top: `${slot[1]}%`, width: `${item.id === 'angelfish' ? 17 : item.id === 'betta' ? 18 : 11}%`, '--swim-delay': `${-i * 1.1}s`, '--swim-duration': `${7 + i % 4}s`, zIndex: i % 3 === 0 ? 7 : 4 }}><img style={{ transform: i % 3 === 0 ? 'scaleX(-1)' : undefined }} src={item.art} alt="" /></div> })}
    {[0, 1, 2, 3, 4].map(i => <span key={i} className="air-bubble" style={{ left: `${82 + i % 2 * 2}%`, '--bubble-delay': `${i * -1.5}s`, '--bubble-size': `${4 + i % 3 * 2}px` }} />)}
    {feeding && Array.from({ length: 8 }, (_, i) => <span key={i} className="food-particle" style={{ left: `${35 + i * 4}%`, animationDelay: `${i * .15}s` }} />)}
    <div className="tank-edge" />
    {fish.length === 0 && !mini && <div className="scene-empty">A whole little world is waiting.<br /><span>Add your first fish from the store.</span></div>}
  </div>
}
