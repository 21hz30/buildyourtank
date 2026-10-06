import { CATALOG, SIZES } from '../lib/tank'
import { plantPlacement } from '../lib/plantScale'
import { co2Level } from '../lib/co2'
import { scapeFor } from '../lib/scapes'
import GlassLilyPipes from './GlassLilyPipes'
import { isAttachedMoss } from '../lib/mossAttachments'
import AttachedMoss from './AttachedMoss'
import SwimmingFish from './SwimmingFish'

const plantSlots = [[18, 0], [76, 3], [11, 1], [86, -1], [29, 1], [65, 0], [40, 1], [53, -1]]

export default function TankScene({ tank, feeding, changedWater, mini = false }) {
  const size = SIZES.find(item => item.id === tank.size)
  const fish = CATALOG.fish.flatMap(item => Array.from({ length: tank.fish[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  const plants = CATALOG.plants.flatMap(item => Array.from({ length: tank.plants[item.id] || 0 }, (_, i) => ({ ...item, key: `${item.id}-${i}` })))
  const co2 = co2Level(tank)
  const scape = scapeFor(tank)
  const rootedPlants = plants.filter(plant => !isAttachedMoss(plant))
  const mossPlants = plants.filter(isAttachedMoss)
  return <div className={`aquarium aquarium-${tank.sand} ${feeding ? 'is-feeding' : ''} ${changedWater ? 'is-refreshing' : ''} ${mini ? 'aquarium-mini' : ''}`} style={{ '--tank-ratio': size.lengthCm / size.heightCm }} role="img" aria-label={`${tank.name}: ${fish.length} fish and ${plants.length} plants in a ${size.name} tank with ${scape.name.toLowerCase()}${co2 > 0 ? ` and a CO₂ diffuser at level ${co2} of 10` : ''}`}>
    <div className="water-surface" />
    <div className="light-ray ray-one" /><div className="light-ray ray-two" />
    <div className="substrate"><div className="substrate-top" /><div className="small-stones"><i /><i /><i /><i /><i /><i /></div></div>
    <img className={`scene-hardscape scene-hardscape-${scape.id}`} src={scape.art} alt="" />
    {tank.filter?.startsWith('ada-') || tank.filter?.startsWith('eheim-') || tank.filter?.startsWith('oase-') ? <GlassLilyPipes /> : null}
    <AttachedMoss plants={mossPlants} scape={scape} />
    {co2 > 0 && <div className="co2-system" aria-hidden="true">
      <span className="co2-tubing" /><span className="co2-diffuser"><i /></span>
      {Array.from({ length: 4 + co2 * 2 }, (_, i) => <span key={i} className="co2-microbubble" style={{ left: `${7.2 + i % 7 * .45}%`, '--co2-rest': `${25 + i % 6 * 10}%`, '--co2-drift': `${(i % 5 - 2) * 4}px`, '--co2-delay': `${-i * .39}s`, '--co2-duration': `${4.7 - co2 * .16 + i % 3 * .3}s`, '--co2-size': `${2 + i % 3 * .55}px` }} />)}
    </div>}
    {rootedPlants.map((plant, i) => { const slot = plantSlots[i % plantSlots.length]; return <div key={plant.key} className={`scene-plant scene-plant-${plant.id}`} style={{ ...plantPlacement(plant, size, slot), zIndex: i % 2 ? 6 : 2, '--sway-delay': `${i * -1.4}s` }}><img src={plant.art} alt="" /></div> })}
    {fish.map((item, i) => <SwimmingFish key={item.key} fish={item} size={size} scape={scape} depth={i % 3 === 0 ? 7 : 4} />)}
    {[0, 1, 2, 3, 4].map(i => <span key={i} className="air-bubble" style={{ left: `${82 + i % 2 * 2}%`, '--bubble-delay': `${i * -1.5}s`, '--bubble-size': `${4 + i % 3 * 2}px` }} />)}
    {feeding && Array.from({ length: 8 }, (_, i) => <span key={i} className="food-particle" style={{ left: `${35 + i * 4}%`, animationDelay: `${i * .15}s` }} />)}
    <div className="tank-edge" />
    {fish.length === 0 && !mini && <div className="scene-empty">A whole little world is waiting<br /><span>Add your first fish from the store</span></div>}
  </div>
}
