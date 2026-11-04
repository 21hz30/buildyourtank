import photographs from './storeFishPhotos.json' with { type: 'json' }

export const storeFishPhoto = fish => photographs[fish.id]

// Fit the complete measured subject, then center it rather than the background.
// Portrait fins and long tails take precedence over filling every frame edge.
export function fishPhotoFrame(photo, frameWidth, frameHeight) {
  if (!(frameWidth > 0 && frameHeight > 0)) return { width: '100%', height: '100%', transform: 'translate(-50%, -50%)' }
  const [left, top, right, bottom] = photo.bounds || [0, 0, 1, 1]
  const width = photo.width || 1, height = photo.height || 1
  const scale = Math.min(frameWidth * .88 / ((right - left) * width), frameHeight * .84 / ((bottom - top) * height))
  return {
    width: `${width * scale / frameWidth * 100}%`,
    height: 'auto',
    transform: `translate(${-(left + right) * 50}%, ${-(top + bottom) * 50}%)`,
  }
}
