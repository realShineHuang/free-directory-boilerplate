import { AllSiteConfigs } from "@/config/site";

interface SiteFooterInfoProps extends React.HTMLAttributes<HTMLElement> {
  lang: string;
}

export function SiteFooterInfo({ lang }: SiteFooterInfoProps) {
  // console.log('SiteFooterInfo, lang:', lang);
  const siteConfig = AllSiteConfigs[lang];

  return (
    <section>
      <div className="space-y-4">
        <div className="items-center space-x-2 flex">
          <span className="text-xl font-bold text-foreground">
            {siteConfig.name}
          </span>
        </div>

        <p className="text-muted-foreground text-md p4-4 md:pr-12 text-balance">
          {siteConfig.subtitle}
        </p>
      </div>
    </section>
  );
}