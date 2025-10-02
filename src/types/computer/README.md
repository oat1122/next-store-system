# Computer Types Split

This folder replaces the previous single `types/computer.ts` with a modular structure:

- `core.ts` – core domain types (`Computer`, `ComputerImage`, `ComputerTag`, enums).
- `filters.ts` – list/query filters, pagination, sorting.
- `api.ts` – API request/response contracts.
- `forms.ts` – React form value shapes.
- `ui.ts` – UI/component prop types (Cards, Table, ViewDialog pieces).
- `index.ts` – barrel export so you can import from `@/types/computer`.

## How to migrate

1. Replace imports like:
   ```ts
   import type { Computer, ComputerPaginationProps } from "@/types/computer";
   ```
   with the same path (barrel still works):
   ```ts
   import type { Computer, ComputerPaginationProps } from "@/types/computer";
   ```

2. If you prefer explicit paths:
   - Domain: `@/types/computer/core`
   - Filters: `@/types/computer/filters`
   - API: `@/types/computer/api`
   - Forms: `@/types/computer/forms`
   - UI: `@/types/computer/ui`

3. Remove or archive the old `types/computer.ts` to avoid duplicate declarations.

