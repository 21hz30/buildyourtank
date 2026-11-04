import { plantingStyle } from '../lib/plantLayout'

export default function ModeledPlant({ plant, size, placement }) {
  return <div className={`scene-plant scene-plant-${plant.id} scene-plant-${placement.layer}`} data-plant={plant.id} data-portion={plant.key} data-layer={placement.layer} style={{ ...plantingStyle(plant, size, placement), '--sway-delay': `${placement.index * -1.4}s` }}>
    <div className="plant-foliage" style={{ width: '100%', height: '100%', transform: `rotate(${placement.angle || 0}deg) scaleX(${placement.flip})`, transformOrigin: `50% ${226 / 240 * 100}%` }}>
      <img src={plant.art} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  </div>
}
