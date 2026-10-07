const visibleHeightRatio = plant => plant.plantType === 'Carpeting plants' ? .32
  : plant.plantType === 'Mosses & liverworts' ? .64
    : plant.plantType === 'Algae balls' ? .58
    : plant.plantType === 'Floating plants' ? .58 : .84

// SVGs use a square viewBox. Width is derived from physical plant height and
// the rendered aquarium's length/height aspect ratio, never a fixed CSS size.
export function plantWidthPercent(plant, tankSize) {
  if (plant.photoAspectRatio) return plant.heightCm / tankSize.lengthCm * plant.photoAspectRatio * 100
  return plant.heightCm / tankSize.lengthCm / visibleHeightRatio(plant) * 100
}

export function plantPlacement(plant, tankSize, slot) {
  const width = plantWidthPercent(plant, tankSize)
  const boxHeight = width * tankSize.lengthCm / tankSize.heightCm / (plant.photoAspectRatio || 1)
  const floating = plant.plantType === 'Floating plants'
  return {
    left: `${Math.max(width / 2, Math.min(100 - width / 2, slot[0]))}%`,
    width: `${width}%`,
    ...(floating ? { top: `${plant.photoAspectRatio ? 1 : 1 - boxHeight * .25}%` } : { bottom: `${9 + slot[1]}%` }),
  }
}
