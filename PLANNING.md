# 616 Tutor Platform - Project Planning

## Overview

This project is a multi-app platform for connecting students with tutors through a mobile-first experience, enhanced with AI moderation and assistant capabilities. It consists of:

- **app/mobile-app/** – Cross-platform app for students and tutors (built with React Native)
- **app/backend/** – NestJS API service with Prisma ORM and Supabase PostgreSQL
- **app/admin-panel/** – Admin dashboard (built with React Admin) for managing users, messages, and platform settings

Each app lives in its own subdirectory under the root `apps/` directory.

## Folder Structure

```
/apps
├── mobile-app/       # React Native + Expo project
├── backend/          # NestJS + Prisma API server
└── admin-panel/      # React Admin dashboard
```

Other shared configurations or packages (if needed) will go into `libs/` or `shared/` later.

## Goals

- Provide real-time chat between students and tutors with AI support
- Prevent exchange of contact information in chat via AI moderation
- Support a scalable backend with modular API structure and clear data models
- Enable internal admins to manage users, settings, and flagged content easily

## Architecture Principles

- Multi-app monorepo under `apps/`
- Modular codebase: each app is self-contained with clear APIs and responsibilities
- API-first backend: REST endpoints managed by NestJS, integrated with Supabase and OpenAI
- Strict data validation using Prisma + DTOs
- AI moderation layer between user message input and broadcast (backend only)

## Tech Stack by App

### mobile-app

- **Language:** TypeScript
- **Framework:** React Native with Expo
- **UI:** Tailwind CSS + NativeWind
- **Chat:** react-native-gifted-chat
- **State:** local state, no global store for demo
- **API:** Supabase client

### backend

- **Language:** TypeScript
- **Framework:** NestJS
- **ORM:** Prisma
- **DB:** Supabase PostgreSQL
- **AI:** OpenAI GPT-4-turbo for moderation + assistant
- **Message Flow:** API receives → AI filters → store with is_valid flag → broadcast

### admin-panel

- **Language:** TypeScript
- **Framework:** React Admin
- **Data source:** REST API from backend
- **Features:** User moderation, message inspection, toggle settings, read-only chat view