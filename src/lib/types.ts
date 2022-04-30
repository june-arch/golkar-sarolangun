export type CardIdiom = {
    title : string;
    description : string;
    href : string;
    image : string;
};

export type NewsItem = {
    title : string;
    description : string;
    author : string;
    createdAt : string;
    image: string;
    tags: string[];
    href: string;
}

export type VideoItem = {
    path : string;
    tag : string;
}

type SubMenus = {
    subMenuName : string;
    subSubMenu : string[];
}

export type Menus = {
    menu : string;
    subMenu: SubMenus[];
}

export type NavItem = {
    'nav-items' : Menus[];
    description : string;
    'image-kita-satu': string;
}
