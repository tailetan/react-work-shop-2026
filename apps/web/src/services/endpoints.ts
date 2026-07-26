/**
 * DummyJSON "custom response" paths from the README. They are static
 * documents, so reads return fixed payloads and writes answer 200 with an
 * empty body.
 */
export const endpoints = {
  products: "/c/abbb-80dc-4582-8e14",
  productDetails: "/c/feb3-066a-4263-88a8",
  categories: "/c/796e-8dd2-4c34-8a9c",
  compare: "/c/ac50-924b-4fce-9002",
  posts: "/c/5f3e-0afd-424a-a144",
  postDetails: "/c/0641-2273-4e42-8738",
  cart: "/c/4758-8939-498e-a12c",
  cartAdd: "/c/0bd3-1de3-4e85-92fb",
  cartUpdate: "/c/05e7-d03f-434a-960f",
  cartRemove: "/c/dc1d-e752-4dc6-b4f7",
  checkout: "/c/2bf1-c646-4b04-b713",
  contact: "/c/d46d-a885-4d10-afc3"
} as const;

export type EndpointName = keyof typeof endpoints;
