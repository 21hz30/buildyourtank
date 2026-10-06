// The room drawing uses four illustration units per real centimetre.
export const ROOM_UNITS_PER_CM = 4
export const FILTER_FLOOR_Y = 607
export const TANK_RIM_Y = 452

export function filterRoomGeometry(filter, size) {
  if (!filter?.modelArt || !size) return null
  const tankWidth = size.lengthCm * ROOM_UNITS_PER_CM
  const tankRight = 500 + tankWidth / 2
  const tankTop = TANK_RIM_Y - size.heightCm * ROOM_UNITS_PER_CM
  const width = filter.widthCm * ROOM_UNITS_PER_CM
  const height = filter.heightCm * ROOM_UNITS_PER_CM
  return { tankRight, tankTop, x: tankRight + 13, y: FILTER_FLOOR_Y - height, width, height, inletX: tankRight - 18, outletX: tankRight - 46 }
}
