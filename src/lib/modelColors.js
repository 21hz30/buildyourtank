// Shade an illustration's own pigment without imposing a shared color cast.
export function blendColor(color, tint, amount) {
  const channels = hex => hex.slice(1).match(/../g).map(channel => Number.parseInt(channel, 16))
  const source = channels(color), target = channels(tint)
  return `#${source.map((value, index) => Math.round(value + (target[index] - value) * amount).toString(16).padStart(2, '0')).join('')}`
}
