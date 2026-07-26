/** Single source of truth for URLs so links and tests never drift. */
export const routes = {
  home: "/",
  shop: "/shop",
  product: (slug: string) => `/product/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  contact: "/contact",
  about: "/about"
} as const;

export const primaryNavigation = [
  { label: "Home", to: routes.home },
  { label: "Shop", to: routes.shop },
  { label: "About", to: routes.about },
  { label: "Contact", to: routes.contact }
] as const;
