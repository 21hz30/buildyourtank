import { useState } from 'react'
import { plantingStyle } from '../lib/plantLayout'
import PhotoModel from './PhotoModel'

export default function PhotoPlant({ plant, size, placement }) {
  const [aspectRatio, setAspectRatio] = useState(1)
  const [failed, setFailed] = useState(false)
  return <div className={`scene-plant scene-plant-${plant.id} scene-photo-plant scene-plant-${placement.layer}`} data-plant={plant.id} data-portion={plant.key} data-layer={placement.layer} style={{ ...plantingStyle({ ...plant, photoAspectRatio: failed ? undefined : aspectRatio }, size, placement), '--sway-delay': `${placement.index * -1.4}s` }}>
    <div className="plant-foliage" style={{ transform: `rotate(${placement.angle || 0}deg) scaleX(${placement.flip})`, transformOrigin: `50% ${failed ? 226 / 240 * 100 : 100}%` }}>
      {failed ? <img src={plant.art} alt="" /> : <PhotoModel item={plant} type="plant" onReady={setAspectRatio} onError={() => setFailed(true)} />}
    </div>
  </div>
}
