import { useState } from 'react'

// Catalog photographs never fall back to the illustrated tank model.
export default function PlantPhoto({ src, name, loading = 'lazy' }) {
  const [failedSource, setFailedSource] = useState(null)
  if (!src || failedSource === src) return <span className="plant-photo-unavailable" role="img" aria-label={`Photograph unavailable for ${name}`}>Photograph unavailable</span>
  return <img src={src} alt={name} loading={loading} onError={() => setFailedSource(src)} />
}
