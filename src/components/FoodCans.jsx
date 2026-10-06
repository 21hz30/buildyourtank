import { SUPPLIES } from '../lib/workspace'

const cans = SUPPLIES.filter(item => item.art)

export default function FoodCans({ resources }) {
  const owned = cans.filter(item => (resources?.[item.id] || 0) > 0)
  if (!owned.length) return null
  return <svg className="room-food-cans" viewBox="0 0 1000 660" preserveAspectRatio="none" role="img" aria-label={`${owned.map(item => item.name).join(' and ')} cans ${owned.length > 1 ? 'stacked' : 'standing'} on the side table`}>
    <ellipse cx="184" cy="478" rx="23" ry="5" fill="#6f715f" opacity=".28" />
    {owned.map((item, index) => <image key={item.id} href={item.art} x="169" y={440 - index * 36} width="30" height="38" />)}
  </svg>
}
