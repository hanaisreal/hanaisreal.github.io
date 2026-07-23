# Research Layout Design QA

- Source visual truth: `/var/folders/sv/7gtxrt_s3l749xmpw1x8n2cw0000gn/T/TemporaryItems/NSIRD_screencaptureui_zPGuEm/스크린샷 2026-07-23 오후 5.40.04.png`
- Implementation URL: `http://localhost:4173/research`
- Implementation screenshots:
  - Desktop: `/Users/hanaoh/.codex/visualizations/2026/07/23/019f8e20-f8ae-70e2-84b7-79bbbc1c30cf/research-layout-qa/research-desktop.png`
  - Mobile: `/Users/hanaoh/.codex/visualizations/2026/07/23/019f8e20-f8ae-70e2-84b7-79bbbc1c30cf/research-layout-qa/research-mobile.png`
- Combined comparison: `/Users/hanaoh/.codex/visualizations/2026/07/23/019f8e20-f8ae-70e2-84b7-79bbbc1c30cf/research-layout-qa/design-qa-comparison.png`
- Source pixels: 3024 × 1676.
- Implementation pixels: desktop 1440 × 2003; mobile 390 × 3066.
- CSS viewports: 1440 × 1000, 768 × 900, and 390 × 844.
- Density normalization: the desktop implementation's first 1000 pixels and the full reference were each scaled into a 720 × 500 comparison panel.
- State: initial `/research` view with no hover or card transition active.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested change.
- The research page's second/background wrapper is fully transparent. Browser inspection confirms `background: rgba(0, 0, 0, 0)`, `backdrop-filter: none`, `box-shadow: none`, and no page-level side borders.
- The publication and project cards remain visually distinct as individual white cards over the site background, matching the reference's free-standing card treatment.
- Responsive layout passes at all checked sizes with no horizontal overflow:
  - 1440 px: three 380 px columns within an 1180 px content area, leaving 130 px of visible background on each side.
  - 768 px: two 338 px columns with a 38 px side gutter.
  - 390 px: one 351 px column with a 20 px side gutter.

## Required Fidelity Surfaces

- Fonts and typography: the complete research page now uses the homepage's EB Garamond stack. Intro and section headings use the same 600 weight as the homepage, while descriptions, metadata, and card summaries use the regular weight. Section and intro text retain a high-contrast light color where the removed panel exposes the photographic background.
- Spacing and layout rhythm: fluid outer padding and fluid grid gaps keep the cards separated from the viewport edge. The grid changes continuously rather than jumping between fixed page widths.
- Colors and visual tokens: the outer research panel is transparent; individual card colors and ribbon tokens are unchanged. Intro, section headings, divider, and contribution note retain sufficient contrast against the exposed background.
- Image quality and asset fidelity: all existing publication and project images remain unchanged, uncropped by this layout change, and use the original assets.
- Copy and content: all research page copy is unchanged.

## Full-view Comparison Evidence

The combined comparison shows the requested shared treatment: individual white cards sit directly on the page background without a second opaque wrapper enclosing the Publications and Projects sections. The implementation intentionally keeps this portfolio's existing photographic background and card/ribbon identity rather than copying the reference site's palette or content.

## Focused Region Comparison Evidence

A separate focused crop was not required because the requested change concerns the full-page wrapper and responsive column structure, both clearly visible in the combined full-view comparison. Card typography and imagery were also inspected in the desktop and mobile captures.

## Interaction and Runtime Checks

- Opened the ToneCanvas publication card and confirmed navigation to `/publications/tonecanvas`.
- Confirmed the computed font family is EB Garamond across the page intro, section headings, cards, titles, and summaries.
- Checked the browser console. No layout-related runtime error was found; the app emits its pre-existing React 18 `ReactDOM.render` migration warning.
- Production build completed successfully.

## Comparison History

- Initial pass: the removed page panel, three-column desktop grid, two-column tablet grid, and one-column mobile grid all matched the requested direction. No P0/P1/P2 visual fix was required after the first browser comparison.
- Density refinement: reduced the desktop content width, card padding, typography, gaps, and image height. Rechecked the 1440 px and 390 px layouts with no horizontal overflow.
- Background refinement: added a fluid page gutter and lowered the desktop maximum width so more of the site background remains visible around the cards.

## Implementation Checklist

- [x] Remove the research page background, blur, borders, and shadow.
- [x] Preserve the publication and project cards.
- [x] Use a fluid auto-fitting grid.
- [x] Verify desktop, tablet, and mobile layouts.
- [x] Verify card navigation and console output.

## Follow-up Polish

- None required for this scoped change.

final result: passed
