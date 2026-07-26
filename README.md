# React Workshop 2026

React 19 + Vite monorepo starter with pnpm, Turborepo, Storybook, TanStack Query, React Hook Form, Tailwind CSS, and shared packages.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm 10+

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` - run all development tasks through Turborepo
- `pnpm build` - build apps and packages
- `pnpm lint` - lint all workspaces
- `pnpm typecheck` - type-check all workspaces
- `pnpm storybook` - run the UI package Storybook

## Workspace

- `apps/web` - Vite React app
- `packages/ui` - shared UI components developed with Storybook
- `packages/http-client` - shared typed fetch client
- `packages/eslint-config` - shared ESLint flat configs
- `packages/tsconfig` - shared TypeScript configs

## Figma design

<https://www.figma.com/design/QFZc37IcA93Y60Zi1kbYsz/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page--Community-?node-id=0-1&p=f&t=qazEdbbLf2KnueQT-0>

## Api Mock

<https://dummyjson.com/custom-response>

## Api Example

```json
{
  "products": {
    "method": "GET",
    "file": "products.json",
    "url": "https://dummyjson.com/c/abbb-80dc-4582-8e14",
    "expiresOn": null
  },
  "productDetails": {
    "method": "GET",
    "file": "product-details.json",
    "url": "https://dummyjson.com/c/feb3-066a-4263-88a8",
    "expiresOn": null
  },
  "categories": {
    "method": "GET",
    "file": "categories.json",
    "url": "https://dummyjson.com/c/796e-8dd2-4c34-8a9c",
    "expiresOn": null
  },
  "compare": {
    "method": "GET",
    "file": "compare.json",
    "url": "https://dummyjson.com/c/ac50-924b-4fce-9002",
    "expiresOn": null
  },
  "posts": {
    "method": "GET",
    "file": "posts.json",
    "url": "https://dummyjson.com/c/5f3e-0afd-424a-a144",
    "expiresOn": null
  },
  "postDetails": {
    "method": "GET",
    "file": "post-details.json",
    "url": "https://dummyjson.com/c/0641-2273-4e42-8738",
    "expiresOn": null
  },
  "cart": {
    "method": "GET",
    "file": "cart.json",
    "url": "https://dummyjson.com/c/4758-8939-498e-a12c",
    "expiresOn": null
  },
  "cartAdd": {
    "method": "POST",
    "file": "cart-add.json",
    "url": "https://dummyjson.com/c/0bd3-1de3-4e85-92fb",
    "expiresOn": null
  },
  "cartUpdate": {
    "method": "PATCH",
    "file": "cart-update.json",
    "url": "https://dummyjson.com/c/05e7-d03f-434a-960f",
    "expiresOn": null
  },
  "cartRemove": {
    "method": "DELETE",
    "file": "cart-remove.json",
    "url": "https://dummyjson.com/c/dc1d-e752-4dc6-b4f7",
    "expiresOn": null
  },
  "checkout": {
    "method": "POST",
    "file": "checkout.json",
    "url": "https://dummyjson.com/c/2bf1-c646-4b04-b713",
    "expiresOn": null
  },
  "contact": {
    "method": "POST",
    "file": "contact.json",
    "url": "https://dummyjson.com/c/d46d-a885-4d10-afc3",
    "expiresOn": null
  }
}
```

## Passing Criteria

### Functional

- Home page
- Product detail page
- Shop page
- Cart page
- Contact page
- About page
- Checkout page

### UI

- At least **70%** visual similarity with the Figma design
- Responsive on desktop and mobile

### Code Quality

The following commands must pass:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

### Testing

- Minimum **70%** unit test coverage

### Deploy

- Deploy to Vercel or another hosting platform if needed. (option)

## Implementation Notes

The Furniro storefront is implemented in `apps/web`. The `static/*.html` pages were used
as the local reference for the Figma design, and the palette plus the Poppins type scale
are declared once as Tailwind v4 theme tokens in `packages/ui/src/styles.css`.

### Routes

| Route            | Page                  |
| ---------------- | --------------------- |
| `/`              | Home                  |
| `/shop`          | Shop                  |
| `/product/:slug` | Product detail        |
| `/cart`          | Cart                  |
| `/checkout`      | Checkout              |
| `/contact`       | Contact               |
| `/about`         | About                 |
| `*`              | Not found             |

### Structure

```txt
apps/web/src/
|-- app/            router, providers, route config
|-- layout/         header, footer, page shell
|-- components/     shared UI (banner, container, pagination, query states)
|-- features/
|   |-- products/   api, hooks, components, pure filter/badge/detail logic
|   |-- cart/       persisted Zustand store, table, totals
|   |-- checkout/   billing form, order summary, place-order mutation
|   `-- contact/    contact form and details
|-- pages/          one component per route
|-- services/       Axios client and the mock endpoint map
|-- lib/            query client factory
|-- types/          API response contracts
`-- utils/          formatting and error helpers
```

### State management

- **Server state** is owned by TanStack Query (`features/*/hooks`).
- **Cart state** is client state in a persisted Zustand store, because the mock cart
  endpoints return fixed documents and cannot hold a basket.
- **Shop filters** live in the URL, so a filtered or paginated view is shareable.
- **Form and variant state** stays local to its component.

### Mock API notes

- `productDetails` only contains products 1 and 2, while `products` lists 8. Detail pages
  for the remaining slugs are synthesised from the catalogue entry
  (`features/products/utils/product-detail.ts`) instead of returning a 404.
- The write endpoints (`checkout`, `contact`, `cart*`) answer `200` with an empty body, so
  a resolved request is treated as success and the order reference is generated locally.

### Testing

```bash
pnpm --filter @react-workshop/web test:coverage
```

158 tests cover the pure logic, the API layer, the shared components and every page.
Coverage is ~96% of statements with a 70% threshold enforced in `vitest.config.ts`.
