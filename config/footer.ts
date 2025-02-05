import { SidebarNavItem } from "@/types";

const enFooterConfig: SidebarNavItem[] = [
    {
        title: "PRODUCT",
        items: [],
    },
    {
        title: "FEATURES",
        items: [],
    },
    {
        title: "LINKS",
        items: [],
    },
];

const zhFooterConfig: SidebarNavItem[] = [
    {
        title: "产品",
        items: [],
    },
    {
        title: "特性",
        items: [],
    },
    {
        title: "链接",
        items: [],
    },
];

export const AllFooterConfigs:{[key: string]: SidebarNavItem[]} = {
    en: enFooterConfig,
    zh: zhFooterConfig,
}