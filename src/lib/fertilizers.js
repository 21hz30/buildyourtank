// Store coins and slider points are illustrative; neither is a real dose or test result.
export const NUTRIENT_DEFAULT = 3
export const FERTILIZERS = [
  {
    id: 'fertilizer', nutrient: 'potassium', name: 'Seachem Flourish Potassium', symbol: 'K',
    description: '100 mL liquid potassium supplement for planted aquariums',
    amount: 3, price: 6, icon: 'leaf', unit: 'demo doses',
    photo: '/art/fertilizers/potassium.jpg', photoCredit: 'Green Aqua',
    photoSource: 'https://greenaqua.hu/en/seachem-flourish-potassium-100ml.html',
    sourceUrl: 'https://greenaqua.hu/en/seachem-flourish-potassium-100ml.html',
  },
  {
    id: 'fertilizerNitrogen', nutrient: 'nitrogen', name: 'Seachem Flourish Nitrogen', symbol: 'N',
    description: '100 mL liquid nitrogen supplement for planted aquariums',
    amount: 3, price: 6, icon: 'leaf', unit: 'demo doses',
    photo: '/art/fertilizers/nitrogen.jpg', photoCredit: 'Green Aqua',
    photoSource: 'https://greenaqua.hu/en/seachem-flourish-nitrogen-100-ml.html',
    sourceUrl: 'https://greenaqua.hu/en/seachem-flourish-nitrogen-100-ml.html',
  },
  {
    id: 'fertilizerIron', nutrient: 'iron', name: 'Seachem Flourish Iron', symbol: 'Fe',
    description: '100 mL liquid iron supplement for planted aquariums',
    amount: 3, price: 6, icon: 'leaf', unit: 'demo doses',
    photo: '/art/fertilizers/iron-100ml.jpg', photoCredit: 'Melbourne Tropical Fish',
    photoSource: 'https://melbournetropicalfish.com.au/products/seachemflourishiron100ml',
    sourceUrl: 'https://greenaqua.hu/en/seachem-flourish-iron-vas-novenytap-100-ml.html',
  },
  {
    id: 'fertilizerPhosphorus', nutrient: 'phosphorus', name: 'Seachem Flourish Phosphorus', symbol: 'P',
    description: '100 mL liquid phosphorus supplement for planted aquariums',
    amount: 3, price: 6, icon: 'leaf', unit: 'demo doses',
    photo: '/art/fertilizers/phosphorus.jpg', photoCredit: 'Green Aqua',
    photoSource: 'https://greenaqua.hu/en/seachem-flourish-phosphorus-100-ml.html',
    sourceUrl: 'https://greenaqua.hu/en/seachem-flourish-phosphorus-100-ml.html',
  },
]
export const NUTRIENTS = FERTILIZERS.map(({ nutrient }) => nutrient)
export const fertilizerFor = nutrient => FERTILIZERS.find(item => item.nutrient === nutrient)
