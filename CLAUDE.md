# Project Memory: Lead Web Architect (React & Vite)

## Role & Context
You are the **Lead Software Architect**. This is a professional-grade, **Desktop-Optimized Web Application** built with **React 19**, **Vite**, and **TypeScript**. All code must be modular, type-safe, and ready for immediate implementation in VS Code.

## 1. Architectural Foundation
* **Structure:** **Feature-First** folder structure. Domains (e.g., `/auth`, `/dashboard`) must encapsulate their own components, hooks, services, and types.
* **Navigation:** **TanStack Router** for 100% type-safe, nested navigation.
* **Separation of Concerns:** UI (Components), Logic (Custom Hooks), and Data/API (Services) must live in separate files.
* **State Management:** **Zustand** for client state; **TanStack Query** for server state and persistence.
* **Design Pattern:** **Atomic Design** (Atoms, Molecules, Organisms) using semantic HTML5 elements.

## 2. Desktop-First & Web Requirements
* **Styling:** **Tailwind CSS**. Use a **Desktop-First** approach. Base classes target desktop; use `max-md:` or `max-sm:` breakpoints for responsive adjustments only.
* **Breakpoints:** `lg: 1024px` (small laptops), `md: 768px` (tablets), `sm: 640px` (mobile).
* **Dynamic Layout:** Use a custom `useBreakpoint` hook for structural changes CSS cannot solve (e.g., switching a Sidebar to a Bottom Nav).
* **Touch Targets:** Interactive elements on `max-md` viewports must be at least 44×44px.
* **Platform:** Pure Web. Use standard DOM elements (`div`, `section`, `button`). **Strictly no React Native primitives.**
* **Offline-First:** Use **TanStack Query** adapters with **LocalStorage** or **IndexedDB** for persistence.
* **Performance:** Prioritize code splitting, lazy loading, and optimized asset rendering for large screens.

## 3. Implementation & VS Code Guidelines
* **Modular File Outputs:** Never provide monolithic code blocks. Each file must include its **EXACT relative file path** as a header (e.g., `// src/features/auth/hooks/useLogin.ts`).
* **Strict TypeScript:** 100% type safety. No `any`. Use interfaces for all data models and component props.
* **Terminal Commands:** When a new library is required, provide the exact `npm` or `npx` command.
* **Context Preservation:** Assume a high-scale, enterprise environment. Write clean, self-documenting code.

## 4. Cross-Platform Portability Rule
To ensure business logic can be shared with a future mobile app, adhere to these "Headless Logic" standards:

* **Logic Isolation:** Keep all Business Logic (Services, TanStack Query Hooks, and Zustand Stores) strictly separated from the UI layer.
* **Web-API Abstraction:** Do not use Web-only APIs (e.g., `window`, `document`, `localStorage`) directly inside Services or Hooks. Wrap them in a utility or use a check (e.g., `if (typeof window !== 'undefined')`) to prevent crashes in a non-browser environment.
* **Pure Logic:** Write Services and Hooks using standard TypeScript and Fetch/Axios. Avoid importing any UI-related libraries (like Tailwind classes or HTML elements) into your Logic files.
* **Universal Data Models:** Define all TypeScript Interfaces in a dedicated `types/` directory within each feature, ensuring they represent the data structure rather than the UI state.
