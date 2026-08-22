# Questline 3.9 Validation

## Release identity

- Application: Questline `3.9.0`
- Data schema: `21`
- Storage key: `questline-v3-9`

## Static validation

The release passed:

- JavaScript syntax validation with `node --check app.js`
- Package preflight
- Manifest and version validation
- Asset-manifest integrity checks
- Service-worker cache-reference checks
- 34 of 34 feature smoke checks

The service worker references 213 local resources, all present and non-empty where content is expected.

## Browser validation

The standalone production bundle was rendered in headless Chromium at:

- 320 × 844
- 360 × 844
- 390 × 844
- 430 × 844
- 768 × 1000
- 1,440 × 1,000

Result: **108 of 108 checks passed**.

Each width validated:

- Questline 3.9 title and version metadata
- No document-level horizontal overflow on Today
- No broken visible images on Today
- Life-area Review opens by default
- Review recognition metrics render
- No horizontal overflow in Review
- Recognition and Realm images load
- Habit workspace exposes Review, Plan, and numeric-progress actions
- At least three future Habit opportunities render
- High-frequency Habit cycle review opens
- Seven-day reconciliation strip renders
- Habit modal has no document-level horizontal overflow
- Monthly fixed-day, ordinal-weekday, and manual recurrence controls render
- Monthly planning view renders upcoming opportunities
- Compact eight-choice life-area selector appears in Task details
- No JavaScript runtime or console errors

## Functional scenarios exercised

- Open Review and display weekly positive-recognition summary
- Open Habit workspace and inspect frequency-sensitive actions
- Open weekly Habit reconciliation
- Display current-cycle completion, skip, remaining-target, and planned-opportunity counts
- Display monthly recurrence options
- Open Task details and verify icon-based life-area selection

## Packaging checks

Before release, the following are also validated:

- Deployment ZIP contains files at archive root
- PWA ZIP integrity
- Standalone HTML generation
- GitHub Pages workflow is present
- Deployment script validates the archive before replacing repository content

## Remaining acceptance work

Physical-device testing is still recommended for:

- Installed PWA update behavior
- Mobile browser date pickers
- File import and export pickers
- Long-running browser storage
- Real-device safe-area behavior
- Habit reconciliation with a real personal portfolio

## Deployment-script validation

The standalone deployment script was executed against a temporary Git repository with a temporary `origin/main`. It successfully:

- fetched and rebased `main`
- validated and extracted the deployment archive
- ran JavaScript, preflight, and smoke checks
- preserved `.git`
- replaced the application files
- committed `Deploy Questline v3.9.0`
- pushed the new commit to the temporary remote

## Final regression validation

After the release candidate was assembled, a second production-bundle regression pass executed the standalone bundle in headless Chromium through the DevTools protocol. **21 of 21 checks passed**, including:

- Version and schema metadata
- No horizontal overflow at a 390-pixel mobile viewport
- Positive-behavior asset registration
- High-frequency Habit cycle opening without runtime exceptions
- Seven-day reconciliation strip
- Review and Plan tabs in the same Habit workspace
- At least three upcoming opportunities
- Life-area Review as the default Review view
- Recognition hero, pace metrics, and all life-area evidence cards
- Actionable Exploration and visible Next Move
- Capture text preservation into Task creation
- Eight-choice visual life-area selector
- Primary and shared-area selection persistence
- No JavaScript runtime exceptions

This regression pass also verified the defensive date handling used by Habit-cycle views so malformed or legacy date values cannot crash the workspace.
