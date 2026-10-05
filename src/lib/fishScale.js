// Tank length and height are physical centimetres, so the aquarium's CSS
// aspect ratio and each fish's rendered width share the same scale.
export function fishWidthPercent(fish, tankSize) {
  const visibleArtRatio = fish.artLengthRatio || 1
  return fish.adultLengthCm / tankSize.lengthCm / visibleArtRatio * 100
}

export function fishPlacement(fish, tankSize, slot) {
  const width = fishWidthPercent(fish, tankSize)
  const height = width * tankSize.lengthCm / tankSize.heightCm / (fish.artAspectRatio || 2)
  const clamp = (value, low, high) => Math.max(low, Math.min(value, high))
  return {
    left: `${clamp(slot[0], width / 2 + 2, 98 - width / 2)}%`,
    top: `${clamp(slot[1], height / 2 + 2, 85 - height / 2)}%`,
    width: `${width}%`,
  }
}
