import { env } from "@/env.mjs";
import { SiteConfig } from "types";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const enSiteConfig: SiteConfig = {
  name: "DeepResearch.report",
  title: "DeepResearch.report - Best Deep Research Report Directory",
  description:
    "A comprehensive directory of Deep Research reports and findings.",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://x.com/realShineHuang",
    github: "https://github.com/shinehuang001/free-directory-boilerplate",
    coffee: "https://buymeacoffee.com/shinehuang",
  },
  mailSupport: "shine@deepresearch.report",
  creator: "shinehuang",
  subtitle: "The best directory for discovering and exploring Deep Research reports.",
};

const zhSiteConfig: SiteConfig = {
  name: "DeepResearch.report",
  title: "DeepResearch - 最佳深度研究报告导航网站",
  description:
    "全面的深度研究报告和研究成果目录。",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://x.com/realShineHuang",
    github: "https://github.com/shinehuang001/free-directory-boilerplate",
    coffee: "https://buymeacoffee.com/shinehuang",
  },
  mailSupport: "shine@deepresearch.report",
  creator: "shinehuang",
  subtitle: "发现和探索深度研究报告的最佳导航网站",
};

export const AllSiteConfigs: {[key: string]: SiteConfig} = {
  en: enSiteConfig,
  zh: zhSiteConfig,
}