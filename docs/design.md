# Build Your Tank — October 4 demo revision

Source: [Feishu PRD, updated October 4](https://taala-ai.feishu.cn/wiki/KtBrwvroWiXDNPkOTWQc2QqKnvh), read in the browser, plus the user's five explicit requirements. The document's generic navigation names differ from the message; the message takes precedence: My tanks, Tank idea, Fish store, Learn.

## Design direction

Ocean-blue accents and navy text follow the PRD's Ocean Blue Serenity palette reference. The page uses a pale blue background and white surfaces. The room has the specified ivory wall, window, desk/cabinet and familiar objects, with a fixed camera and furniture scale.

The existing serif headlines and original illustration system continue. The original angelfish reference remains intact. New SVG room, Congo tetra, celestial pearl danio, Rotala and Monte Carlo assets are editable prototype illustrations, not validated biological reference images. Built-in Image Gen is unavailable; no generated concept was approved. Do not claim comparison against an accepted generated concept.

Tokens: page #f5f8fa, surface #ffffff, ink #19374b, muted #738794, accent #4387a8, primary action #357998, line #e1e9ed. Display type is Georgia; UI type is system sans. The room asset uses natural ivory and muted timber colors without a blue overlay.

## Surfaces

- Public Home: project introduction, room-and-aquarium hero, three clear steps, inspiration examples and entry CTA. It precedes the demo entry.
- Demo entry: nickname or guest workspace. No password fields or simulated credential authentication; cloud login is explicitly not connected.
- My tanks: persistent collection selector and create-tank flow; species and water settings on the left, room in the center, care actions on the right. Includes rename, size selection, setup, daily care, 30-day estimate, save and snapshot share.
- Tank idea: read-only example community tanks with creator, species count, pH, space and overall status. “My gallery” contains this browser's tanks whose local display switch is enabled. Copying a setup purchases a separate tank instead of replacing one.
- Fish store: six PRD fish, three PRD plants, three sizes, two glass finishes, three substrates, three filters, food, water care and fertilizer. Search, species details and selected tank determine where purchases go.
- Learn: a searchable encyclopedia with 23 entries, category filters, direct article links and full species / product details.
- Resources: shared coin balance, food and water care in the header; My bag also lists fertilizer and already installed purchases.

## Room scale

The SVG scene is 1000 × 660 units. Aquarium widths are 240 / 480 / 600 units for 60P / 120P / 150P, so all use exactly four scene units per centimeter. Heights follow 60/36, 120/50 and 150/50 aspect ratios. The aquarium bottom stays on the cabinet, and the fixed cabinet supports every size. Labels show physical dimensions and 65 / 300 / 450 L, rounded from the PRD dimensions. Size changes also update the educational bioload capacity.

On mobile, room and tank actions appear first, then species/water and care sections. Navigation remains visible and the collection rail scrolls within itself. Reduced-motion preferences stop swimming and transition effects.

## Demo rules and persistence

A v2 workspace holds multiple tanks and one shared budget/inventory. An existing v1 aquarium migrates without replacing its name, contents, care dates or remaining balance. Purchases debit the common balance; removing items or trading equipment refunds their demo price. Newly created or copied tanks are private in the local gallery by default.

Provisional values: 100 initial coins; check-in +20 coins once per browser-local date; feeding uses one portion and grants +5; water change uses one refill and grants +8. Fertilizer uses one dose, once per tank per day, and increments the demo nutrient index. The PRD leaves exact prices and quantitative water rules undefined; these are demo settings rather than market or scientific values.

Temperature, pH, nutrients and hardness persist per tank. Extreme pH, temperature and nutrients affect educational status and the 30-day estimate. Hardness is stored/displayed for exploring setup; species-specific hardness chemistry is not modeled.

Sharing encodes a validated read-only snapshot in the URL fragment. It is not a live cloud record. Public gallery visibility is local, not online publishing. Authentication, Supabase, live community data and cross-device saving remain unconnected.

## Validation and comparison ledger

Browser checks cover Home, demo entry, all four destinations, onboarding, once-only check-in, multiple-tank creation and isolation, equipment trade-ins, fish purchases, supplies, feeding/water/fertilizer, pH warnings, gallery filters/details, snapshot copying and reload restoration. This follow-up additionally checks tabletop alignment, observation zoom/reset, encyclopedia filtering, article navigation and direct article refresh.

Compare against the PRD and implementation brief, not a generated concept:

1. Navigation: exact four names from the user's message; dedicated pages instead of former dialogs.
2. Palette: ocean blue in header, actions and display emphasis; white content surfaces; ivory room wall.
3. Room: fixed window, furniture and view, with three proportional tank sizes. Cabinet widened to support 150P after visual inspection.
4. Layout: species/water appear left of the room on desktop; care right; readable mobile stack. Bag icon received an accessible label when mobile hides its visible text.
5. Interaction: budget failure feedback renders inside the native dialog, so it remains visible in the top layer. One daily reward and per-tank care dates survive reload.
6. Detail clarity: non-neutral pH receives an appropriate acidity label and explicit warnings, including in read-only views.

Intentional deviations: original vector prototype art in place of generated imagery; local demo entry in place of real accounts; example/local gallery in place of live public tanks; provisional coin prices and educational water calculations. Exact account, inventory ownership and simulation rules require a cloud implementation and validated data before production use.

## October 4 follow-up

- Removed the homepage hero sentence requested by the user.
- Background and tank now share an internal 1000 × 660 world. Both are cropped together in different preview aspect ratios; every tank base uses the tabletop coordinate y=452. A narrow contact shadow replaces the detached drop shadow beneath the tank.
- Observe tank opens a dedicated close-up. Zoom ranges from 75% to 250% in 25% steps, with reset and keyboard/scroll/touch navigation. This changes observation only, not tank size or saved data.
- Learn now offers 23 encyclopedia entries: six fish, three plants, three substrates, three filters, two glass finishes, three tank sizes and three care supplies. Detailed articles replace the lesson/quiz flow. Existing saved workspace records remain compatible.
- Encyclopedia text is an initial editorial draft; typical fish ranges and product-specific instructions need source review before a real husbandry release.
