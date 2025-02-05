import { MainNavItem, NavConfig } from "@/types";

const enNavConfig: NavConfig = {
  mainNav: [
    {
      title: "Reports",
      href: "/topics/new",
      path: "/topics/",
      items: [
        {
          title: "New",
          href: "/topics/new",
          description: "Latest topics added to our platform"
        },
        {
          title: "Featured",
          href: "/topics/featured",
          description: "Our featured topics"
        }
      ]
    } as MainNavItem,
    {
      title: "About",
      href: "/about",
      path: "/about",
    } as MainNavItem,
  ],
}

const zhNavConfig: NavConfig = {
  mainNav: [
    {
      title: "报告",
      href: "/topics/new",
      path: "/topics/",
      items: [
        {
          title: "最新",
          href: "/topics/new",
          description: "最新添加的主题"
        },
        {
          title: "精选",
          href: "/topics/featured",
          description: "精选主题推荐"
        }
      ]
    } as MainNavItem,
    {
      title: "关于",
      href: "/about-zh",
      path: "/about-zh",
    } as MainNavItem,
  ],
}

export const AllNavConfigs:{[key: string]: NavConfig} = {
  en: enNavConfig,
  zh: zhNavConfig,
}