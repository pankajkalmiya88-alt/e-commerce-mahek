export enum CategoryEnum {
  SAREES = "sarees",
  BANARASI_SAREES = "banarasi-sarees",
  LEHENGA = "lehenga",
  RAJPUTI_POSHAK = "rajputi-poshak",
  BRIDAL_LEHENGA = "bridal-lehenga",
}

export const CATEGORIES = [
  {
    id: CategoryEnum.BANARASI_SAREES,
    name: "Banarasi Sarees",
    slug: "banarasi-sarees",
    image: "/images/categories1.png",
  },
  {
    id: CategoryEnum.SAREES,
    name: "Sarees",
    slug: "sarees",
    image: "/images/categories2.png",
  },
  {
    id: CategoryEnum.LEHENGA,
    name: "Lehenga",
    slug: "lehenga",
    image: "/images/categories3.png",
  },
  {
    id: CategoryEnum.RAJPUTI_POSHAK,
    name: "Rajputi Poshak",
    slug: "rajputi-poshak",
    image: "/images/categories4.png",
  },
  {
    id: CategoryEnum.BRIDAL_LEHENGA,
    name: "Bridal Lehenga",
    slug: "bridal-lehenga",
    image: "/images/categories5.png",
  },
] as const;
