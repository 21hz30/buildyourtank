import { CATALOG, FILTERS, GLASS, SANDS, SIZES } from './tank.js'
import { SUPPLIES } from './workspace.js'

export const ENCYCLOPEDIA_CATEGORIES = [
  { id: 'all', name: 'All entries', icon: 'book' },
  { id: 'fish', name: 'Fish', icon: 'fish' },
  { id: 'plants', name: 'Plants', icon: 'leaf' },
  { id: 'substrate', name: 'Substrates', icon: 'leaf' },
  { id: 'equipment', name: 'Tanks & equipment', icon: 'sliders' },
  { id: 'supplies', name: 'Care supplies', icon: 'bag' },
]

const fishProfiles = {
  tetra: {
    chinese: '刚果灯鱼', headline: 'Iridescent fins, happiest in company.',
    facts: [['Native habitat', 'Congo River basin, Central Africa'], ['Typical adult length', '6–8.5 cm'], ['Temperature', '23–27 °C'], ['pH', '6.0–7.5'], ['Social life', 'A school of 6 or more'], ['Diet', 'Omnivore']],
    sections: [
      ['Meet the fish', 'Light catches blue, gold and violet along the body. Mature males develop longer, flowing fins. This is an active midwater swimmer, so a group needs a long, open swimming area.'],
      ['Build its habitat', 'Use plants along the back and sides, with clear space in the middle. Soft to moderately hard water, stable conditions and subdued light suit a comfortable setup. A 120P offers more swimming length than a 60P.'],
      ['Choose its neighbors', 'Choose peaceful fish with similar water needs. Avoid persistent fin nippers and tiny companions that could be overwhelmed. A solitary Congo tetra cannot show its natural schooling behavior.'],
      ['Feeding & care', 'Offer appropriately sized flakes or small pellets, with suitable frozen or live foods for variety. Watch the whole group at feeding time and remove leftovers.'],
    ],
  },
  angelfish: {
    chinese: '神仙鱼', headline: 'A tall silhouette that needs room to grow.',
    facts: [['Native habitat', 'Amazon basin, South America'], ['Typical adult size', 'About 15 cm long; up to 25–30 cm tall'], ['Temperature', '24–28 °C'], ['pH', '6.0–7.5'], ['Social life', 'Cichlid; pairs can become territorial'], ['Diet', 'Omnivore']],
    sections: [
      ['Meet the fish', 'A laterally compressed body and long dorsal and anal fins create its distinctive shape. Juveniles may look small, but the adult needs considerable water depth and swimming room.'],
      ['Build its habitat', 'Provide tall plants, open swimming areas and a suitably tall aquarium. Consider the usable water depth above the substrate. A 60P is too shallow for a full-grown angelfish; a 120P or 150P gives a better starting point for planning.'],
      ['Choose its neighbors', 'Very small fish and shrimp may be eaten. Avoid fin nippers. Breeding pairs can defend an area, so compatibility needs more thought than matching colors or checking a capacity score.'],
      ['Feeding & care', 'Use a varied, suitably sized diet. Observe body condition, appetite and fin condition. Stable warm water and a mature filter matter more than rapid changes to chase a pH number.'],
    ],
  },
  betta: {
    chinese: '暹罗斗鱼', headline: 'One colorful personality, with a calm home.',
    facts: [['Native habitat', 'Shallow, planted waters of Southeast Asia'], ['Typical adult length', '6–7 cm'], ['Temperature', '24–28 °C'], ['pH', '6.0–7.5'], ['Social life', 'Keep males separately'], ['Diet', 'Carnivore; insect-based foods']],
    sections: [
      ['Meet the fish', 'Domestic bettas come in many colors and fin shapes. A labyrinth organ lets them breathe air at the surface, but it does not remove their need for clean, warm water.'],
      ['Build its habitat', 'Offer gentle filtration, a heater where needed, plant cover and resting places near the surface. Keep easy access to the air and use a secure lid with an air gap. Avoid sharp decorations that can tear long fins.'],
      ['Choose its neighbors', 'Two males should not share a tank. Community housing is dependent on the individual and the companions; fin nippers, similar-looking rivals and small shrimp can cause problems. A carefully planned solo setup is the simplest place to start.'],
      ['Feeding & care', 'Choose quality, small betta foods with animal protein, and offer suitable variety. Feed modest portions and check the fish is actually eating. Persistent clamped fins or loss of appetite deserve attention.'],
    ],
  },
  danio: {
    chinese: '银河斑马鱼', headline: 'Tiny pearls among the greenery.',
    facts: [['Native habitat', 'Planted pools in Myanmar'], ['Typical adult length', '2–2.5 cm'], ['Temperature', '20–24 °C'], ['pH', '6.5–7.5'], ['Social life', 'A group of 8 or more'], ['Diet', 'Small omnivorous foods']],
    sections: [
      ['Meet the fish', 'Pearl-like spots cover a dark body, with red and black accents in the fins. This small, sometimes shy fish becomes easier to observe in a settled group with plenty of cover.'],
      ['Build its habitat', 'Use dense planting with small open pockets and gentle flow. It prefers cooler conditions than many warm-water tropical fish, so a shared tank must have overlapping temperature requirements.'],
      ['Choose its neighbors', 'Choose small, peaceful species that do not outcompete it for food. Large fish, including adult angelfish, can treat it as prey. Plant cover helps reduce pressure between displaying males.'],
      ['Feeding & care', 'Its mouth is tiny. Use finely sized foods and small frozen or live foods where suitable. Check that food reaches timid individuals rather than only the boldest fish.'],
    ],
  },
  rasbora: {
    chinese: '三角灯鱼', headline: 'Copper color and a familiar black triangle.',
    facts: [['Native habitat', 'Streams and swamp waters of Southeast Asia'], ['Typical adult length', '4–5 cm'], ['Temperature', '22–27 °C'], ['pH', '5.5–7.5'], ['Social life', 'A school of 8 or more'], ['Diet', 'Omnivore']],
    sections: [
      ['Meet the fish', 'The dark wedge on the rear half of its copper-colored body makes this rasbora easy to recognize. A group moves through the midwater together and feels more secure than a lone fish.'],
      ['Build its habitat', 'Combine planted edges, shaded areas and open swimming space. Soft to moderately hard water is a useful starting point; avoid abrupt shifts in temperature or chemistry.'],
      ['Choose its neighbors', 'Peaceful fish of compatible size and water needs are good candidates. Avoid aggressive species and predators. Plan for the whole school rather than purchasing one individual as decoration.'],
      ['Feeding & care', 'Offer small flakes or pellets and appropriate frozen or live foods. Keep portions small enough to be consumed, and observe whether every fish joins the school and eats.'],
    ],
  },
  cichlid: {
    chinese: '尼日利亚红肚鱼', headline: 'A cave dweller with a territory of its own.',
    facts: [['Native habitat', 'West African rivers and streams'], ['Typical adult length', 'About 6–9 cm, depending on sex'], ['Temperature', '24–27 °C'], ['pH', 'Around 6.0–7.5; population dependent'], ['Social life', 'Territorial, especially when breeding'], ['Diet', 'Varied omnivorous foods']],
    sections: [
      ['Meet the fish', 'Pelvicachromis cichlids often show their strongest colors during courtship. “Nigerian red cichlid” is a trade name, so confirm the scientific identity and origin: similarly named fish can have different requirements.'],
      ['Build its habitat', 'Provide caves, plant cover and visual barriers, with enough floor area for a territory. Keep a clear escape route for fish that are chased. Water preferences vary by population and breeding goals.'],
      ['Choose its neighbors', 'A breeding pair can defend a much larger area than expected. Other bottom-dwelling fish may be pressured. More hiding places do not automatically make a small tank safe for multiple territories.'],
      ['Feeding & care', 'Use a varied diet with appropriately sized foods. Watch for chasing, hiding and individuals missing meals. A spare separation plan is useful when territorial behavior changes.'],
    ],
  },
}

const plantProfiles = {
  anubias: { chinese: '麒麟榕', scientific: 'Anubias sp. · trade / cultivar name', headline: 'Slow-growing leaves for a shaded corner.', facts: [['Growth', 'Slow'], ['Placement', 'Attach to wood or rock'], ['Light', 'Low to moderate'], ['Added CO₂', 'Usually optional']], sections: [['How it grows', 'A thick horizontal rhizome produces roots and durable leaves. The “Kirin” trade name may vary between sellers; leaf shape and size depend on the actual cultivar.'], ['Planting & care', 'Attach the plant to wood or rock, or keep the rhizome above the substrate. Burying the rhizome can cause rot. Trim damaged leaves and avoid excessive light, which can encourage algae on slow-growing foliage.']] },
  fern: { chinese: '圆叶节节菜', scientific: 'Rotala rotundifolia', headline: 'Background stems that you can shape as they grow.', facts: [['Growth', 'Moderate to fast'], ['Placement', 'Background or midground'], ['Light', 'Moderate to high'], ['Added CO₂', 'Helpful for fuller growth']], sections: [['How it grows', 'This is a stem plant. Its underwater leaves can look different from the rounded leaves grown above water. Color varies with cultivar, light and growing conditions; stronger light alone does not guarantee red foliage.'], ['Planting & care', 'Plant individual stems with space between them. Trim the tops and replant healthy cuttings to build a fuller group. Provide balanced nutrients, and keep lower stems from being permanently shaded.']] },
  grass: { chinese: '蒙特卡洛珍珠草', scientific: 'Micranthemum tweediei', headline: 'A small-leaf carpet for the front of your tank.', facts: [['Growth', 'Spreading carpet'], ['Placement', 'Foreground'], ['Light', 'Moderate to high'], ['Added CO₂', 'Often helpful for a dense carpet']], sections: [['How it grows', 'Small round leaves spread along creeping stems. A compact carpet is a result of suitable light, nutrients and stable conditions, rather than simply placing the plant on the bottom.'], ['Planting & care', 'Divide into small portions and plant gently, leaving gaps for growth. Trim before the carpet becomes too thick, which can shade and weaken the lower layers. Fish that dig may uproot newly planted portions.']] },
}

const substrateProfiles = {
  sand: { headline: 'A porous foundation underneath the visible soil.', facts: [['Type', 'Nutrient-rich base layer'], ['Placement', 'Under a covering aquasoil'], ['Main role', 'Root-zone foundation']], sections: [['What it does', 'ADA Power Sand Advance is a porous, nutrient-containing base material for planted aquarium layouts. Despite its name, it is not simply decorative sand for the visible surface.'], ['How to use it', 'Follow the product instructions for the base-layer depth and covering soil. Plan the layers before filling the tank. A nutrient-rich substrate still needs cycling, water testing and suitable maintenance.']] },
  gravel: { headline: 'An active soil for roots and planted layouts.', facts: [['Type', 'Active aquasoil'], ['Placement', 'Visible planting substrate'], ['Water effect', 'Can lower pH and carbonate hardness']], sections: [['What it does', 'Tropica Aquarium Soil provides a root-growing medium and nutrients for planted aquariums. Active soils interact with water chemistry, unlike an inert decorative gravel.'], ['How to use it', 'Plant roots carefully and avoid crushing or aggressively stirring the granules. Follow the manufacturer’s startup water-change guidance, test the water and allow the aquarium to cycle before adding fish.']] },
  soil: { headline: 'A nutrient-rich soil that needs a thoughtful start.', facts: [['Type', 'Active aquasoil'], ['Placement', 'Rooted planted layouts'], ['Startup', 'Monitor ammonia and nitrite']], sections: [['What it does', 'ADA Aqua Soil Amazonia supports plant roots and can soften and acidify water. The exact effects depend on the version, your source water and how long the soil has been in use.'], ['How to use it', 'New soil can release ammonia. Follow the instructions for the specific product, carry out startup water changes and confirm cycling with water tests. Never treat a planted layout or clear-looking water as proof that fish can be added safely.']] },
}

const filterProfiles = {
  sponge: { headline: 'Gentle flow and a home for helpful bacteria.', facts: [['Type', 'Air-driven sponge filtration'], ['Good fit', 'Gentle-flow setups'], ['Needs', 'An air pump and mature media']], sections: [['How it works', 'An air lift draws water through the sponge, which traps particles and supports beneficial bacteria. Gentle flow is useful for long-finned fish and small inhabitants.'], ['Routine care', 'Rinse the sponge gently in removed aquarium water when needed. Keep airflow working and avoid replacing or sterilizing all established media at once. Match the filter to the actual aquarium and stocking.']] },
  hang: { headline: 'Accessible filtration at the edge of the aquarium.', facts: [['Type', 'Hang-on-back filter'], ['Good fit', 'Accessible media maintenance'], ['Watch', 'Intake safety and return flow']], sections: [['How it works', 'Water is drawn into a box at the rim, passes through filter media and returns to the aquarium. Different models offer different flow rates and media space.'], ['Routine care', 'Protect the intake where small fish or shrimp need it. Keep the water level appropriate for the model, and maintain media without removing all biological filtration at once. Reduce flow for fish that struggle against the current.']] },
  canister: { headline: 'External media space for a larger setup.', facts: [['Type', 'External canister filter'], ['Good fit', 'Larger aquariums and media volume'], ['Watch', 'Hoses, seals and appropriate flow']], sections: [['How it works', 'Water travels through hoses to an external container with multiple media sections. A canister can provide substantial filtration, but model choice and maintenance matter more than the label.'], ['Routine care', 'Inspect hoses and seals, clean the impeller as directed and keep flow from falling unnoticed. Preserve mature biological media. A powerful filter does not compensate for unsuitable tankmates or an uncycled aquarium.']] },
}

const supplyProfiles = {
  food: { headline: 'Match the food to the fish, then feed a little.', facts: [['Purpose', 'Daily nutrition'], ['Choose by', 'Diet and mouth size'], ['Watch', 'Leftovers and unequal access']], sections: [['Choose the right food', 'A tiny pearl danio, a betta and a large angelfish do not all need the same pellet size or diet. Choose foods appropriate to the species, and use suitable variety rather than relying on a single generic food.'], ['Feeding routine', 'Use small, controlled portions. Watch every fish eat and remove excess food. Store food sealed and dry, and replace it according to the product guidance. The pack quantities in the demo represent care actions, not grams or a real dosing schedule.']] },
  water: { headline: 'Fresh water with matching conditions.', facts: [['Purpose', 'Partial water changes'], ['Prepare', 'Temperature-matched, treated water'], ['Check', 'Ammonia, nitrite and other relevant tests']], sections: [['Prepare the replacement water', 'Treat tap water for chlorine or chloramine where required, following the conditioner’s label. Match temperature and consider the chemistry of your source water. Leaving water to stand is not a reliable way to remove chloramine.'], ['A steady routine', 'Choose partial water changes based on the aquarium and test results. Avoid sudden chemistry changes and never wash all filter media and replace all water as one routine. The demo’s water kit represents this care routine; it is not a specific chemical product.']] },
  fertilizer: { headline: 'Potassium for plants, as part of balanced nutrition.', facts: [['Product', 'Seachem Flourish Potassium'], ['Main nutrient', 'Potassium (K)'], ['Not a substitute for', 'All other plant nutrients']], sections: [['What it does', 'Potassium is one of the nutrients aquatic plants use. This product supplies potassium; it is not a complete replacement for nitrogen, phosphorus and micronutrients. Plant growth also depends on light, carbon and stable conditions.'], ['How to use it', 'Follow the current product label and account for the actual water volume and other fertilizers. Keep track of what you add. One demo dose raises a learning index; it does not represent a measured concentration or a real aquarium recommendation.']] },
}

function entriesFor(items, category, prefix, profiles, icon) {
  return items.map(item => ({ ...item, id: `${prefix}-${item.id}`, category, icon: item.icon || icon, ...profiles[item.id] }))
}

export const ENCYCLOPEDIA = [
  ...entriesFor(CATALOG.fish, 'fish', 'fish', fishProfiles, 'fish'),
  ...entriesFor(CATALOG.plants, 'plants', 'plant', plantProfiles, 'leaf'),
  ...entriesFor(SANDS, 'substrate', 'substrate', substrateProfiles, 'leaf'),
  ...entriesFor(FILTERS, 'equipment', 'filter', filterProfiles, 'droplet'),
  ...GLASS.map(item => ({ ...item, id: `glass-${item.id}`, category: 'equipment', icon: 'sun', headline: item.id === 'clear' ? 'Low-iron glass for a clearer view.' : 'A familiar, practical aquarium material.', facts: [['Material', item.id === 'clear' ? 'Low-iron glass' : 'Standard aquarium glass'], ['Main difference', 'Visual clarity and tint'], ['Fish care', 'No change to species requirements']], sections: [['What changes', item.id === 'clear' ? 'Low-iron glass generally has less green tint, especially when viewed through an edge or a thicker pane. It changes how the layout looks, not the fish’s water or space needs.' : 'Standard glass can have a mild green tint, especially in thicker panels. It is a visual choice, and a properly built aquarium can provide the same habitat regardless of this finish.'], ['Choosing a tank', 'Construction quality, appropriate glass thickness, a level supporting surface and the manufacturer’s load requirements matter for both finishes. Do not choose an aquarium solely by how clear its glass looks.']] })),
  ...SIZES.map(item => ({ ...item, id: `tank-${item.id}`, name: `${item.name} Aquarium`, category: 'equipment', icon: 'home', headline: `${item.dimensions} — a different amount of room to grow.`, facts: [['Dimensions', item.dimensions], ['Gross volume', `About ${item.litres} L`], ['Actual water volume', 'Lower after substrate and decor'], ['Support', 'Level, load-rated aquarium stand']], sections: [['Understand the dimensions', 'Length, depth and height each affect the habitat. Length matters for active schoolers, floor area matters for territories, and water depth matters for tall fish. Litres alone do not tell you which species fit.'], ['Plan the whole setup', 'Choose filtration, heating and lighting for the aquarium, and account for the weight of water, glass and substrate. The room illustration offers a size reference; a real cabinet must be rated to support the full setup.']] })),
  ...entriesFor(SUPPLIES, 'supplies', 'supply', supplyProfiles, 'bag'),
]
