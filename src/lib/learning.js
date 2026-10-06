import { CATALOG, FILTERS, GLASS, SANDS, SIZES } from './tank.js'
import { SUPPLIES } from './workspace.js'
import { tetraProfiles } from './tetraCatalog.js'
import { additionalFishProfiles } from './fishCatalog.js'
import { plantProfiles as greenAquaPlantProfiles } from './plantCatalog.js'

export const ENCYCLOPEDIA_CATEGORIES = [
  { id: 'all', name: 'All entries', icon: 'book' },
  { id: 'fish', name: 'Fish', icon: 'fish' },
  { id: 'plants', name: 'Plants', icon: 'leaf' },
  { id: 'substrate', name: 'Substrates', icon: 'leaf' },
  { id: 'equipment', name: 'Tanks & equipment', icon: 'sliders' },
  { id: 'supplies', name: 'Care supplies', icon: 'bag' },
]

const fishProfiles = {
  ...tetraProfiles,
  ...additionalFishProfiles,
  tetra: {
    chinese: '刚果灯鱼',
    headline: 'A shimmering African schooler that needs company and generous swimming room',
    sourceUrl: 'https://greenaqua.hu/en/hal-lazac-kongolazac-phenacogrammus-interruptus.html',
    facts: [
      ['Native habitat', 'Congo River basin, Central Africa'],
      ['Typical adult length', '6–9 cm'],
      ['Expected lifespan', 'About 5 years'],
      ['Minimum aquarium', '200 litres'],
      ['Recommended group', '7–8 fish'],
      ['Temperature', '22–27 °C'],
      ['pH', '6.0–7.2'],
      ['Water hardness', '4–18 dGH'],
      ['Diet', 'Omnivore'],
      ['Swimming level', 'Active midwater swimmer'],
    ],
    sections: [
      ['Meet the Congo tetra', 'Phenacogrammus interruptus is an eye-catching freshwater fish from Africa’s Congo River basin Its large scales reflect blue, green, gold and violet as the fish moves Mature males are especially colorful and develop longer, flowing fins, while females are generally smaller and more restrained in color'],
      ['Keep a proper school', 'Congo tetras are active, social fish that feel most secure in a group Plan for 7–8 fish rather than a single specimen A settled school displays more natural movement and color, while an isolated fish may become stressed or withdrawn'],
      ['Build its habitat', 'Use an aquarium of at least 200 litres with a long, open area for swimming Add dense planting around the back and sides so the fish can retreat when needed A dark substrate, roots and live plants help recreate a comfortable setting and make their iridescent colors stand out'],
      ['Choose its neighbors', 'These peaceful tetras suit a well-planned community aquarium with similarly calm fish that share their water requirements Avoid aggressive species and persistent fin nippers, which may damage the males’ extended fins Give the entire school enough room instead of judging compatibility by body size alone'],
      ['Feeding & daily care', 'Congo tetras are omnivores Offer a varied diet of appropriately sized flakes or granules, supplemented with suitable frozen or live foods Feed controlled portions, make sure every member of the school eats, and maintain stable, clean water rather than making sudden parameter changes'],
      ['Breeding', 'The species is considered relatively easy to breed when given the right environment Condition healthy adults with varied foods and provide a separate, carefully managed breeding setup so eggs and fry are not eaten by the community'],
    ],
  },
  angelfish: {
    chinese: '神仙鱼',
    headline: 'A graceful, tall-bodied cichlid for a spacious and carefully maintained aquarium',
    sourceUrl: 'https://greenaqua.hu/en/fish-pterophyllum-scalare-angelfish.html',
    facts: [
      ['Native habitat', 'Slow, planted waters of the Amazon region'],
      ['Typical adult length', '10–15 cm'],
      ['Expected lifespan', '8–10 years'],
      ['Minimum aquarium', '150 litres; 150–200 L recommended'],
      ['Recommended group', '4–6 fish'],
      ['Temperature', '24–30 °C'],
      ['pH', '6.0–7.5'],
      ['Water hardness', '3–13 dGH'],
      ['Diet', 'Omnivore'],
      ['Behavior', 'Peaceful; territorial when spawning'],
    ],
    sections: [
      ['Meet the angelfish', 'Pterophyllum scalare has a distinctive triangular silhouette, a laterally compressed body and long dorsal, anal and pelvic fins Its height and elegant movement make it a natural centerpiece, but the small fish sold in shops need considerably more vertical and horizontal room as they mature'],
      ['Build its habitat', 'Use a tall aquarium of at least 150 litres, with dense planting and roots around the edges plus open areas for swimming Angelfish come from slow-flowing South American waters, so provide steady rather than turbulent circulation and enough depth for their extended fins'],
      ['Keep a social group', 'Angelfish are social and are commonly kept in a small group of 4–6 while young Adults may form pairs and defend a territory during spawning The layout should offer visual breaks and enough space for fish to move away from conflict'],
      ['Choose its neighbors', 'Avoid aggressive fin nippers and remember that very small fish may eventually be treated as prey Choose calm companions that tolerate the same warm, soft-to-moderately-hard water, and do not rely on a fish’s current juvenile size when planning the community'],
      ['Feeding & water care', 'Offer a varied omnivorous diet of quality prepared, frozen and suitable live foods Angelfish are sensitive to sudden parameter changes and nitrate accumulation, so use efficient filtration, regular partial water changes and consistent maintenance'],
      ['Breeding', 'A compatible pair may clean a broad leaf or smooth surface before laying eggs Both parents can guard the clutch and fry, and their territorial behavior often becomes much stronger during this period'],
    ],
  },
  betta: {
    chinese: '暹罗斗鱼',
    headline: 'A spectacular surface-breathing fish that needs warm water, gentle flow and a calm home',
    sourceUrl: 'https://greenaqua.hu/en/hal-sziami-harcoshal-betta-splendens-szuperdelta.html',
    facts: [
      ['Native habitat', 'Still and slow waters of Thailand and Cambodia'],
      ['Typical adult length', '6–7 cm'],
      ['Expected lifespan', 'About 2 years'],
      ['Minimum aquarium', 'At least 40 litres for one fish'],
      ['Social life', 'Males are territorial; keep separately'],
      ['Temperature', '25–28 °C'],
      ['pH', '6.8–7.5'],
      ['Water hardness', '5–20 dGH'],
      ['Diet', 'Carnivore; protein-rich foods'],
      ['Breeding', 'Bubble-nest builder'],
    ],
    sections: [
      ['Meet the betta', 'This entry follows the Super Delta form of Betta splendens, whose broad caudal fin opens to roughly 120–160 degrees Domestic bettas occur in many colors and fin shapes, but all share the labyrinth organ that lets them take atmospheric air from the surface'],
      ['Build its habitat', 'Provide at least 40 litres for one fish, warm stable water, gentle filtration and dense planting with roots and shaded hiding places Keep part of the surface open for breathing, use a secure lid because bettas can jump, and avoid sharp decor that could damage long fins'],
      ['Understand its territory', 'Male bettas are strongly territorial and should not be housed together Community keeping depends on the individual fish, tank size and companions; avoid fin nippers, overly lively fish and other animals that may be attacked or mistaken for rivals'],
      ['Feeding & daily care', 'Use high-quality betta food rich in animal protein, supplemented with suitable frozen or live foods Feed modest portions, watch the fish eat and maintain clean water The labyrinth organ does not make an unfiltered or very small container appropriate'],
      ['Surface access', 'A betta regularly rises to breathe, so floating plants should not seal the entire surface Keep a warm layer of air beneath the lid and avoid strong currents that force a long-finned fish to struggle continuously'],
      ['Breeding', 'The male builds and guards a bubble nest, tending the eggs after spawning Breeding requires a separate plan for introducing and removing adults safely and for raising very small fry'],
    ],
  },
  danio: {
    chinese: '银河斑马鱼',
    headline: 'A tiny spotted schooler that glows among dense planting',
    sourceUrl: 'https://greenaqua.hu/en/galaxy-danio.html',
    facts: [
      ['Native habitat', 'Small waters near Hopong, Myanmar'],
      ['Typical adult length', '2–3 cm'],
      ['Expected lifespan', 'About 3 years'],
      ['Minimum aquarium', '30 litres'],
      ['Recommended group', 'At least 6; 10–12 offers a fuller school'],
      ['Temperature', '24–26 °C'],
      ['pH', '5.7–7.5'],
      ['Water hardness', '2–10 dGH'],
      ['Diet', 'Omnivore; very small foods'],
      ['Breeding', 'Relatively easy'],
    ],
    sections: [
      ['Meet the celestial pearl danio', 'Danio margaritatus was described from Myanmar after entering the aquarium hobby in 2006 Pearl-like spots cover the dark body, while red-and-black fins give mature fish a striking pattern despite their tiny 2–3 cm size'],
      ['Keep a proper group', 'This is a peaceful social fish Keep at least six, with 10–12 creating a more natural-looking group when space and filtration allow Dense cover helps shy individuals feel secure and gives displaying males room to avoid one another'],
      ['Build its habitat', 'A planted aquarium of at least 30 litres should combine dense vegetation and small open areas Use gentle filtration and stable water, and ensure that every tankmate fits the danio’s small size and preferred temperature range'],
      ['Choose its neighbors', 'Choose similarly small, peaceful fish that will not dominate feeding time Large or aggressive species can intimidate or eat these danios A species-focused planted setup is often the easiest way to observe their color and behavior'],
      ['Feeding & daily care', 'Their mouths are tiny, so offer finely sized flakes or slowly sinking nano granules plus suitable small frozen or live foods Watch that timid fish receive food and remove uneaten portions before they affect water quality'],
      ['Breeding', 'Celestial pearl danios scatter eggs and can breed readily in suitable conditions, although adults may eat eggs or fry Dense fine-leaved plants or a separate breeding setup improve the young fish’s chances'],
    ],
  },
  rasbora: {
    chinese: '三角灯鱼',
    headline: 'A peaceful copper schooler marked by a bold black wedge',
    sourceUrl: 'https://greenaqua.hu/en/hal-razbora-ekfoltos-razbora-trigonostigma-heteromorpha.html',
    facts: [
      ['Native habitat', 'Shaded shallow waters in Thailand, Malaysia and Sumatra'],
      ['Typical adult length', 'About 4 cm'],
      ['Expected lifespan', '5–6 years'],
      ['Minimum aquarium', '65 litres'],
      ['Recommended group', 'At least 8; 10–12 in about 85 L'],
      ['Temperature', '22–25 °C'],
      ['pH', '6.0–6.5'],
      ['Water hardness', '5–12 dGH'],
      ['Diet', 'Omnivore'],
      ['Breeding', 'Quite difficult'],
    ],
    sections: [
      ['Meet the harlequin rasbora', 'Trigonostigma heteromorpha is recognized by the bluish-black triangular wedge on each side of its copper body Mature males tend to have a sharper wedge, while females are usually fuller-bodied'],
      ['Keep a proper school', 'Harlequin rasboras are very peaceful and show their natural movement in a group Keep at least eight; an 85-litre aquarium can support a school of about 10–12 when the rest of the stocking and filtration are appropriate'],
      ['Build its habitat', 'Use at least 65 litres with roots, dense vegetation and an open midwater swimming area Shaded sections and stable, slightly acidic water suit their natural character, while plant cover gives the school somewhere to retreat'],
      ['Choose its neighbors', 'Pair them with peaceful fish that will not threaten or outcompete them Suitable communities can include small danios, other gentle rasboras, calm gouramis, loaches and similarly compatible species with overlapping water needs'],
      ['Feeding & daily care', 'Offer small flakes or granules and suitable frozen or live foods for variety Keep portions controlled and watch the whole school at feeding time Consistent partial water changes help maintain stable conditions'],
      ['Breeding', 'Breeding is considered fairly difficult compared with routine community care The fish place eggs around plant leaves, so a dedicated breeding setup and careful protection of eggs and fry are usually needed'],
    ],
  },
  cichlid: {
    chinese: '尼日利亚红肚鱼',
    headline: 'A colorful West African pair-forming cichlid with a strong attachment to caves and territory',
    sourceUrl: 'https://greenaqua.hu/en/fish-pelvicachromis-taeniatus-sp-nigerian-red.html',
    facts: [
      ['Origin', 'West Africa; Nigerian color form'],
      ['Typical adult length', '7–9 cm'],
      ['Minimum aquarium', '100 litres for an established pair'],
      ['Recommended group', 'A compatible pair'],
      ['Temperature', '22–25 °C'],
      ['pH', '5.5–7.0'],
      ['Water hardness', '5–12 dGH'],
      ['Behavior', 'Generally peaceful; territorial when breeding'],
      ['Diet', 'Varied omnivorous foods'],
      ['Breeding style', 'Cave spawner with parental care'],
    ],
    sections: [
      ['Meet Nigerian red', 'Pelvicachromis taeniatus “Nigerian red” is a small West African cichlid selected for its vivid belly color and finely patterned fins A compatible pair shows the most interesting courtship and parental behavior, especially in a structured aquarium'],
      ['Build its habitat', 'Provide at least 100 litres for a pair, with fine substrate, roots, caves and several hiding places Use plants and hardscape to break sight lines, while leaving clear routes so a chased fish is never trapped in a corner'],
      ['Understand its territory', 'The species is generally peaceful outside breeding, but a spawning pair may defend a much larger area Bottom-dwelling tankmates are especially likely to enter that territory, so plan floor space and companions carefully'],
      ['Choose its neighbors', 'Select calm community fish that use the upper and middle water layers and tolerate the same conditions Avoid housing multiple territorial pairs in limited space, and keep a separation plan available if aggression changes'],
      ['Feeding & daily care', 'Offer a varied omnivorous diet with quality prepared foods and suitable frozen or live options Watch both members of the pair at feeding time and maintain stable water with effective filtration and regular partial changes'],
      ['Breeding', 'This is a cave-spawning cichlid The pair guards eggs and fry, becoming much more territorial during parental care Provide more than one suitable cave and avoid disturbing an active breeding site'],
    ],
  },
}

const plantProfiles = {
  anubias: { chinese: '麒麟榕', scientific: 'Anubias barteri var. nana “Kirin”', headline: 'Slow-growing leaves for a shaded corner', facts: [['Growth', 'Slow'], ['Placement', 'Attach to wood or rock'], ['Light', 'Low to moderate'], ['Added CO₂', 'Usually optional']], sections: [['How it grows', 'A thick horizontal rhizome produces roots and durable leaves The “Kirin” trade name may vary between sellers; leaf shape and size depend on the actual cultivar'], ['Planting & care', 'Attach the plant to wood or rock, or keep the rhizome above the substrate Burying the rhizome can cause rot Trim damaged leaves and avoid excessive light, which can encourage algae on slow-growing foliage']] },
  fern: { chinese: '圆叶节节菜', scientific: 'Rotala rotundifolia', headline: 'Background stems that you can shape as they grow', facts: [['Growth', 'Moderate to fast'], ['Placement', 'Background or midground'], ['Light', 'Moderate to high'], ['Added CO₂', 'Helpful for fuller growth']], sections: [['How it grows', 'This is a stem plant Its underwater leaves can look different from the rounded leaves grown above water Color varies with cultivar, light and growing conditions; stronger light alone does not guarantee red foliage'], ['Planting & care', 'Plant individual stems with space between them Trim the tops and replant healthy cuttings to build a fuller group Provide balanced nutrients, and keep lower stems from being permanently shaded']] },
  grass: { chinese: '蒙特卡洛珍珠草', scientific: 'Micranthemum tweediei', headline: 'A small-leaf carpet for the front of your tank', facts: [['Growth', 'Spreading carpet'], ['Placement', 'Foreground'], ['Light', 'Moderate to high'], ['Added CO₂', 'Often helpful for a dense carpet']], sections: [['How it grows', 'Small round leaves spread along creeping stems A compact carpet is a result of suitable light, nutrients and stable conditions, rather than simply placing the plant on the bottom'], ['Planting & care', 'Divide into small portions and plant gently, leaving gaps for growth Trim before the carpet becomes too thick, which can shade and weaken the lower layers Fish that dig may uproot newly planted portions']] },
}

const allPlantProfiles = Object.fromEntries(CATALOG.plants.map(item => [item.id, {
  ...greenAquaPlantProfiles[item.id],
  ...plantProfiles[item.id],
  facts: plantProfiles[item.id] ? [...plantProfiles[item.id].facts, ['Model height', `About ${item.heightCm} cm (illustration estimate)`]] : greenAquaPlantProfiles[item.id].facts,
  sections: plantProfiles[item.id] ? [...plantProfiles[item.id].sections, greenAquaPlantProfiles[item.id].sections[1]] : greenAquaPlantProfiles[item.id].sections,
}]))

const substrateProfiles = {
  sand: { headline: 'A porous foundation underneath the visible soil', facts: [['Type', 'Nutrient-rich base layer'], ['Placement', 'Under a covering aquasoil'], ['Main role', 'Root-zone foundation']], sections: [['What it does', 'ADA Power Sand Advance is a porous, nutrient-containing base material for planted aquarium layouts Despite its name, it is not simply decorative sand for the visible surface'], ['How to use it', 'Follow the product instructions for the base-layer depth and covering soil Plan the layers before filling the tank A nutrient-rich substrate still needs cycling, water testing and suitable maintenance']] },
  gravel: { headline: 'An active soil for roots and planted layouts', facts: [['Type', 'Active aquasoil'], ['Placement', 'Visible planting substrate'], ['Water effect', 'Can lower pH and carbonate hardness']], sections: [['What it does', 'Tropica Aquarium Soil provides a root-growing medium and nutrients for planted aquariums Active soils interact with water chemistry, unlike an inert decorative gravel'], ['How to use it', 'Plant roots carefully and avoid crushing or aggressively stirring the granules Follow the manufacturer’s startup water-change guidance, test the water and allow the aquarium to cycle before adding fish']] },
  soil: { headline: 'A nutrient-rich soil that needs a thoughtful start', facts: [['Type', 'Active aquasoil'], ['Placement', 'Rooted planted layouts'], ['Startup', 'Monitor ammonia and nitrite']], sections: [['What it does', 'ADA Aqua Soil Amazonia supports plant roots and can soften and acidify water The exact effects depend on the version, your source water and how long the soil has been in use'], ['How to use it', 'New soil can release ammonia Follow the instructions for the specific product, carry out startup water changes and confirm cycling with water tests Never treat a planted layout or clear-looking water as proof that fish can be added safely']] },
}

const filterProfiles = {
  sponge: { headline: 'Gentle flow and a home for helpful bacteria', facts: [['Type', 'Air-driven sponge filtration'], ['Good fit', 'Gentle-flow setups'], ['Needs', 'An air pump and mature media']], sections: [['How it works', 'An air lift draws water through the sponge, which traps particles and supports beneficial bacteria Gentle flow is useful for long-finned fish and small inhabitants'], ['Routine care', 'Rinse the sponge gently in removed aquarium water when needed Keep airflow working and avoid replacing or sterilizing all established media at once Match the filter to the actual aquarium and stocking']] },
  hang: { headline: 'Accessible filtration at the edge of the aquarium', facts: [['Type', 'Hang-on-back filter'], ['Good fit', 'Accessible media maintenance'], ['Watch', 'Intake safety and return flow']], sections: [['How it works', 'Water is drawn into a box at the rim, passes through filter media and returns to the aquarium Different models offer different flow rates and media space'], ['Routine care', 'Protect the intake where small fish or shrimp need it Keep the water level appropriate for the model, and maintain media without removing all biological filtration at once Reduce flow for fish that struggle against the current']] },
  canister: { headline: 'External media space for a larger setup', facts: [['Type', 'External canister filter'], ['Good fit', 'Larger aquariums and media volume'], ['Watch', 'Hoses, seals and appropriate flow']], sections: [['How it works', 'Water travels through hoses to an external container with multiple media sections A canister can provide substantial filtration, but model choice and maintenance matter more than the label'], ['Routine care', 'Inspect hoses and seals, clean the impeller as directed and keep flow from falling unnoticed Preserve mature biological media A powerful filter does not compensate for unsuitable tankmates or an uncycled aquarium']] },
}

const supplyProfiles = {
  food: { headline: 'Match the food to the fish, then feed a little', facts: [['Purpose', 'Daily nutrition'], ['Choose by', 'Diet and mouth size'], ['Watch', 'Leftovers and unequal access']], sections: [['Choose the right food', 'A tiny pearl danio, a betta and a large angelfish do not all need the same pellet size or diet Choose foods appropriate to the species, and use suitable variety rather than relying on a single generic food'], ['Feeding routine', 'Use small, controlled portions Watch every fish eat and remove excess food Store food sealed and dry, and replace it according to the product guidance The pack quantities in the demo represent care actions, not grams or a real dosing schedule']] },
  water: { headline: 'Fresh water with matching conditions', facts: [['Purpose', 'Partial water changes'], ['Prepare', 'Temperature-matched, treated water'], ['Check', 'Ammonia, nitrite and other relevant tests']], sections: [['Prepare the replacement water', 'Treat tap water for chlorine or chloramine where required, following the conditioner’s label Match temperature and consider the chemistry of your source water Leaving water to stand is not a reliable way to remove chloramine'], ['A steady routine', 'Choose partial water changes based on the aquarium and test results Avoid sudden chemistry changes and never wash all filter media and replace all water as one routine The demo’s water kit represents this care routine; it is not a specific chemical product']] },
  fertilizer: { headline: 'Potassium for plants, as part of balanced nutrition', facts: [['Product', 'Seachem Flourish Potassium'], ['Main nutrient', 'Potassium (K)'], ['Not a substitute for', 'All other plant nutrients']], sections: [['What it does', 'Potassium is one of the nutrients aquatic plants use This product supplies potassium; it is not a complete replacement for nitrogen, phosphorus and micronutrients Plant growth also depends on light, carbon and stable conditions'], ['How to use it', 'Follow the current product label and account for the actual water volume and other fertilizers Keep track of what you add One demo dose raises a learning index; it does not represent a measured concentration or a real aquarium recommendation']] },
}

function entriesFor(items, category, prefix, profiles, icon) {
  return items.map(item => {
    const entry = { ...item, id: `${prefix}-${item.id}`, category, icon: item.icon || icon, ...profiles[item.id] }
    return item.photo || category === 'plants' ? {
      ...entry,
      art: item.photo,
      illustration: item.art,
      artType: 'photo',
      artCredit: item.photoCredit,
      artSource: item.photoSource,
      artLicense: item.photoLicense,
      artLicenseUrl: item.photoLicenseUrl,
    } : entry
  })
}

export const ENCYCLOPEDIA = [
  ...entriesFor(CATALOG.fish, 'fish', 'fish', fishProfiles, 'fish'),
  ...entriesFor(CATALOG.plants, 'plants', 'plant', allPlantProfiles, 'leaf'),
  ...entriesFor(SANDS, 'substrate', 'substrate', substrateProfiles, 'leaf'),
  ...entriesFor(FILTERS, 'equipment', 'filter', filterProfiles, 'droplet'),
  ...GLASS.map(item => ({ ...item, id: `glass-${item.id}`, category: 'equipment', icon: 'sun', headline: item.id === 'clear' ? 'Low-iron glass for a clearer view' : 'A familiar, practical aquarium material', facts: [['Material', item.id === 'clear' ? 'Low-iron glass' : 'Standard aquarium glass'], ['Main difference', 'Visual clarity and tint'], ['Fish care', 'No change to species requirements']], sections: [['What changes', item.id === 'clear' ? 'Low-iron glass generally has less green tint, especially when viewed through an edge or a thicker pane It changes how the layout looks, not the fish’s water or space needs' : 'Standard glass can have a mild green tint, especially in thicker panels It is a visual choice, and a properly built aquarium can provide the same habitat regardless of this finish'], ['Choosing a tank', 'Construction quality, appropriate glass thickness, a level supporting surface and the manufacturer’s load requirements matter for both finishes Do not choose an aquarium solely by how clear its glass looks']] })),
  ...SIZES.map(item => ({ ...item, id: `tank-${item.id}`, name: `${item.name} Aquarium`, category: 'equipment', icon: 'home', headline: `${item.dimensions} — a different amount of room to grow`, facts: [['Dimensions', item.dimensions], ['Gross volume', `About ${item.litres} L`], ['Actual water volume', 'Lower after substrate and decor'], ['Support', 'Level, load-rated aquarium stand']], sections: [['Understand the dimensions', 'Length, depth and height each affect the habitat Length matters for active schoolers, floor area matters for territories, and water depth matters for tall fish Litres alone do not tell you which species fit'], ['Plan the whole setup', 'Choose filtration, heating and lighting for the aquarium, and account for the weight of water, glass and substrate The room illustration offers a size reference; a real cabinet must be rated to support the full setup']] })),
  ...entriesFor(SUPPLIES, 'supplies', 'supply', supplyProfiles, 'bag'),
]
