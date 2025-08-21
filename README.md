# Turborepo-training

## Overview

This document provides information about turborepo practice

## Tech stacks

### Dev tools

- [React](https://react.dev/versions#react-19)

- [NextJS](https://nextjs.org/)

- [Husky](https://typicode.github.io/husky/get-started.html)

- [Prettier](https://prettier.io/)

- [ESLint](https://eslint.org/)

### Programming Languages

- [TypeScript](https://www.typescriptlang.org/)

### UI Frameworks

- [Clerk](https://clerk.com/)

- [Shadcn](https://v3.shadcn.com/docs/installation)

## Time size

- 1 dev

## Editor

- [Visual studio code](https://code.visualstudio.com/)

## Prerequisites

Make sure you install packages with correct version below:

- [node v20.19.4](https://nodejs.org/en/download)
- [turbo v2.5.5](https://turborepo.com/docs/getting-started/installation)
- [yarn v1.22.22](https://classic.yarnpkg.com/en/docs/install)

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

| Command                                                                    | Action                                       |
| :------------------------------------------------------------------------- | :------------------------------------------- |
| `git clone git@gitlab.asoft-python.com:tien.nguyen/turborepo-training.git` | Download source code                         |
| `cd turborepo-training`                                                    | Move to folder                               |
| `git checkout feature/turborepo`                                           | Move branch                                  |
| `yarn install`                                                             | Installs dependencies                        |
| `yarn dev`                                                                 | Starts local dev server at `localhost:3000`  |
| `yarn start`                                                               | Preview your build locally: `localhost:3000` |

> Note: Before running `yarn dev` or `yarn start`: create .env.local with .env.example (contact to me to get information of environment variable - Email: tien.nguyen@asnet.com.vn)
