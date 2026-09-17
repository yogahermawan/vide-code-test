CHECKPOINT 1 — PLAN

  - Requirement summary
    Objective: rebuild the supplied shopping-cart page into a clean React frontend that fixes responsive layout and cart logic, adds search, add-to-cart feedback, and confirmation dialogs for checkout/removal. The current workspace
    contains only index.html and Requirement.md; it is not a Git repository.

  - Mini PRD
    Goal: deliver a responsive, usable product catalog and simulated cart checkout.
    Scope: product display, debounced search, cart quantity badge, quantity controls, removal confirmation, checkout confirmation, toast notifications, loading/empty states.
    Exclusions: backend API, persistence, authentication, real images/payment processing.

  - Acceptance criteria
      1. React with functional components and hooks is used.
      2. “Add to cart” shows a notification and increments total quantity.
      3. Search filters products by name and handles no results.
      4. Repeated additions and + controls correctly increment quantities.
      5. − at quantity 1 and Remove require/lead to removal via a confirmation dialog.
      6. Checkout opens a confirmation dialog; confirming clears the cart and reports success.
      7. Layout works on mobile and desktop.

  - P0 / P1 / P2
    P0: React structure, responsive product grid/cart, cart state, quantity total, search, dialogs, notifications, and quantity bug fix.
    P1: simulated loading/error state and accessible keyboard/focus behavior.
    P2: cart persistence, product images, animations, or a state-management library—optional and not needed for this challenge.

  - Architecture
    Create a minimal Vite + React app using useState, useMemo, and a small useDebounce hook. Components: App, Header, SearchBar, ProductGrid, CartDrawer, ConfirmDialog, and Toast. Keep product data local and derive cart totals from
    state; no external state library.

  - UI/UX brief
    Header contains title, search, and cart quantity badge. Product cards have clear add actions. Cart is a responsive drawer with visible quantity controls and remove actions. Dialogs block accidental removal/checkout; toast confirms
    additions and successful checkout. Empty cart, no-search-results, loading, disabled checkout, and dialog-processing states are explicit.

  - Implementation plan
      1. Scaffold the minimal React/Vite structure and migrate static product data.
      2. Build catalog/search and responsive styling.
      3. Implement cart reducer-style state updates, derived quantities/totals, and drawer.
      4. Add confirmation dialogs and toast feedback.
      5. Run the app/build and resolve P0 blockers.
      6. After approval, verify each acceptance criterion and review the result.

    Task breakdown:
      - T1: project setup and component shell
      - T2: catalog/search UI
      - T3: cart calculations and quantity/removal behavior
      - T4: dialogs and notifications
      - T5: responsive/accessibility polish
      - T6: build and acceptance verification

  - Testing checklist
      - Add one product repeatedly; badge, line quantity, and total stay accurate.
      - Add multiple products; total quantity equals the sum of all line quantities.
      - Search exact, partial, case/whitespace, and no-result queries.
      - Increment/decrement lines; decrementing the last item requires confirmation.
      - Cancel and confirm removal; cancel and confirm checkout; verify empty-cart checkout is disabled.
      - Check desktop and mobile widths, keyboard dialog dismissal/focus, and production build.

  - Assumptions / detected scope creep
    Assumption: a simulated checkout is sufficient and product data remains local.
    Assumption: installing the minimal React/Vite dependencies is allowed at the Build checkpoint.
    OPTIONAL: local-storage persistence, network API integration, real imagery, and a third-party state library are excluded because they exceed the stated functional scope.
    Change log (plan stage): requirements were translated into P0 behavior and a component-based React architecture; no source files were changed.

  ### Recruiter Notes

  - What I did: Analyzed the supplied requirement and the legacy single-file implementation.
  - Why: The requested features map naturally to predictable client-side React state and derived cart totals.
  - Key decision: Use small local components and hooks instead of a state library to fit the challenge scope.
  - Validation: Confirmed the workspace currently has no project scaffold and is not initialized as Git.
  - Next: Build only the approved P0 React implementation.

  ### Change Notes

  - Defined a React migration path that replaces global mutable cart state with component state.
  - Classified cart behavior, search, dialogs, and notifications as P0 deliverables.
  - Kept payment, API, persistence, and asset work outside the required scope.
  - Recorded that no implementation, tests, commits, or repository changes have occurred.

  Suggested grouped commit messages (for after implementation):

  1. chore: scaffold React shopping cart application
  2. feat(catalog): add responsive product search and grid
  3. feat(cart): implement quantity-aware cart drawer and removal confirmation
  4. feat(checkout): add checkout confirmation and cart notifications
  5. style: improve responsive layout and accessible interaction states

  Please review and approve Checkpoint 1 to begin the build.