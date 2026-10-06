// Species-specific, code-native tank illustrations. The full SVG width, from
// tail tip at x=0 to snout at x=300, represents the listed adult length.
// Each entry is [silhouette, body colour, fin/mark colour, marking].
export const fishLooks = {
  'macrotocinclus-affinis': ['pleco', '#b5a87d', '#685b43', 'stripe'],
  'poecilia-reticulata': ['guppy', '#b7cbbd', '#ee8f69', 'mosaic'],
  'poecilia-wingei': ['guppy', '#a7c4a7', '#e07c43', 'mosaic'],
  'trigonostigma-espei': ['rasbora', '#dc9b69', '#493a3c', 'wedge'],
  'boraras-brigittae': ['slender', '#dc7362', '#603c49', 'stripe'],
  'puntius-titteya': ['barb', '#cc6c59', '#773f43', 'stripe'],
  'brycinus-longipinnis': ['tetra', '#b7c4b5', '#e2aa65', 'stripe'],
  'badis-badis': ['cichlid', '#7897a8', '#bc7a60', 'bars'],
  'corydoras-duplicareus': ['cory', '#d2b995', '#5a5952', 'panda'],
  'ancistrus-cirrhosus': ['pleco', '#806e55', '#c1a37c', 'spots'],
  'corydoras-nanus': ['cory', '#c6bb9f', '#5d6057', 'stripe'],
  'pangio-kuhlii': ['loach', '#d7a45f', '#5a4643', 'bands'],
  'oryzias-latipes': ['ricefish', '#cbd0bd', '#e5be77', 'stripe'],
  'stiphodon-sp': ['goby', '#91aaa8', '#4f9cba', 'neon'],
  'tanichthys-micagemmae': ['slender', '#c8bd9d', '#e58c67', 'stripe'],
  'puntigrus-tetrazona': ['barb', '#68816f', '#333f43', 'tiger'],
  'sphaerichthys-osphromenoides': ['gourami', '#755d55', '#d0ae91', 'bars'],
  'labidochromis-hongi': ['cichlid', '#819ab1', '#df8462', 'bars'],
  'pseudotropheus-elongatus': ['cichlid', '#657e9f', '#3d4e66', 'bars'],
  'macropodus-opercularis': ['gourami', '#e7b1a0', '#c15e5e', 'bars'],
  'trichopsis-pumila': ['gourami', '#9a8b9b', '#cb9071', 'spots'],
  'corydoras-hastatus': ['cory', '#d1cabb', '#4c5154', 'tailspot'],
  'hypancistrus-sp-l134': ['pleco', '#d0b885', '#4b483f', 'mosaic'],
  'hypancistrus-sp-l236': ['pleco', '#e2dcd0', '#504d50', 'maze'],
  'trichopodus-trichopterus': ['gourami', '#aebcbd', '#677f88', 'twospot'],
  'pseudacanthicus-sp-l136': ['pleco', '#6c685d', '#e0cfa0', 'spots'],
  'maylandia-callainos': ['cichlid', '#628ebc', '#44719b', 'none'],
  'hypancistrus-sp-l066': ['pleco', '#9d875f', '#514839', 'maze'],
  'boraras-maculatus': ['slender', '#d3a474', '#67474a', 'spots'],
  'beaufortia-kweichowensis': ['hillstream', '#8e947a', '#615e4c', 'mosaic'],
  'ambastaia-sidthimunki': ['loach', '#d0bd8c', '#5c6151', 'chain'],
  'poropanchax-normani': ['ricefish', '#c4c7a9', '#7c9db2', 'lampeye'],
  'carassius-auratus': ['goldfish', '#e7a458', '#e4c17c', 'none'],
  'trichogaster-chuna': ['gourami', '#d9ab6d', '#d18d56', 'none'],
  'axelrodia-riesei': ['slender', '#d76166', '#b34456', 'ruby'],
  'microdevario-kubotai': ['slender', '#a7ce82', '#7eb577', 'stripe'],
  'danio-choprae': ['danio', '#b9b996', '#e38257', 'redline'],
  'xiphophorus-maculatus': ['livebearer', '#dfad77', '#ce775b', 'spots'],
  'dermogenys-pusilla': ['halfbeak', '#b9b8a1', '#6d7473', 'stripe'],
  'corydoras-pygmaeus': ['cory', '#d2c9b4', '#5f6662', 'stripe'],
  'corydoras-sterbai': ['cory', '#b2a88f', '#e1c596', 'pepper'],
  'corydoras-julii': ['cory', '#d5c5a5', '#555b54', 'pepper'],
  'kryptopterus-vitreolus': ['glasscat', '#b6ced1', '#72939d', 'none'],
  'corydoras-panda': ['cory', '#d5c8ac', '#4f5151', 'panda'],
  'celestichthys-erythromicron': ['danio', '#c29b76', '#65918d', 'bars'],
  'trichogaster-lalius': ['gourami', '#df8069', '#68a8ae', 'bars'],
  'tanichthys-albonubes': ['slender', '#b7b8a7', '#e48162', 'stripe'],
  'symphysodon-aequifasciatus': ['discus', '#c5a985', '#7e9daa', 'bars'],
  'crossocheilus-reticulatus': ['algae', '#b8b9a7', '#6b7169', 'net'],
  'crossocheilus-oblongus': ['algae', '#b7b6a5', '#4c5858', 'stripe'],
  'desmopuntius-pentazona': ['barb', '#d1a478', '#5b4d4b', 'tiger'],
  'sahyadria-denisonii': ['torpedo', '#b4bdb5', '#cd6763', 'redline'],
  'mikrogeophagus-ramirezi': ['cichlid', '#d7b77d', '#6295a7', 'spots'],
  'apistogramma-cacatuoides': ['cichlid', '#c3aa89', '#de8c60', 'stripe'],
  'notropis-chrosomus': ['danio', '#9fabb4', '#dd8b7c', 'redline'],
  'melanotaenia-boesemani': ['rainbow', '#a3b7bf', '#e4a061', 'split'],
  'melanotaenia-praecox': ['rainbow', '#75a9c5', '#cb6f6e', 'none'],
  'pseudomugil-paskai': ['rainbow', '#a0adb7', '#d8a177', 'spots'],
  'iriatherina-werneri': ['threadfin', '#bab39d', '#d3936b', 'stripe'],
  'pseudomugil-gertrudae': ['rainbow', '#a9b9a6', '#8e9fbc', 'spots'],
  'pseudomugil-furcatus': ['rainbow', '#c5c39a', '#e0ad62', 'stripe'],
  'epiplatys-annulatus': ['killifish', '#d6c9a7', '#4c5054', 'bands'],
  'stiphodon-ornatus': ['goby', '#a3a492', '#668e9c', 'spots'],
  'carinotetraodon-travancoricus': ['puffer', '#d2bd76', '#67654e', 'spots'],
  'pseudotropheus-demasoni': ['cichlid', '#6a88b1', '#303f5b', 'bars'],
  'labidochromis-caeruleus': ['cichlid', '#e6cb72', '#776944', 'dorsal'],
  'glossolepis-incisus': ['rainbow', '#d87e68', '#bc5d59', 'none'],
  'arnoldichthys-spilopterus': ['tetra', '#b5bbac', '#d88970', 'redEye'],
  'dichotomyctere-ocellatus': ['puffer', '#b3ad7c', '#4e5649', 'figure8'],
  'brachydanio-tinwini': ['danio', '#c5b88f', '#7a6a4d', 'rings'],
  'poropanchax-myersi': ['ricefish', '#bbc4bb', '#8da5ba', 'lampeye'],
  'sundadanio-rubellus': ['slender', '#bb8884', '#d75f60', 'neon'],
  'danio-rerio': ['danio', '#d9c794', '#6b7791', 'stripes'],
  'loricaria-simillima': ['whiptail', '#aa9d80', '#5e6256', 'mosaic'],
  'corydoras-aeneus': ['cory', '#bba984', '#7a795e', 'saddle'],
  'trichogaster-labiosa': ['gourami', '#caa785', '#9d7270', 'bars'],
  'corydoras-metae': ['cory', '#d7c5a1', '#4c4f4e', 'panda'],
  'boraras-naevus': ['slender', '#d89d83', '#8a4f50', 'tailspot'],
  'pseudotropheus-socolofi': ['cichlid', '#7998bc', '#526f96', 'dorsal'],
  'botia-lohachata': ['loach', '#c8b78e', '#575953', 'chain'],
  'betta-imbellis': ['betta', '#758c92', '#b36574', 'stripe'],
  'stiphodon-annieae': ['goby', '#8ea19a', '#6c98b2', 'neon'],
  'dario-dario': ['cichlid', '#e2a477', '#b95550', 'bars'],
  'pseudomugil-signifer': ['rainbow', '#aab9b5', '#d5b474', 'stripe'],
  'brachygobius-doriae': ['goby', '#e4c579', '#535548', 'tiger'],
  'thayeria-boehlkei': ['tetra', '#b7c0b6', '#49565b', 'penguin'],
  'rineloricaria-lanceolata': ['whiptail', '#bb806d', '#7f554d', 'mosaic'],
  'trichopodus-leerii': ['gourami', '#b8b2a2', '#a07891', 'pearl'],
  'apistogramma-agassizii': ['cichlid', '#9cb1ad', '#dc9c64', 'stripe'],
  'boraras-urophthalmoides': ['slender', '#d3a777', '#7a5850', 'stripe'],
  'yaoshania-pachychilus': ['hillstream', '#c4b994', '#515950', 'panda'],
  'sphaerichthys-vaillanti': ['gourami', '#9c8f88', '#bd7b8b', 'bars'],
  'nannostomus-marginatus': ['pencil', '#c8b38d', '#755a54', 'stripes'],
  'boraras-merah': ['slender', '#da8b73', '#7d4c4d', 'stripe'],
  'poecilia-sphenops': ['livebearer', '#4d565b', '#777b78', 'none'],
  'xiphophorus-helleri': ['swordtail', '#d8986a', '#b96057', 'stripe'],
  'sundadanio-axelrodi': ['slender', '#8eafc2', '#6ba7bd', 'neon'],
  'chromobotia-macracanthus': ['loach', '#e2a562', '#4b4a48', 'clown'],
  'pseudacanthicus-sp-l097': ['pleco', '#706c61', '#dcc69c', 'spots'],
  'maylandia-estherae': ['cichlid', '#dc8670', '#a8625e', 'none'],
}

const rounded = 'M58 90C91 47 158 37 224 57C265 69 290 82 300 90C282 109 253 131 211 139C142 153 87 127 58 90Z'
const narrow = 'M55 90C112 67 193 65 248 76C274 81 292 86 300 90C282 98 259 107 227 111C161 121 95 109 55 90Z'
const deep = 'M61 90C92 30 158 25 225 53C264 69 290 81 300 90C283 111 254 143 202 151C138 161 83 129 61 90Z'
const low = 'M59 95C95 61 191 55 258 72C282 79 295 87 300 95C279 106 249 121 202 126C139 133 88 115 59 95Z'
const profiles = {
  slender: [narrow, 180, 'M83 77Q110 48 158 61L148 76Z', 'M85 101Q118 125 157 111L142 105Z'],
  tetra: [rounded, 180, 'M94 59Q124 27 168 39L155 58Z', 'M96 119Q125 143 161 131L153 117Z'],
  deep: [deep, 180, 'M96 55Q116 12 158 24L166 52Z', 'M91 122Q128 164 169 144L161 119Z'],
  rasbora: [rounded, 180, 'M96 58Q128 27 169 40L157 57Z', 'M89 114Q112 137 151 127L143 116Z'],
  barb: [rounded, 180, 'M104 52Q138 24 169 42L159 58Z', 'M90 115Q117 137 157 126L148 117Z'],
  danio: [narrow, 180, 'M93 74Q128 50 165 62L151 76Z', 'M99 106Q124 123 161 112L151 105Z'],
  ricefish: [narrow, 180, 'M116 71Q156 58 191 67L174 77Z', 'M102 107Q132 120 171 110L166 106Z'],
  pencil: [narrow, 180, 'M123 69Q150 58 179 66L170 77Z', 'M115 106Q147 116 177 107L170 105Z'],
  killifish: [narrow, 180, 'M125 68Q159 46 188 66L174 78Z', 'M118 106Q148 129 178 109L169 105Z'],
  torpedo: [narrow, 180, 'M96 76Q136 47 173 65L165 76Z', 'M95 106Q129 123 172 110L162 105Z'],
  algae: [low, 180, 'M109 67Q139 44 172 64L157 73Z', 'M103 112Q123 132 157 121L148 113Z'],
  guppy: [narrow, 180, 'M106 72Q137 50 171 64L153 77Z', 'M102 107Q127 123 164 112L151 106Z'],
  livebearer: [rounded, 180, 'M117 56Q145 30 174 46L158 60Z', 'M98 116Q122 136 161 124L151 115Z'],
  swordtail: [rounded, 180, 'M117 56Q145 30 174 46L158 60Z', 'M98 116Q122 136 161 124L151 115Z'],
  halfbeak: [narrow, 180, 'M120 71Q153 57 184 66L171 77Z', 'M113 107Q141 116 170 108L164 105Z'],
  cichlid: [deep, 180, 'M93 55Q111 18 159 12Q184 27 190 45L174 62Z', 'M95 123Q125 157 179 166L190 139Z'],
  rainbow: [rounded, 180, 'M86 61Q119 21 176 37L169 55Z', 'M115 117Q143 140 185 136L178 117Z'],
  threadfin: [narrow, 180, 'M83 76Q111 19 124 29L132 74ZM146 73Q166 22 174 40L179 76Z', 'M112 104Q134 158 148 160L151 108Z'],
  gourami: [deep, 200, 'M100 51Q128 11 181 26L185 52Z', 'M95 124Q134 171 204 177L195 133Z'],
  betta: [narrow, 220, 'M86 72Q101 7 161 24L169 76Z', 'M76 104Q92 196 158 202L169 106Z'],
  goldfish: [deep, 180, 'M105 52Q130 14 164 28L176 55Z', 'M97 123Q129 156 167 151L177 126Z'],
  discus: ['M70 90C82 13 143 -23 210 3C267 30 284 71 284 91C282 167 232 213 172 214C112 213 78 168 70 90Z', 280, 'M105 22Q150 -24 218 6L219 27Z', 'M110 158Q153 215 223 210L218 174Z'],
  pleco: [low, 180, 'M72 83Q106 43 156 51L173 70Z', 'M88 111Q108 148 155 131L157 119Z'],
  whiptail: [narrow, 180, 'M76 80Q116 57 158 69L164 76Z', 'M80 105Q106 126 154 112L160 106Z'],
  cory: [low, 180, 'M114 72L142 34L164 68Z', 'M113 111Q145 139 174 123L173 113Z'],
  glasscat: [narrow, 180, 'M119 75L144 47L155 75Z', 'M107 107Q137 135 177 111L174 105Z'],
  loach: [narrow, 180, 'M113 74Q143 51 173 67L168 76Z', 'M100 106Q127 121 160 109L156 105Z'],
  hillstream: ['M59 90C100 62 186 49 254 71C280 79 295 87 300 90C280 101 253 123 201 132C140 143 91 115 59 90Z', 180, 'M91 76Q129 25 169 56L175 69Z', 'M84 108Q124 158 171 125L178 116Z'],
  goby: [low, 180, 'M117 72Q129 43 154 52L163 73Z', 'M97 113Q115 133 155 125L158 116Z'],
  puffer: ['M76 90C96 37 161 21 224 49C264 68 290 82 300 90C289 111 258 149 196 153C124 158 86 124 76 90Z', 180, 'M141 40Q157 20 178 40L167 55Z', 'M137 142Q163 163 184 148L173 137Z'],
}

function marks(kind, colour) {
  const vertical = (xs, width = 12) => xs.map(x => `<path d="M${x} 18v160" stroke="${colour}" stroke-width="${width}" opacity=".75"/>`).join('')
  const spots = (xs, radius = 5) => xs.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${radius + i % 3}" fill="${colour}" opacity=".72"/>`).join('')
  const dots = [[102, 71], [128, 62], [155, 78], [180, 56], [206, 76], [120, 99], [149, 116], [183, 105], [222, 100], [234, 72]]
  switch (kind) {
    case 'stripe': return `<path d="M62 89Q156 80 297 90" fill="none" stroke="${colour}" stroke-width="8" opacity=".83"/>`
    case 'stripes': return `<path d="M61 76Q165 68 297 82M61 87Q166 80 299 91M62 99Q172 93 290 101" fill="none" stroke="${colour}" stroke-width="5" opacity=".78"/>`
    case 'neon': return `<path d="M64 78Q172 62 296 83" fill="none" stroke="#79d7df" stroke-width="8" opacity=".95"/><path d="M94 96Q192 99 278 94" fill="none" stroke="${colour}" stroke-width="11" opacity=".88"/>`
    case 'nose': return `<path d="M230 62Q272 66 299 90Q279 109 230 117Q247 88 230 62Z" fill="${colour}" opacity=".92"/><path d="M63 87Q161 82 238 91" fill="none" stroke="#e9ece3" stroke-width="5" opacity=".8"/>`
    case 'black': return `<path d="M66 76Q167 65 294 79" fill="none" stroke="#f3edda" stroke-width="8"/><path d="M65 86Q160 76 294 90" fill="none" stroke="#35464b" stroke-width="12"/>`
    case 'phantom': return `<ellipse cx="149" cy="74" rx="20" ry="14" fill="#414752" opacity=".83"/><path d="M103 63Q139 48 176 64" fill="none" stroke="${colour}" stroke-width="8" opacity=".62"/>`
    case 'flame': return `<path d="M143 47Q251 44 300 90Q277 127 190 145L157 121Q196 93 143 47Z" fill="${colour}" opacity=".78"/>`
    case 'emperor': return `<path d="M64 86Q160 75 293 86" fill="none" stroke="#344a61" stroke-width="11" opacity=".9"/><path d="M66 77Q167 64 292 80" fill="none" stroke="${colour}" stroke-width="5" opacity=".9"/>`
    case 'redline': return `<path d="M61 79Q166 70 297 83" fill="none" stroke="${colour}" stroke-width="8"/><path d="M63 94Q169 88 293 96" fill="none" stroke="#536668" stroke-width="5" opacity=".75"/>`
    case 'wedge': return `<path d="M104 82L223 68L214 127Z" fill="${colour}" opacity=".88"/>`
    case 'penguin': return `<path d="M63 84Q135 75 219 86L299 146Q240 118 219 100Q123 101 63 90Z" fill="${colour}" opacity=".9"/>`
    case 'bars': return vertical([104, 143, 184, 227], 13)
    case 'tiger': return vertical([91, 137, 186, 237], 19)
    case 'bands': return vertical([85, 112, 143, 174, 206, 239, 267], 15)
    case 'clown': return vertical([99, 184, 259], 26)
    case 'spots': return spots(dots, 5)
    case 'pepper': return spots([...dots, [87, 95], [168, 89], [199, 120], [250, 65]], 3)
    case 'pearl': return spots([...dots, [91, 97], [164, 90], [247, 105]], 2)
    case 'mosaic': return spots(dots, 4) + `<path d="M67 78Q155 67 254 75" fill="none" stroke="${colour}" stroke-width="3" opacity=".6"/>`
    case 'net': return `<path d="M76 55L222 132M95 45L251 119M122 43L275 104M92 130L245 48M124 138L265 62" stroke="${colour}" stroke-width="2.5" opacity=".5"/>`
    case 'maze': return `<path d="M90 48l18 25 21-20 20 31 19-37 22 32 17-25 16 30 17-14M81 104l19 23 20-34 18 23 20-27 18 35 21-24 24 25 20-30" fill="none" stroke="${colour}" stroke-width="8" stroke-linejoin="round" opacity=".85"/>`
    case 'chain': return `<path d="M79 81q17-18 32 0t32 0t32 0t32 0t32 0t32 0M78 101q16 19 32 0t32 0t32 0t32 0t32 0t32 0" fill="none" stroke="${colour}" stroke-width="7" opacity=".72"/>`
    case 'panda': return `<ellipse cx="255" cy="78" rx="21" ry="22" fill="${colour}" opacity=".75"/><path d="M92 66q18-15 36 2l9 48q-25 20-39-4Z" fill="${colour}" opacity=".75"/><ellipse cx="132" cy="112" rx="21" ry="12" fill="${colour}" opacity=".66"/>`
    case 'tailspot': return `<ellipse cx="103" cy="89" rx="17" ry="15" fill="${colour}" opacity=".83"/>`
    case 'saddle': return `<path d="M97 57q38-20 65 6l-10 35q-35-17-55-41Z" fill="${colour}" opacity=".58"/>`
    case 'twospot': return spots([[123, 88], [245, 88]], 11)
    case 'split': return `<path d="M144 38Q238 35 300 89Q278 123 208 140L149 127Z" fill="${colour}" opacity=".8"/>`
    case 'ruby': return `<path d="M64 81Q153 72 280 84" fill="none" stroke="#f5bbb1" stroke-width="5" opacity=".65"/>`
    case 'figure8': return `<circle cx="148" cy="88" r="24" fill="none" stroke="${colour}" stroke-width="10" opacity=".85"/><circle cx="202" cy="92" r="21" fill="none" stroke="${colour}" stroke-width="10" opacity=".85"/>`
    case 'rings': return dots.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${5 + i % 3}" fill="none" stroke="${colour}" stroke-width="3" opacity=".75"/>`).join('')
    case 'dorsal': return `<path d="M83 47Q148 22 231 59" fill="none" stroke="${colour}" stroke-width="11" opacity=".8"/>`
    default: return ''
  }
}

const hash = value => [...value].reduce((number, letter) => (Math.imul(number, 33) + letter.charCodeAt(0)) >>> 0, 17)
const unit = (seed, shift) => ((seed >>> shift) & 255) / 255
const xml = value => String(value).replace(/[&<>"']/g, letter => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[letter])
const bottomDwellers = new Set(['cory', 'pleco', 'whiptail', 'loach', 'hillstream', 'goby', 'algae'])

const specialMorphology = {
  'ancistrus-cirrhosus': { mouth: 'sucker', detail: 'bristles', tail: 'rounded', depth: 1.12 },
  'macrotocinclus-affinis': { mouth: 'sucker', depth: .78, tail: 'fork' },
  'beaufortia-kweichowensis': { detail: 'hillstream', tail: 'short', depth: .76 },
  'yaoshania-pachychilus': { detail: 'hillstream', tail: 'short', depth: .83 },
  'kryptopterus-vitreolus': { detail: 'glass', tail: 'fork', depth: .82 },
  'iriatherina-werneri': { detail: 'threadfin', tail: 'lyre', depth: .74 },
  'poecilia-reticulata': { detail: 'fan', tail: 'fan', depth: .88 },
  'poecilia-wingei': { detail: 'fan', tail: 'fan', depth: .78 },
  'carassius-auratus': { detail: 'double-tail', tail: 'fan', depth: 1.19 },
  'dermogenys-pusilla': { mouth: 'halfbeak', tail: 'short', depth: .7 },
  'loricaria-simillima': { detail: 'whip', mouth: 'sucker', tail: 'pointed', depth: .68 },
  'rineloricaria-lanceolata': { detail: 'whip', mouth: 'sucker', tail: 'pointed', depth: .72 },
  'pangio-kuhlii': { detail: 'eel', tail: 'short', depth: .64 },
  'symphysodon-aequifasciatus': { detail: 'discus', tail: 'rounded', depth: 1.08 },
  'epiplatys-annulatus': { detail: 'killifish', tail: 'lyre', depth: .75 },
  'betta-imbellis': { detail: 'short-betta', tail: 'rounded', depth: .86 },
  'carinotetraodon-travancoricus': { detail: 'puffer', tail: 'short', depth: 1.1 },
  'dichotomyctere-ocellatus': { detail: 'puffer', tail: 'short', depth: 1.08 },
  'nannostomus-marginatus': { detail: 'pencil', tail: 'fork', depth: .68 },
  'thayeria-boehlkei': { detail: 'penguin', tail: 'fork', depth: .9 },
  'sahyadria-denisonii': { detail: 'torpedo', tail: 'fork', depth: .8 },
  'melanotaenia-boesemani': { detail: 'rainbow', tail: 'fork', depth: 1.17 },
  'glossolepis-incisus': { detail: 'rainbow', tail: 'fork', depth: 1.18 },
  'corydoras-pygmaeus': { detail: 'small-cory', depth: .76 },
  'corydoras-hastatus': { detail: 'small-cory', depth: .71 },
  'cardinal-tetra': { detail: 'neon', tail: 'fork', depth: .82 },
  'green-neon-tetra': { detail: 'neon', tail: 'fork', depth: .7 },
  'rummy-nose-tetra': { detail: 'rummy', tail: 'fork', depth: .79 },
  'ember-tetra': { detail: 'ember', tail: 'short', depth: .83 },
  'red-phantom-tetra': { detail: 'phantom', tail: 'fork', depth: 1.04 },
  'rosy-tetra': { detail: 'rosy', tail: 'fork', depth: 1.02 },
  'diamond-head-neon-tetra': { detail: 'diamond', tail: 'fork', depth: .8 },
  'neon-tetra': { detail: 'neon', tail: 'fork', depth: .77 },
  'black-neon-tetra': { detail: 'black-neon', tail: 'fork', depth: .85 },
  'blue-emperor-tetra': { detail: 'emperor', tail: 'fork', depth: .84 },
  'gold-neon-tetra': { detail: 'gold-neon', tail: 'fork', depth: .79 },
  'flame-tetra': { detail: 'flame', tail: 'fork', depth: 1.01 },
  'golden-tetra': { detail: 'golden', tail: 'fork', depth: .91 },
  'emperor-tetra': { detail: 'emperor', tail: 'lyre', depth: .92 },
  'serpae-tetra': { detail: 'serpae', tail: 'fork', depth: 1.09 },
}

function lookFor(fish) {
  const look = fishLooks[fish.id] || fish.visual
  if (!look) throw new Error(`Missing fish model for ${fish.id}`)
  if (!profiles[look[0]]) throw new Error(`Unknown fish silhouette ${look[0]} for ${fish.id}`)
  return look
}

export function fishMorphology(fish) {
  const [shape] = lookFor(fish)
  const seed = hash(fish.id)
  const defaultTail = ['guppy', 'betta', 'goldfish'].includes(shape) ? 'fan'
    : shape === 'whiptail' ? 'pointed' : shape === 'puffer' || shape === 'goby' ? 'short' : 'fork'
  const suggestedDepth = .85 + unit(seed, 0) * .31
  const special = specialMorphology[fish.id] || {}
  return {
    shape, seed,
    depth: special.depth || suggestedDepth,
    finReach: .83 + unit(seed, 8) * .33,
    forkDepth: 36 + Math.round(unit(seed, 16) * 31),
    tail: special.tail || defaultTail,
    mouth: special.mouth || (bottomDwellers.has(shape) ? 'downturned' : 'terminal'),
    detail: special.detail || shape,
    eyeRadius: shape === 'puffer' ? 8.5 : 5.3 + unit(seed, 24) * 2.3,
  }
}

function tailPath(morph) {
  const { tail, forkDepth } = morph
  if (tail === 'fan') return `M69 90C46 61 24 29 0 12Q17 56 20 90Q12 124 0 168C25 151 48 118 69 90Z`
  if (tail === 'lyre') return 'M69 90C43 58 20 19 0 5Q19 67 22 91Q19 114 0 174C24 153 46 122 69 90Z'
  if (tail === 'pointed') return 'M72 90Q32 83 0 90Q34 99 72 90Z'
  if (tail === 'short') return 'M74 90Q44 72 0 66Q23 88 0 114Q44 107 74 90Z'
  return `M69 90C45 69 21 ${forkDepth} 0 ${forkDepth - 7}Q18 72 20 90Q17 110 0 ${187 - forkDepth}C27 ${164 - forkDepth / 3} 49 112 69 90Z`
}

function familyFeatures(fish, morph, accent, marking) {
  const { shape, detail, mouth } = morph
  let features = ''
  if (shape === 'tetra' || shape === 'slender' || shape === 'rasbora') features += `<path d="M190 51l9-8 10 10Z" fill="${accent}" opacity=".55"/>`
  if (shape === 'rainbow') features += `<path d="M166 46Q191 15 218 40L219 59Z" fill="${accent}" opacity=".52" stroke="${accent}" stroke-width="1.5"/>`
  if (shape === 'cichlid' || detail === 'discus') features += `<path d="M95 54l6-17 8 17 8-20 8 17 9-20 9 22" fill="none" stroke="${accent}" stroke-width="2.3" opacity=".55"/>`
  if (detail === 'threadfin') features += `<path d="M112 70Q90 11 87 0M153 72Q158 12 173 2M116 111Q107 169 98 178M157 109Q160 166 169 178" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>`
  if (detail === 'hillstream') features += `<path d="M178 109Q146 159 74 165Q92 121 138 104Z" fill="${accent}" opacity=".49" stroke="${accent}" stroke-width="2"/><path d="M194 111Q215 153 253 144L230 103Z" fill="${accent}" opacity=".48"/>`
  if (shape === 'pleco' || shape === 'whiptail') features += `<path d="M82 80l27-20 20 13 25-16 21 14 27-10 22 18" fill="none" stroke="${accent}" opacity=".34" stroke-width="2"/><path d="M100 105l18 12 24-9 27 12 24-8 19 10" fill="none" stroke="${accent}" opacity=".3" stroke-width="2"/>`
  if (detail === 'bristles') features += `<path d="M276 77l8-16M283 76l9-10M285 86l13-4M277 104l13 12" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`
  if (detail === 'glass') features += `<path d="M75 91Q180 83 276 91" fill="none" stroke="#526a70" stroke-width="3" opacity=".54"/>${[112, 136, 161, 186, 211, 236].map(x => `<path d="M${x} 86q-7 13-5 25" fill="none" stroke="#6b8990" stroke-width="1.8" opacity=".45"/>`).join('')}`
  if (detail === 'puffer') features += `${[96, 116, 141, 168, 196, 223].map((x, index) => `<path d="M${x} ${52 - index % 2 * 4}l${index % 2 ? 3 : -3}-7" stroke="${accent}" stroke-width="2" opacity=".52"/>`).join('')}`
  if (detail === 'double-tail') features += `<path d="M67 95Q30 124 0 169Q13 120 18 88Z" fill="${accent}" opacity=".39"/>`
  if (detail === 'fan') features += `<path d="M13 32Q30 83 9 149M25 42Q38 88 23 139M40 57Q45 91 39 121" fill="none" stroke="#fff3" stroke-width="2"/>`
  if (detail === 'whip') features += `<path d="M65 88Q31 83 0 88" fill="none" stroke="${accent}" stroke-width="3"/>`
  if (detail === 'pencil') features += `<path d="M72 103Q157 111 260 104" fill="none" stroke="#f0e5b6" stroke-width="2" opacity=".65"/>`
  if (detail === 'penguin') features += `<path d="M70 101Q167 103 239 115L296 152" fill="none" stroke="${accent}" stroke-width="4" opacity=".7"/>`
  if (detail === 'torpedo') features += `<path d="M70 61Q167 35 257 69" fill="none" stroke="#fff" stroke-width="3" opacity=".4"/>`
  if (detail === 'diamond') features += `<path d="M262 57l5-10 5 10 10 3-10 4-5 10-5-10-10-4Z" fill="#fbf5e2" opacity=".85"/>`
  if (detail === 'emperor') features += `<path d="M70 90Q34 89 0 90" fill="none" stroke="#323a54" stroke-width="3.5" opacity=".85"/>`
  if (detail === 'phantom' || detail === 'serpae') features += `<path d="M112 51Q135 10 158 24L163 54Z" fill="${accent}" opacity=".45" stroke="${accent}" stroke-width="2"/>`
  if (detail === 'rosy') features += `<path d="M106 53Q130 19 163 30L169 55Z" fill="#e9ded6" opacity=".52" stroke="${accent}" stroke-width="2"/>`
  if (shape === 'gourami') features += `<path d="M162 119Q157 160 149 177M176 119Q171 165 164 179" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`
  if (shape === 'swordtail') features += `<path d="M64 104Q33 141 0 176Q14 134 37 100Z" fill="${accent}" opacity=".84"/>`
  if (shape === 'goby') features += `<path d="M150 117Q121 149 91 138L113 108Z" fill="${accent}" opacity=".48"/>`
  if (shape === 'cory') features += `<path d="M104 101l29 13 30-11 27 15" fill="none" stroke="#f5e5c0" stroke-width="2.4" opacity=".7"/>`
  if (mouth === 'sucker') features += '<ellipse cx="292" cy="105" rx="7" ry="4" fill="none" stroke="#4f5752" stroke-width="1.8"/>'
  else if (mouth === 'halfbeak') features += '<path d="M279 91L300 84L287 98Z" fill="#91877a" stroke="#596160" stroke-width="1.3"/>'
  else if (mouth === 'downturned') features += '<path d="M286 99q9 6 14 4" fill="none" stroke="#514e4b" stroke-width="1.7" stroke-linecap="round"/>'
  else features += '<path d="M284 94q9 4 16 1" fill="none" stroke="#514e4b" stroke-width="1.5" stroke-linecap="round"/>'
  if (['cory', 'pleco', 'whiptail', 'loach', 'algae', 'glasscat'].includes(shape)) features += '<path d="M286 104q8 11 14 12M282 104q8 18 13 25" fill="none" stroke="#776e60" stroke-width="1.4" stroke-linecap="round"/>'
  if (marking === 'nose') features += `<path d="M19 61l18 16-17 14 16 16-18 16M5 52l18 16-14 15 17 14-16 19" fill="none" stroke="#485058" stroke-width="8" opacity=".85"/>`
  return features
}

export function fishModel(fish) {
  const [shape, body, accent, marking] = lookFor(fish)
  const morph = fishMorphology(fish)
  const [outline, baseHeight, dorsal, anal] = profiles[shape]
  const height = Math.max(baseHeight, morph.detail === 'threadfin' ? 215 : baseHeight)
  const offset = height / 2 - 90
  const bodyTransform = `translate(0 90) scale(1 ${morph.depth.toFixed(3)}) translate(0 -90)`
  const finTransform = `translate(0 90) scale(1 ${morph.finReach.toFixed(3)}) translate(0 -90)`
  const eyeX = shape === 'discus' ? 239 : bottomDwellers.has(shape) ? 268 : 263
  const eyeY = shape === 'discus' ? 102 : 79
  const eyeRing = marking === 'lampeye' ? '#80d9ea' : marking === 'redEye' ? '#d86c6b' : '#eee0bd'
  const bodyOpacity = morph.detail === 'glass' ? '.51' : '1'
  const tail = tailPath(morph)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 ${height}" role="img" aria-label="${xml(fish.name)} model" data-shape="${shape}" data-tail="${morph.tail}" data-depth="${morph.depth.toFixed(3)}">
    <defs><linearGradient id="body" x1="70" y1="35" x2="226" y2="145" gradientUnits="userSpaceOnUse"><stop stop-color="#faf4e3" stop-opacity=".8"/><stop offset=".42" stop-color="${body}"/><stop offset="1" stop-color="${accent}" stop-opacity=".86"/></linearGradient><clipPath id="body-clip"><path d="${outline}" transform="${bodyTransform}"/></clipPath></defs>
    <g transform="translate(0 ${offset})">
      <path d="${tail}" fill="${accent}" fill-opacity=".64" stroke="${accent}" stroke-opacity=".56" stroke-width="2"/>
      <g transform="${finTransform}"><path d="${dorsal}" fill="${accent}" fill-opacity=".66" stroke="${accent}" stroke-opacity=".62" stroke-width="1.8"/><path d="${anal}" fill="${accent}" fill-opacity=".53" stroke="${accent}" stroke-opacity=".55" stroke-width="1.8"/></g>
      <path d="${outline}" transform="${bodyTransform}" fill="url(#body)" fill-opacity="${bodyOpacity}" stroke="${accent}" stroke-opacity=".73" stroke-width="2"/>
      <g clip-path="url(#body-clip)"><g transform="${bodyTransform}">${marks(marking, accent)}<path d="M79 64Q159 40 241 64" fill="none" stroke="#fff" stroke-opacity=".23" stroke-width="3"/>${morph.detail === 'glass' ? '<path d="M71 90Q169 84 272 93" fill="none" stroke="#67848b" stroke-width="3" opacity=".5"/>' : ''}</g></g>
      <path d="M151 105Q126 116 107 128Q145 127 170 109Z" fill="${accent}" fill-opacity=".36" stroke="${accent}" stroke-opacity=".45"/>
      <path d="M${eyeX - 32} ${eyeY - 18}q-11 17-3 39" fill="none" stroke="#445456" stroke-opacity=".39" stroke-width="2"/>
      <circle cx="${eyeX}" cy="${eyeY}" r="${morph.eyeRadius.toFixed(1)}" fill="${eyeRing}"/><circle cx="${eyeX + 1}" cy="${eyeY}" r="${(morph.eyeRadius * .64).toFixed(1)}" fill="#263a3e"/><circle cx="${eyeX + 2}" cy="${eyeY - 2}" r="1.5" fill="#fff"/>
      ${familyFeatures(fish, morph, accent, marking)}
    </g>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function fishModelAspectRatio(fish) {
  const [shape] = lookFor(fish)
  return 300 / Math.max(profiles[shape][1], fishMorphology(fish).detail === 'threadfin' ? 215 : 0)
}
