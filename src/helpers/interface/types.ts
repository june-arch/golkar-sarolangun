export type CardIdiom = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export type NewsItem = {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  image: string;
  tags: string[];
  href: string;
};

export type VideoItem = {
  path: string;
  tag: string;
};

type SubSubMenus = {
  name: string;
  slug: string;
};

type SubMenus = {
  name: string;
  slug: string;
  subMenu: SubSubMenus[];
};

export type Menus = {
  name: string;
  slug: string;
  subMenu: SubMenus[];
};

export type NavItem = {
  'nav-items': Menus[];
  description: string;
  'image-kita-satu': string;
};
