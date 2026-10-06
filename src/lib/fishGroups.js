import { fishTypeFor } from './fishCatalog.js'

const aqueon = slug => ({ name: 'Aqueon care guide', url: `https://www.aqueon.com/resources/care-guides/${slug}` })
const oata = slug => ({ name: 'OATA care guide', url: `https://ornamentalfish.org/what-we-do/advice-information/care-sheets/caresheets-tropical-freshwater-fish/how-to-look-after-${slug}/` })

// Aquarium groups, rather than taxonomic ranks: some include related families.
export const FISH_GROUPS = [
  {
    id: 'tetras', name: 'Tetras', chinese: '脂鲤 / 灯鱼', type: 'Tetras',
    summary: 'Colorful midwater shoals from the Americas and Africa.',
    characteristics: 'A diverse aquarium group of characiform fishes, including small neon tetras and larger African tetras. Many show vivid colors and feel more secure with their own species.',
    distribution: 'The Americas and Africa, especially South American river systems such as the Amazon. Congo tetras come from Central Africa.',
    morphology: 'Often laterally compressed, with a forked tail and reflective stripes or patches. Many have a small adipose fin between the dorsal fin and tail; body depth and fin shape vary.',
    habits: 'Usually social midwater swimmers that eat small invertebrates and other foods. Most scatter eggs without parental care. Serpae tetras can nip fins; larger species need extra swimming room.',
    sources: [aqueon('tetras')],
  },
  {
    id: 'rasboras', name: 'Rasboras', chinese: '波鱼类', type: 'Rasboras',
    summary: 'Gentle shoaling fish for planted, shaded waters.',
    characteristics: 'Small, generally peaceful fish sold under the rasbora name, including Trigonostigma, Boraras and related aquarium groups. Tiny species need suitably small foods.',
    distribution: 'South and Southeast Asia, including forest streams, shallow wetlands and seasonally flooded habitats. Many live among vegetation in gently moving water.',
    morphology: 'Slim to moderately deep bodies with forked tails. Harlequins have a dark wedge; Boraras often have red bodies with dark spots or stripes. Most lack an adipose fin.',
    habits: 'Social swimmers that take tiny crustaceans, insects and other small foods. Plants and shade provide shelter. Many scatter eggs, while harlequins and lambchops attach eggs beneath leaves.',
    sources: [aqueon('rasboras')],
  },
  {
    id: 'danios-minnows', name: 'Danios & minnows', chinese: '斑马鱼 / 白云金丝类', type: 'Danios & minnows',
    summary: 'Striped and spotted shoalers with very different activity levels.',
    characteristics: 'Danios and the minnows in this library are small social fishes. Zebra danios are energetic, while celestial pearl danios are more reserved and benefit from dense cover.',
    distribution: 'Danios occur in South and Southeast Asia; white clouds come from East Asia. The rainbow shiner in this group is native to the southeastern United States.',
    morphology: 'Usually slender fish with forked tails and horizontal stripes, spots or metallic colors. Celestial pearl danios have pearl-like spots and patterned red-and-black fins.',
    habits: 'Many swim actively in the upper and middle layers and scatter eggs without guarding them. Provide a group, cover and room to swim. Flow and temperature preferences differ by species.',
    sources: [aqueon('danio'), oata('danios-and-white-cloud-mountain-minnows')],
  },
  {
    id: 'bettas', name: 'Bettas', chinese: '斗鱼类', type: 'Betta fish',
    summary: 'Surface-breathing fish with striking displays and individual territories.',
    characteristics: 'Members of Betta have a labyrinth organ for breathing atmospheric air. This library includes domestic B. splendens and the shorter-finned B. imbellis.',
    distribution: 'South and Southeast Asia, often in warm, shallow, vegetated pools, wetlands and slow streams. Domestic color and fin varieties are captive bred.',
    morphology: 'A laterally compressed body with an upturned mouth. Domestic males may have broad, flowing fins; wild forms are often shorter-finned with subtler colors.',
    habits: 'Feed mainly on insects and other small animals, and regularly breathe at the surface. Male B. splendens must be housed separately. The species here build bubble nests; other Betta species may mouthbrood.',
    sources: [aqueon('betta')],
  },
  {
    id: 'barbs', name: 'Barbs', chinese: '鲃鱼类', type: 'Barbs',
    summary: 'Active shoalers with bold markings and lively social behavior.',
    characteristics: 'A varied group of carp relatives. Cherry barbs are relatively gentle; tiger barbs can be persistent fin nippers. Adult sizes differ substantially.',
    distribution: 'The species in this library are native to Asia, including Sri Lanka, India and Southeast Asia. Habitats range from streams to vegetated still waters.',
    morphology: 'Bodies range from deep and diamond-shaped to streamlined. Stripes, bars and red accents are common; some species have small barbels near the mouth.',
    habits: 'Usually shoaling omnivores that explore the middle water layers. Keep an appropriate group and open swimming space. Most scatter eggs and provide no parental care.',
    sources: [oata('barbs')],
  },
  {
    id: 'livebearers', name: 'Guppies & livebearers', chinese: '孔雀鱼 / 胎生鱼类', type: 'Guppies & livebearers',
    summary: 'Live-bearing fish, from colorful guppies to surface-dwelling halfbeaks.',
    characteristics: 'Grouped by reproduction rather than a single family. Guppies, mollies, platies and swordtails are poeciliids; wrestling halfbeaks belong to a different family.',
    distribution: 'Poeciliids originate in the Americas. Wrestling halfbeaks come from Southeast Asia. Many aquarium color forms are bred in captivity.',
    morphology: 'Guppies often have colorful fan tails; swordtail males have an extended lower tail ray. Male poeciliids have a gonopodium. Halfbeaks have a distinctive elongated lower jaw.',
    habits: 'Give birth to free-swimming young, which adults may eat. Many graze and feed in the upper layers, but halfbeaks favor small animal foods. Sex ratios, water chemistry and aggression vary by species.',
    sources: [oata('guppies-and-mollies'), oata('swordtails-and-platies')],
  },
  {
    id: 'cichlids', name: 'Cichlids', chinese: '慈鲷类', type: 'Cichlids',
    summary: 'Expressive fish known for territories, courtship and parental care.',
    characteristics: 'Members of Cichlidae, ranging from dwarf cichlids to tall angelfish, discus and African lake species. Their water and social needs vary widely.',
    distribution: 'The library includes South American river fishes, West African cave spawners and Lake Malawi cichlids. These habitats have very different water chemistry.',
    morphology: 'Typically a long dorsal fin with a spiny front section and a laterally compressed body. Angelfish are tall and triangular; discus are disc-shaped; many dwarf cichlids are elongated.',
    habits: 'Often defend territories, particularly when breeding. Depending on species, they guard eggs on surfaces or in caves, or carry young in the mouth. Diet and compatibility must be planned at species level.',
    sources: [oata('dwarf-cichlids'), oata('african-malawi-cichlids')],
  },
  {
    id: 'gouramis', name: 'Gouramis', chinese: '丝足鲈 / 攀鲈类', type: 'Gouramis',
    summary: 'Labyrinth fish that explore planted waters and breathe at the surface.',
    characteristics: 'A group of air-breathing fishes that includes gouramis and paradise fish. Temperament ranges from shy chocolate gouramis to more assertive species.',
    distribution: 'South and Southeast Asia, in wetlands, slow streams and vegetated pools. Chocolate and Vaillant gouramis are associated with soft, acidic habitats.',
    morphology: 'Usually laterally compressed with long anal fins. Many have thread-like pelvic fins used to explore their surroundings; colors include spots, stripes and pearl-like patterns.',
    habits: 'Need surface access and sheltered areas. Males may defend breeding territories. Many build bubble nests, while some mouthbrood. Their diet and tolerance of tankmates differ by species.',
    sources: [oata('gouramis-and-paradise-fish')],
  },
  {
    id: 'catfish-plecos', name: 'Catfish & plecos', chinese: '鲶鱼 / 鼠鱼 / 异型鱼类', type: 'Catfish & plecos',
    summary: 'Whiskered fish with diverse diets, armor and swimming styles.',
    characteristics: 'Catfishes include social Corydoras, armored plecos and transparent glass catfish. They are not interchangeable algae cleaners and require their own feeding plan.',
    distribution: 'The Corydoras and plecos here come from South America. Glass catfish occur in Southeast Asia. Habitats include riverbeds, streams and sheltered channels.',
    morphology: 'Most have sensory barbels. Corydoras have bony plates; plecos have armored bodies and a sucker-like mouth. Glass catfish have a transparent body.',
    habits: 'Many forage near the bottom, but glass catfish and some dwarf cories swim in midwater. Corydoras are social; some plecos defend shelters. Provide food suited to each species, not just leftovers.',
    sources: [oata('freshwater-catfish')],
  },
  {
    id: 'loaches', name: 'Loaches', chinese: '鳅鱼类', type: 'Loaches',
    summary: 'Bottom explorers, from secretive kuhli loaches to stream specialists.',
    characteristics: 'Several related bottom-dwelling groups with very different adult sizes and flow requirements. Clown loaches grow much larger than the small fish sold in shops.',
    distribution: 'Mostly Asian rivers and streams. Kuhli loaches favor sheltered habitats; hillstream loaches occur in flowing, well-oxygenated waters.',
    morphology: 'Typically have barbels around a downward-facing mouth. Kuhlis are eel-like; botiid loaches have deeper bodies; hillstream species have flattened bodies and broad paired fins.',
    habits: 'Many live socially and search the substrate for food. Provide smooth substrate and shelters. Hillstream species graze biofilm and need suitable flow; other loaches require different conditions.',
    sources: [oata('loaches'), oata('hillstream-and-weather-loaches')],
  },
  {
    id: 'rainbowfish', name: 'Rainbowfish', chinese: '彩虹鱼 / 蓝眼鱼类', type: 'Rainbowfish',
    summary: 'Iridescent shoalers with colorful fins and elaborate displays.',
    characteristics: 'Includes rainbowfish and related blue-eyes. Many males develop brighter colors and display to rivals or females; adult size varies from tiny blue-eyes to larger rainbowfish.',
    distribution: 'Australia, New Guinea and nearby islands. Species inhabit streams, lakes and wetlands with differing water conditions.',
    morphology: 'Often two dorsal fins and reflective scales. Larger rainbowfish develop deeper bodies; blue-eyes are slender with vivid eyes and sometimes extended fin rays.',
    habits: 'Usually active, social swimmers that benefit from open water and planted margins. Many deposit eggs among plants. Match tank size, group and food size to the species.',
    sources: [oata('rainbowfish')],
  },
  {
    id: 'gobies', name: 'Gobies', chinese: '虾虎鱼类', type: 'Gobies',
    summary: 'Small bottom-oriented fish adapted to very different habitats.',
    characteristics: 'Includes stream-grazing Stiphodon and bumblebee gobies. Feeding and salinity needs differ, so a shared common name does not imply shared aquarium conditions.',
    distribution: 'The library species come from Asian and Indo-Pacific waters. Stiphodon occupy streams; some bumblebee gobies occur in coastal or brackish habitats.',
    morphology: 'Usually have two dorsal fins and pelvic fins joined into a disc that helps them hold position. Stiphodon males can be iridescent; bumblebee gobies have dark and yellow bands.',
    habits: 'Often rest and forage on the bottom, with males defending small areas. Stiphodon graze biofilm and many have a marine larval stage; bumblebee gobies hunt small animals. Check the exact species and salinity.',
    sources: [oata('gobies-and-blennies')],
  },
  {
    id: 'killifish-ricefish', name: 'Killifish & ricefish', chinese: '鳉鱼 / 青鳉类', type: 'Killifish & ricefish',
    summary: 'Small egg-laying fish that often gather near the surface.',
    characteristics: 'A practical aquarium grouping of distinct lineages. The killifish in this library are non-annual species; Japanese ricefish are Oryzias, not true killifish.',
    distribution: 'The lampeyes and clown killifish here are African. Japanese ricefish come from East Asia and have many captive-bred color forms.',
    morphology: 'Generally small, slender fish with upturned mouths. Lampeyes have reflective eyes; clown killifish have vertical bands; ricefish often appear translucent.',
    habits: 'Feed on small foods around the upper layers and lay eggs among vegetation. Ricefish females briefly carry an egg cluster before attaching it to plants. Keep suitable groups and a secure lid.',
    sources: [oata('killifish'), { name: 'Aquarium Co-Op ricefish guide', url: 'https://www.aquariumcoop.com/blogs/aquarium/medaka-rice-fish' }],
  },
  {
    id: 'algae-eaters', name: 'Algae eaters', chinese: '食藻鲤类', type: 'Algae eaters',
    summary: 'Active Crossocheilus grazers with a taste for algae and other foods.',
    characteristics: 'This group contains the Crossocheilus species in the library. Other algae-grazing fish remain in their own groups, such as plecos and gobies.',
    distribution: 'Southeast Asian rivers and streams, often with flowing, oxygen-rich water and surfaces covered in algae or biofilm.',
    morphology: 'Long, streamlined bodies with a downward-facing mouth and small barbels. Dark lateral markings and fin details help distinguish similar-looking species.',
    habits: 'Browse algae and biofilm, but also need appropriate supplementary food. They are active swimmers and may compete as they mature. Their presence does not replace aquarium maintenance.',
    sources: [oata('tropical-algae-eaters')],
  },
  {
    id: 'puffers', name: 'Puffers', chinese: '鲀鱼类', type: 'Puffers',
    summary: 'Curious predators with rounded bodies and powerful beak-like teeth.',
    characteristics: 'Puffers can inflate defensively and have specialized feeding needs. The library includes freshwater dwarf puffers and figure-eight puffers with different water requirements.',
    distribution: 'Puffers occur in tropical waters around the world. Dwarf puffers come from southwestern India; figure-eight puffers are Southeast Asian fishes associated with brackish habitats.',
    morphology: 'Rounded bodies, mobile eyes and fused tooth plates forming a beak. Small fins allow precise hovering; markings range from spots to figure-eight patterns.',
    habits: 'Hunt invertebrates and may bite tankmates or defend territories. Diet, stocking and salinity need a species-specific plan. Never provoke inflation; shell-bearing foods suit some species but are not a universal diet.',
    sources: [aqueon('freshwater-puffer')],
  },
  {
    id: 'pencilfish', name: 'Pencilfish', chinese: '铅笔鱼类',
    summary: 'Slender South American fish that pick tiny foods from sheltered waters.',
    characteristics: 'Nannostomus are small characiform fishes in the pencilfish family, distinct from the tetras in this library. The dwarf pencilfish is a quiet, small-mouthed species.',
    distribution: 'South American river systems, including the Amazon and neighboring drainages. Often found in sheltered, vegetated or leaf-litter habitats.',
    morphology: 'A narrow, pencil-like body and small mouth, usually with horizontal dark stripes. Fin colors and swimming posture vary between species.',
    habits: 'Usually occupy the upper and middle layers and take very small foods. Keep a social group with cover and calm companions. Males may display and establish small territories; eggs receive no parental care.',
    sources: [oata('tetras-and-pencilfish')],
  },
  {
    id: 'badis', name: 'Badis & Dario', chinese: '变色鲈类',
    summary: 'Small, deliberate hunters with vivid colors and local territories.',
    characteristics: 'Members of Badidae, including blue badis and scarlet badis. These micropredators can be shy feeders and should not be treated as ordinary schooling community fish.',
    distribution: 'South Asian freshwater habitats. The species here occur in the Indian subcontinent, in sheltered streams and vegetated waters.',
    morphology: 'Small, laterally compressed bodies with a long dorsal fin. Males often show stronger blue or red colors and vertical bars; females are generally less colorful.',
    habits: 'Pick small live or frozen prey and may refuse dried foods. Males defend small territories; plants and visual barriers help. Badis may guard cave-spawned eggs, while Dario have different breeding behavior.',
    sources: [{ name: 'Seriously Fish: Dario', url: 'https://www.seriouslyfish.com/species/dario-dario' }, { name: 'Seriously Fish: Badis', url: 'https://www.seriouslyfish.com/species/badis-badis/' }],
  },
  {
    id: 'goldfish', name: 'Goldfish', chinese: '金鱼类',
    summary: 'Long-lived carp relatives with many domesticated body and fin forms.',
    characteristics: 'Goldfish are domesticated Carassius auratus, with substantial adult size and waste production. Their care differs from that of small tropical community fish.',
    distribution: 'Derived from East Asian freshwater carp and bred domestically for centuries. Aquarium and pond varieties are now kept worldwide.',
    morphology: 'Forms range from streamlined single-tail fish to deep-bodied fancy varieties with double tails. Colors include gold, red, white, black and mixed patterns.',
    habits: 'Social omnivores that graze and sift through the substrate. They scatter eggs and may eat eggs or fry. Provide spacious, well-filtered housing and match companions to body form and swimming ability.',
    sources: [{ name: 'Green Aqua species profile', url: 'https://greenaqua.hu/en/hal-carassius-auratus-goldfish.html' }],
  },
  {
    id: 'other-fish', name: 'Other fish', chinese: '其他鱼类', type: 'Other fish',
    summary: 'Additional fish awaiting a dedicated aquarium group.',
    characteristics: 'A holding group for entries without a recognized genus. Consult the individual species profile for identifying features.',
    distribution: 'Varies by species; each entry records its known origin.',
    morphology: 'No shared body form defines this group. Use the scientific name and species photographs for identification.',
    habits: 'There is no shared behavior or care requirement. Check the species profile before planning companions or habitat.',
    sources: [],
  },
]

export function fishGroupFor(fish) {
  const genus = fish.scientific?.split(' ')[0]
  const dedicated = { Nannostomus: 'pencilfish', Badis: 'badis', Dario: 'badis', Carassius: 'goldfish' }[genus]
  return FISH_GROUPS.find(group => dedicated ? group.id === dedicated : group.type === fishTypeFor(fish))
}

export function groupFishEntries(entries) {
  return FISH_GROUPS.map(group => ({ ...group, entries: entries.filter(entry => entry.category === 'fish' && fishGroupFor(entry).id === group.id) }))
    .filter(group => group.entries.length)
}

export function filterLearningEntries(entries, { category = 'all', groupId = '', search = '' } = {}) {
  const query = search.trim().toLowerCase()
  return entries.filter(entry => {
    const group = entry.category === 'fish' ? fishGroupFor(entry) : null
    return (category === 'all' || entry.category === category)
      && (!groupId || group?.id === groupId)
      && (!query || [entry.name, entry.scientific, entry.chinese, entry.headline, group?.name, group?.chinese, ...(entry.facts || []).flat(), ...(entry.sections || []).flat(), ...(entry.nutrients || []).flatMap(nutrient => [nutrient.name, nutrient.symbol, nutrient.role, nutrient.deficiency])].join(' ').toLowerCase().includes(query))
  })
}
