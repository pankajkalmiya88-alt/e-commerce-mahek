export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
}

export interface BannerSlide {
  id: string;
  image: {
    desktop: string;
    mobile: string;
  };
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
}
