import { useState } from 'react'
import Dialog from './Dialog'
import Icon from './Icon'
import TankScene from './TankScene'
import { SIZES } from '../lib/tank'

export default function TankObserver({ tank, feeding, changedWater, onClose }) {
  const [zoom, setZoom] = useState(100)
  const size = SIZES.find(item => item.id === tank.size)
  const ratio = { '60p': 60 / 36, '120p': 120 / 50, '150p': 150 / 50 }[tank.size]
  const changeZoom = delta => setZoom(current => Math.max(75, Math.min(250, current + delta)))

  return <Dialog title={tank.name} className="observer-dialog" onClose={onClose}>
    <div className="observer-heading"><p>{size.name} · {size.dimensions}<span>A closer look at your little world.</span></p><div className="zoom-controls" role="group" aria-label="Tank zoom">
      <button className="icon-button" aria-label="Zoom out" disabled={zoom === 75} onClick={() => changeZoom(-25)}><Icon name="minus" size={17} /></button>
      <output aria-live="polite" aria-label="Zoom level">{zoom}%</output>
      <button className="icon-button" aria-label="Zoom in" disabled={zoom === 250} onClick={() => changeZoom(25)}><Icon name="plus" size={17} /></button>
      <button className="zoom-reset" onClick={() => setZoom(100)}>Reset view</button>
    </div></div>
    <div className="observer-viewport" style={{ '--tank-ratio': ratio }} tabIndex={0} role="region" aria-label="Aquarium close-up. Scroll to explore when zoomed in.">
      <div className="observer-base"><div className="observer-canvas" style={{ width: `${zoom}%` }}><TankScene tank={tank} feeding={feeding} changedWater={changedWater} /></div></div>
    </div>
    <p className="observer-hint"><Icon name="search" size={14} />Use + and − to explore the details. Scroll or swipe to look around when enlarged.</p>
  </Dialog>
}
