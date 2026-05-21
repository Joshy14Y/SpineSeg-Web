# SpineSeg — Automatic Vertebrae Segmentation in Radiographies using Deep Learning

![App Status](https://img.shields.io/website?url=https://spineseg-a1a25.web.app&label=App)
![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/deployed-Firebase-FFCA28?logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

**SpineSeg** is a web-based medical imaging application for automated spine segmentation and scoliosis screening. It allows clinicians and researchers to upload a spinal X-ray, run deep learning inference against the SpineSeg API, and inspect the segmentation results broken down by vertebral segment — including a Cobb angle estimation and per-band signal statistics.

**Team:** Joshua Sancho, Andrés Castellano, Camilo Albarracín, Nicolás Sánchez, Sebastián Morelli

---

## Relevant Links

| Resource | URL |
|---|---|
| 🌐 Frontend app | https://spineseg-a1a25.web.app |
| 🔌 API (live) | https://spineseg-api-production.up.railway.app |
| 📖 API docs | https://spineseg-api-production.up.railway.app/docs |
| 🔧 Backend repo | https://github.com/Joshy14Y/SpineSeg-API |

---

## Architecture

This is the **frontend** repository. The full system is split across three independent repos:

- **Training** — data pipeline, model training, and evaluation
- **Backend** — FastAPI inference service
- **Frontend** ← you are here — Angular web interface

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, TypeScript |
| Styling | CSS custom properties, no framework |
| State | Angular Signals (`signal`, `computed`, `effect`) |
| Build | Angular CLI, pnpm |
| Deploy | Firebase Hosting |
| API | FastAPI on Railway |
| Model | U-Net (ONNX) |

---

## How to use it

The interface consists of a single screen:

1. **Load an image** — click the upload container in the upper left to select a grayscale spine X-ray from your device.
2. **Run inference** — click the **Inference** button to send the image to the API.
3. **Inspect results** — once inference completes, the screen displays:
   - The annotated X-ray with segmentation overlay and Cobb angle lines
   - A color-coded vertebra mask rendered client-side
   - A diagnosis card with scoliosis assessment based on the Cobb angle
   - A per-segment list with visual accent indicators and confidence scores
   - A stats card with signal band statistics

---

## Dependencies

Dependencies are managed via `pnpm` and listed in `package.json`. Install them as described below.

---

## Installation

```bash
git clone https://github.com/Joshy14Y/SpineSeg-Web.git
cd SpineSeg-Web

pnpm install
```

---

## Configuration

Set the API URL in the environment files before building:

| File | Usage |
|---|---|
| `src/environments/environment.ts` | Production |
| `src/environments/environment.development.ts` | Development |

Set `apiUrl` in each file to point to the appropriate backend instance.

> No API keys or secrets are required to run the frontend locally.

---

## Running locally

```bash
pnpm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

---

## Build

```bash
pnpm build
```

Output is placed in `dist/spineseg/browser/`.

---

## Deployment

The frontend is deployed on **Firebase Hosting**. To redeploy:

```bash
pnpm build
firebase deploy
```

Live URL: `https://spineseg-a1a25.web.app`

---

## Linting & Formatting

```bash
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)
pnpm check         # Prettier check + ESLint
```

---

## Path Aliases

Configured in `tsconfig.json`:

| Alias | Path |
|---|---|
| `@components/*` | `src/app/components/*` |
| `@services/*` | `src/app/services/*` |
| `@interfaces/*` | `src/app/interfaces/*` |
| `@pages/*` | `src/app/pages/*` |
| `@constants/*` | `src/app/constants/*` |
| `@environments/*` | `src/environments/*` |

---

*SpineSeg — Graduation Project, Computer Vision & Deep Learning*
