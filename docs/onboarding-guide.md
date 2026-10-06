# Contextual guest guide

The workspace guide is an operational walkthrough for the guest demo. It is shown on top of the real product, points to real controls, and keeps the page locked while the user decides what to do next.

## User flow

1. On the login screen, enter an optional nickname and choose **Enter as a guest**.
2. The first entry opens the full walkthrough automatically.
3. Read the highlighted page area. The copy explains what it does and names the next click, while the guest remains in control of purchases and care actions.
4. Use **Next** to continue or **Back** to revisit a previous step. If the next step belongs to another route, the guide changes the hash route and waits for the target element to be visible before moving the spotlight.
5. **Skip guide** closes the overlay. The first-entry marker is saved, so a reload does not unexpectedly reopen it. **Finish** closes the completed walkthrough.
6. **How it works** in the signed-in header opens only the steps for the current page. It is the reusable contextual help entry point.

## Step contract

Guide content lives in `src/lib/contextualGuide.js`. Every step has the required contextual fields:

```js
{
  id,
  route: 'my-tanks',
  target: 'collection',
  title: 'Start with your tank collection',
  text: 'This rail is where you switch between your saved aquariums…',
  nextAction: 'Choose New tank when you want a new aquarium.'
}
```

`target` resolves to `[data-guide="…"]` in the rendered page. Add a stable `data-guide` attribute to a real button, form, card, or page area before adding a new step.

## Guide path

The single guest guide follows the same order as the editable demo script:

My tanks → Tank idea → New tank → Edit setup → Learn → Fish store → Observe tank → Water & nutrients → My bag / daily check-in → Daily care → 30-day preview → Share tank.

The guide can move across routes, but it only spotlights controls that exist on the current rendered page. It does not click purchase, care, or save controls for the guest.

## Keeping the script and guide aligned

`docs/demo-script.md` is the human-editable narration and recording plan. You can revise the Markdown directly while preparing a recording; those edits do not change the product guide automatically. When the script is ready to become the new default, copy the wording/order into `src/content/guide.json`, run `npm run guide:script` to regenerate the Markdown, then update the matching steps in `src/lib/contextualGuide.js`. Each generated scene includes the route and its `[data-guide="…"]` spotlight target.

`src/lib/contextualGuide.js` is the interactive version shown after Guest login. When the recording order, wording, or next action changes in the script, update the matching contextual step there and make sure its target is present in the page. The target mapping used by the script lives in `src/lib/guide.js`.

## Implementation notes

- `src/components/ContextualGuide.jsx` owns the modal overlay, focus loop, scroll/resize measurement, target polling, and route hand-off.
- `src/App.jsx` owns guest entry, first-entry state, current-page Help, and step navigation.
- `src/guide.css` provides the dark backdrop, spotlight ring, and responsive panel.
- `buildyourtank:nickname:v1` and `buildyourtank:contextual-guide:seen:v1` are browser-local demo keys. They do not provide authentication or cross-device identity.

## Verification

Run the normal checks:

```bash
npm test
npm run build
git diff --check
```

The browser smoke path should cover guest first entry, a cross-route **Next**, **Back**, **Skip guide**, a reload with no automatic re-open, **Finish**, and **How it works** on a page with a route-scoped step list.
