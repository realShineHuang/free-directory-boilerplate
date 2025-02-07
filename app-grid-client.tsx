import { AllApplicationConfigs } from "@/config/application";
import { AllProductConfigs } from "@/config/product";
import { ApplicationListOfRecentQueryResult } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";

interface AppGridClientProps {
  lang: string;
  itemList: ApplicationListOfRecentQueryResult;
}

export function AppGridClient({ lang, itemList }: AppGridClientProps) {
  const appConfig = AllApplicationConfigs[lang];
  const productConfig = AllProductConfigs[lang];
// ... existing code ...
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {productConfig.free}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {productConfig.opensource}
                    </Badge>
                  </div>
// ... existing code ...
} 