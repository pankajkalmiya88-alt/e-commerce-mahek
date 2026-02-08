export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  CATEGORY: (slug: string) => `/category/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  SALE: "/sale",
  TRENDING: "/trending",
  TRACK_ORDER: "/track-order",
  ABOUT: "/about",
  HELP: "/help",
  LOGIN: "/login",
  SIGNUP: "/signup",
} as const;

export const CATEGORY_ROUTES = {
  SAREES: "/category/sarees",
  BANARASI_SAREES: "/category/banarasi-sarees",
  LEHENGA: "/category/lehenga",
  RAJPUTI_POSHAK: "/category/rajputi-poshak",
  BRIDAL_LEHENGA: "/category/bridal-lehenga",
} as const;
