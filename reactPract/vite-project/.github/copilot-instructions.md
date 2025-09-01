# Copilot Instructions for This Codebase

## Project Overview
- This is a React application bootstrapped with Vite. The structure is modular, with each feature/page in its own directory under `src/components/`.
- State management is handled via a custom global state context (`src/globalState/StateContex.jsx`) and reducer pattern (see `src/globalState/reducers/`).
- The app uses functional components and React hooks throughout.

## Key Architectural Patterns
- **Global State:**
  - Use `useGlobalState()` from `StateContex.jsx` to access and mutate global state.
  - Actions are dispatched via the `actions` object returned from `useGlobalState()`.
  - Reducers (e.g., `profilePageReducer.js`) handle state transitions. Action types and payloads are defined in these files.
- **Component Structure:**
  - Pages and major UI sections are in `src/components/FeaturePage/` directories (e.g., `ProfilePage`, `DialogsPage`).
  - Reusable UI elements are in their respective feature folders or at the root of `components/`.
- **Data Flow:**
  - User input updates state via dispatched actions (e.g., typing in a post input dispatches `changePostDraft`).
  - State changes trigger re-renders of components that consume the relevant state.

## Developer Workflows
- **Start Dev Server:**
  - `npm run dev` (Vite hot-reloads changes)
- **Build for Production:**
  - `npm run build`
- **Lint:**
  - `npm run lint` (uses ESLint, config in `eslint.config.js`)

## Project-Specific Conventions
- **State Drafts:**
  - Draft values (e.g., `myPostsArrDraft`) are kept in state and cleared on submit.
- **Action Naming:**
  - Action types are camelCase (e.g., `addPost`, `changePostDraft`).
- **Reducers:**
  - Reducers are pure functions, always return new state objects (never mutate state directly).
- **Component Imports:**
  - Use relative imports for components and assets.

## Integration Points
- **No external state libraries** (e.g., Redux) are used; all state is managed via context and reducers.
- **Vite plugins** are configured in `vite.config.js`.

## Examples
- To add a new global state action:
  1. Add a case in the relevant reducer (e.g., `profilePageReducer.js`).
  2. Update the `actions` in `StateContex.jsx` to dispatch the new action.
  3. Use the action via `actions.<yourAction>()` in components.

- To add a new page/feature:
  1. Create a new folder in `src/components/`.
  2. Add your components and connect to global state as needed.

## Key Files
- `src/globalState/StateContex.jsx` — global state provider and context
- `src/globalState/reducers/` — all reducers for state slices
- `src/components/` — main UI and feature components
- `vite.config.js`, `eslint.config.js` — build and lint config

---

If you are unsure about a pattern, check for similar usage in the relevant `src/components/` or `src/globalState/` files.
