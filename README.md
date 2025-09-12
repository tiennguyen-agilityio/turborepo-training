# Turborepo-training

## Overview

This document provides information about turborepo practice

## Tech stacks

### Dev tools

- [React](https://react.dev/versions#react-19)

- [React Native](https://reactnative.dev/)

- [NextJS](https://nextjs.org/)

- [Husky](https://typicode.github.io/husky/get-started.html)

- [Prettier](https://prettier.io/)

- [ESLint](https://eslint.org/)

### Programming Languages

- [TypeScript](https://www.typescriptlang.org/)

### UI Frameworks

- [Tamagui](https://tamagui.dev/)

## Timeline

- Estimated time: 7 days

## Time size

- 1 dev

## Editor

- [Visual studio code](https://code.visualstudio.com/)

## Prerequisites

Make sure you install packages with correct version below:

- [node v20.19.4](https://nodejs.org/en/download)
- [turbo v2.5.5](https://turborepo.com/docs/getting-started/installation)
- [pnpm v10.14.0](https://pnpm.io/)

## Folder structure

The root of the Monorepo contains the turborepo configuration files, and the main `package.json` which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory | What goes inside of it                               |
| :-------- | :--------------------------------------------------- |
| apps      | All backend and frontend apps                        |
| packages  | Here we keep code that we want to re-use across apps |

## Getting started

#### Step by step to run this app in your local:

| Command                                                                    | Action                                              |
| :------------------------------------------------------------------------- | :-------------------------------------------------- |
| `git clone git@gitlab.asoft-python.com:tien.nguyen/turborepo-training.git` | Download source code                                |
| `cd turborepo-training`                                                    | Move to folder                                      |
| `git checkout feature/turborepo`                                           | Move branch                                         |
| `pnpm install`                                                             | Installs dependencies                               |
| `pnpm dev:web`                                                             | Starts website local dev server at `localhost:3000` |
| `pnpm build:web`                                                           | Preview your build locally: `localhost:3000`        |
| `pnpm dev:mobile`                                                          | Starts app local dev server at: `localhost:8081`    |
| `pnpm build:mobile`                                                        | Build Android APK file                              |

> Note: Before running `pnpm dev:*` or `pnpm build:*`: create .env.local with .env.example (contact to me to get information of environment variable - Email: tien.nguyen@asnet.com.vn)
