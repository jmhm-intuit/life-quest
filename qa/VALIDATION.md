# Questline 3.8 Validation

Validated on 2026-08-20.

## Release metadata

- Version: `3.8.0`
- Schema: `20`
- Storage key: `questline-v3-8`
- Legacy migration includes `questline-v3-7`

## Static and packaging validation

- [x] JavaScript syntax passes `node --check app.js`.
- [x] Package preflight passes.
- [x] All 159 service-worker references exist.
- [x] Version, manifest, storage key, workflow, vendor files, and approved priority assets are present.
- [x] All 25 feature smoke markers pass.
- [x] Manifest and version JSON parse successfully.

## Responsive browser validation

The embedded standalone build was rendered through Chromium DevTools Protocol at:

- [x] 320 px
- [x] 360 px
- [x] 390 px
- [x] 430 px
- [x] 768 px
- [x] 1,440 px

At every width:

- Version reported `3.8.0`.
- Schema reported `20`.
- No document-level horizontal overflow was observed.
- No runtime exception or browser error was observed during the tested render.

Machine-readable results are in `qa/validation-results.json`.

## Interaction checks

- [x] Capture text carries into the New Task title.
- [x] Habit Review opens from the Habit card.
- [x] A planned Habit day opens direct result controls.
- [x] Moving a Habit occurrence returns to the same Habit Review instead of the main Habit list.
- [x] Habit period totals and visible planned opportunities refresh after movement.
- [x] Exploration opens with a visible Next Move.
- [x] Questions and Options render as compact investigation threads with inline Task entry.
- [x] Review opens by life area.
- [x] Cross-cutting insight cards render above Strong Momentum and Needs Proactive Focus.
- [x] Rank appears in a fixed location on Activity rows.
- [x] Priority ordering uses Rank before Star as a tie-breaker.

## Habit reconciliation coverage

- [x] Generated occurrences are normalized with stable IDs, period keys, sequence numbers, and original dates.
- [x] Duplicate non-extra occurrences sharing Habit, period, and date are consolidated.
- [x] Completed takes precedence over Skipped; Skipped takes precedence over Planned.
- [x] Explicit extra completions are preserved.
- [x] Retroactive completion dates are supported.
- [x] High-frequency, low-frequency, and numeric Habit reviews use different interaction patterns.
- [x] At least three upcoming opportunities are surfaced when available.

## Known device gate

Physical-device acceptance is still required for Android/iPhone date pickers, installed-PWA cache refresh, long-session local storage, and mobile file import/export.
