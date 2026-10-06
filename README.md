# FitBody — 100% Figma Screen Build

This project was rebuilt directly from the user's supplied Figma PNG export ZIP.

- **95 PNG assets included**
- **93 full mobile app screens included**
- **2 logo/group assets included**
- Every full screen is registered in `App.js`
- Major architecture branches are interactively connected
- 393×952 / 393×960 / 393×1029 screens scroll at their original aspect ratio
- Login, signup, forgotten password, profile setup and support chat have editable overlays
- Workout, nutrition, progress, community, favorites, resources and support branches are reachable
- QA menu gives direct access to every major branch

## Important source limitation
The Figma export contains workout-video **screen images**, not actual `.mp4`/`.webm` files. Therefore the complete video UI is present, but genuine video playback cannot exist until real video files are supplied.

## Run
`npm install`
`npx expo start`

## APK
A GitHub Actions workflow is included at `.github/workflows/build-apk.yml` and produces `FitBody.apk`.