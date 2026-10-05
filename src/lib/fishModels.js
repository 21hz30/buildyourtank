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

export function fishModel(fish) {
  const look = fishLooks[fish.id]
  if (!look) throw new Error(`Missing fish model for ${fish.id}`)
  const [shape, body, accent, marking] = look
  const [outline, height, dorsal, anal] = profiles[shape]
  const cy = height / 2
  const offset = cy - 90
  const broadTail = ['guppy', 'betta', 'goldfish'].includes(shape)
  const tail = broadTail
    ? 'M69 90C42 60 23 32 0 20Q12 62 18 90Q9 120 0 160C27 151 48 119 69 90Z'
    : 'M68 90C44 71 22 59 0 48Q16 75 16 90Q16 107 0 132C24 123 47 110 68 90Z'
  const whiskers = ['cory', 'pleco', 'whiptail', 'loach', 'algae', 'glasscat'].includes(shape)
  const eyeX = shape === 'discus' ? 239 : 264
  const eyeY = shape === 'discus' ? 102 : 79
  const eyeRing = marking === 'lampeye' ? '#8ad9e7' : marking === 'redEye' ? '#d86c6b' : '#e9d7ae'
  const details = `
    <path d="M${eyeX - 31} ${eyeY - 20}q-11 18-3 41" fill="none" stroke="#445456" stroke-opacity=".37" stroke-width="2"/>
    <circle cx="${eyeX}" cy="${eyeY}" r="7" fill="${eyeRing}"/><circle cx="${eyeX + 1}" cy="${eyeY}" r="4.5" fill="#263a3e"/><circle cx="${eyeX + 2}" cy="${eyeY - 2}" r="1.5" fill="#fff"/>
    <path d="M285 97l13 2" stroke="#514e4b" stroke-width="1.7" stroke-linecap="round"/>
    ${whiskers ? '<path d="M285 100q12 14 15 18M282 101q9 21 12 31" fill="none" stroke="#776e60" stroke-width="1.4" stroke-linecap="round"/>' : ''}
    ${shape === 'gourami' ? '<path d="M162 118Q156 163 147 185M176 118Q169 164 163 185" fill="none" stroke="'+accent+'" stroke-width="2.5" stroke-linecap="round"/>' : ''}
    ${shape === 'swordtail' ? '<path d="M65 104Q26 151 0 178Q16 133 34 101Z" fill="'+accent+'" opacity=".84"/>' : ''}
    ${shape === 'halfbeak' ? '<path d="M291 88L300 84M291 94l9-2" stroke="#565e5d" stroke-width="2.5"/>' : ''}`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 ${height}" role="img" aria-label="${fish.name} model">
    <defs><linearGradient id="body" x1="70" y1="40" x2="215" y2="150" gradientUnits="userSpaceOnUse"><stop stop-color="#f7f0dc" stop-opacity=".78"/><stop offset=".43" stop-color="${body}"/><stop offset="1" stop-color="${accent}" stop-opacity=".9"/></linearGradient><clipPath id="body-clip"><path d="${outline}"/></clipPath></defs>
    <g transform="translate(0 ${offset})">
      <path d="${tail}" fill="${accent}" fill-opacity=".66" stroke="${accent}" stroke-opacity=".5" stroke-width="2"/>
      <path d="${dorsal}" fill="${accent}" fill-opacity=".66" stroke="${accent}" stroke-opacity=".55" stroke-width="1.8"/>
      <path d="${anal}" fill="${accent}" fill-opacity=".52" stroke="${accent}" stroke-opacity=".5" stroke-width="1.8"/>
      <path d="${outline}" fill="url(#body)" stroke="${accent}" stroke-opacity=".67" stroke-width="2"/>
      <g clip-path="url(#body-clip)">${marks(marking, accent)}<path d="M87 66Q150 39 243 65" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="4"/></g>
      <path d="M153 103Q125 113 112 130Q144 125 171 107Z" fill="${accent}" fill-opacity=".36" stroke="${accent}" stroke-opacity=".4"/>
      ${details}
    </g>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function fishModelAspectRatio(fish) {
  const look = fishLooks[fish.id]
  if (!look) throw new Error(`Missing fish model for ${fish.id}`)
  return 300 / profiles[look[0]][1]
}
