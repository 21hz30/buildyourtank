import { useEffect, useRef, useState } from 'react'
import { fishPhotoFrame, storeFishPhoto } from '../lib/storeFishPhotos'

export default function FishPhoto({ fish }) {
  const photo = storeFishPhoto(fish)
  const frame = useRef(null)
  const [dimensions, setDimensions] = useState(null)
  const [failedSource, setFailedSource] = useState(null)
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setDimensions(entry.contentRect))
    observer.observe(frame.current)
    return () => observer.disconnect()
  }, [])
  return <div className="fish-store-photo" ref={frame}>
    {photo && failedSource !== photo.path
      ? <img src={photo.path} alt={fish.name} loading="lazy" decoding="async" width={photo.width} height={photo.height} style={dimensions ? fishPhotoFrame(photo, dimensions.width, dimensions.height) : undefined} onError={() => setFailedSource(photo.path)} />
      : <span className="fish-photo-unavailable" role="img" aria-label={`Photograph unavailable for ${fish.name}`}>Photograph unavailable</span>}
  </div>
}
