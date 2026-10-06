# Fish movement

`src/lib/fishHabits.js` assigns every current catalog fish a preferred water level and movement pattern by scientific name. Species overrides distinguish pygmy/hastatus cories from substrate-foraging cories, and celestial pearl danios from more active danios. Trade varieties of the same species share a profile.

These are illustrative preferences, not a biological simulation. Depth percentages, speeds, pause durations and intervals between air visits are animation choices inferred from the care information below; they are not measured species statistics. Genus defaults extend a representative habit to related catalog species. Individual behavior also changes with feeding, age, social conditions and aquarium layout.

| Pattern | Catalog examples | Animation |
| --- | --- | --- |
| Surface | Wrestling halfbeak, clown killifish | Horizontal movement just below the water surface |
| Upper/middle | Livebearers, pencilfish, ricefish, rainbowfish | Broad routes in the upper water column |
| Middle | Tetras, rasboras, angelfish, discus | Changing midwater routes; glass catfish move more slowly and pause |
| Lower/middle | Celestial pearl danio, cherry/five-band barbs | Calmer passages below the upper-water fish |
| Cover-oriented | Dwarf cichlids, badids, bumblebee gobies, puffers, rock cichlids | Short moves and pauses, interspersed with longer passages |
| Substrate | Most cories, kuhli/botia loaches, whiptails | Bottom foraging, brief rests and occasional longer passages |
| Midwater cories | Pygmy and hastatus cory | Midwater routes rather than permanent floor confinement |
| Air visits | Bettas, gouramis, cories | Occasional surface visits followed by a return to the preferred band |
| Surface grazing | Otocinclus, bristlenose, hillstream loaches, Stiphodon | Swim between compatible surfaces and remain there for a grazing/rest interval |
| Shelter | Hypancistrus, Pseudacanthicus | Lower-water movement and longer rests on wood/rock; not described as universal algae eaters |
| Browsing | Siamese algae eaters | Active lower/middle routes with brief decor visits; no suction-attachment behavior |
| All levels | Goldfish | Broad water-column movement including substrate visits |

Attachment coordinates follow the actual hardscape SVG silhouettes and CSS geometry. Wood/stone compatibility is preserved. Rock grazers can use the front glass in a wood-only layout. Fish rotate along surface tangents where their physical body fits; larger bodies use a shallower resting angle at the same surface. Movement and resting poses remain within the water column for all tank sizes. A fish leaves its resting site and continues generating destinations rather than looping around a fixed home position.

## Research

Care references checked October 6, 2026:

- [Aqueon Corydoras care](https://www.aqueon.com/resources/care-guides/corydoras-catfish): bottom feeding and occasional surface air gulps.
- [Seriously Fish pygmy cory](https://www.seriouslyfish.com/species/gastrodermus-pygmaeus/) and [hastatus cory](https://www.seriouslyfish.com/species/gastrodermus-hastatus/): midwater exceptions. The catalog retains the familiar Corydoras names.
- [Seriously Fish wrestling halfbeak](https://www.seriouslyfish.com/species/dermogenys-pusilla/) and [clown killifish](https://www.seriouslyfish.com/species/epiplatys-annulatus/): surface-dwelling habits.
- [Aqueon gouramis](https://www.aqueon.com/resources/care-guides/gouramis) and [bettas](https://www.aqueon.com/resources/care-guides/betta): surface orientation and labyrinth air breathing.
- [Seriously Fish celestial pearl danio](https://www.seriouslyfish.com/species/danio-margaritatus/): timid, planted habitat and rarely rising to the surface.
- [Seriously Fish glass catfish](https://www.seriouslyfish.com/species/kryptopterus-vitreolus/), [Apistogramma](https://www.seriouslyfish.com/species/apistogramma-cacatuoides/), [ram cichlid](https://www.seriouslyfish.com/species/mikrogeophagus-ramirezi/) and [Badis](https://www.seriouslyfish.com/species/badis-badis/): representative social, shelter and substrate habits used for calmer/cover-oriented profiles.
- [Seriously Fish Stiphodon](https://www.seriouslyfish.com/species/stiphodon-ornatus/), [Beaufortia](https://www.seriouslyfish.com/species/beaufortia-kweichowensis/) and [Yaoshania](https://www.seriouslyfish.com/species/yaoshania-pachychilus/): benthic grazing and use of rock/hard surfaces.
- [Aquarium Co-Op Otocinclus](https://www.aquariumcoop.com/blogs/aquarium/otocinclus-catfish): small algae-grazing catfish.
- [Aquarium Co-Op Siamese algae eater](https://www.aquariumcoop.com/blogs/aquarium/siamese-algae-eater): active swimming, browsing/resting on decor, and distinction from a suckermouth algae eater.
- [OATA freshwater catfish](https://ornamentalfish.org/what-we-do/advice-information/care-sheets/caresheets-tropical-freshwater-fish/how-to-look-after-freshwater-catfish/): shelter requirements and varied diets rather than treating every catfish as an algae eater.

The existing `fishGroups.js` care articles provide additional group-level references for the broad community-fish defaults. `fishSwimming.test.js` checks catalog coverage, exceptions, preferred levels, physical bounds, air returns, compatible resting sites and continued roaming across every tank size and hardscape.
