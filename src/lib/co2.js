// RoomScene uses a fixed 1000 × 660 illustration. The cabinet body spans
// roughly y=452–588, so even the largest cylinder stays shorter than it.
export const CO2_ROOM_GEOMETRY = {
  '60p': { heightPercent: 10.2, widthPercent: 3.5 },
  '120p': { heightPercent: 13.9, widthPercent: 4.2 },
  '150p': { heightPercent: 17.6, widthPercent: 4.8 },
}
export const CABINET_BODY_HEIGHT_PERCENT = (588 - 452) / 660 * 100

export function co2Level(tank) {
  const value = tank?.water?.co2
  return Number.isInteger(value) && value >= 0 && value <= 10 ? value : 0
}

export function co2CylinderGeometry(sizeId) {
  return CO2_ROOM_GEOMETRY[sizeId] || CO2_ROOM_GEOMETRY['60p']
}
