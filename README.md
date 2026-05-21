# SpineSeg

**SpineSeg** is a web-based medical imaging application for automated spine segmentation and scoliosis diagnosis. It processes X-ray images through a deep learning inference pipeline and visualizes segmentation results with per-segment diagnostics.

Live: [https://spineseg-a1a25.web.app](https://spineseg-a1a25.web.app)

## Overview

SpineSeg combines a U-Net based segmentation model with a clinical-grade Angular frontend. The app allows users to upload a spinal X-ray, run inference against a remote API, and inspect the segmentation results broken down by vertebral segment — including a scoliosis diagnosis and per-band signal statistics.

## Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | Angular 21, TypeScript                           |
| Styling  | CSS custom properties, no framework              |
| State    | Angular Signals (`signal`, `computed`, `effect`) |
| Build    | Angular CLI, pnpm                                |
| Deploy   | Firebase Hosting                                 |
| API      | FastAPI on Railway                               |
| Model    | U-Net (ONNX)                                     |

## Features

- Upload spinal X-ray images
- Client-side color mask rendering from NxM class ID matrix via offscreen canvas
- Per-segment list with visual accent indicators
- Diagnosis card with scoliosis assessment
- Stats card with signal band statistics
- Radial pulse indicator for inference status
- Responsive clinical UI with dark theme and custom design tokens

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Development server

```bash
pnpm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Build

```bash
pnpm build
```

Output is placed in `dist/spineseg/browser/`.

## Deployment

The frontend is deployed to Firebase Hosting. To redeploy:

```bash
pnpm build
firebase deploy
```

The API is deployed separately on Railway. The API URL is configured via the `environment.ts` files.

## Environment Configuration

| File                                          | Usage       |
| --------------------------------------------- | ----------- |
| `src/environments/environment.ts`             | Production  |
| `src/environments/environment.development.ts` | Development |

Set `apiUrl` in each file to point to the appropriate backend.

## Path Aliases

Configured in `tsconfig.json`:

| Alias             | Path                   |
| ----------------- | ---------------------- |
| `@components/*`   | `src/app/components/*` |
| `@services/*`     | `src/app/services/*`   |
| `@interfaces/*`   | `src/app/interfaces/*` |
| `@pages/*`        | `src/app/pages/*`      |
| `@constants/*`    | `src/app/constants/*`  |
| `@environments/*` | `src/environments/*`   |

## Linting & Formatting

```bash
pnpm lint        # ESLint (flat config)
```

Prettier is configured for consistent formatting across TS and CSS files.
