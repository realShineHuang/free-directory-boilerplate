'use client';

import { formatDate } from '@/lib/utils';
import { ApplicationListByCategoryQueryResult, ApplicationListOfFeaturedQueryResult, ApplicationListOfRecentQueryResult } from '@/sanity.types';
import { urlForImageWithSize } from '@/sanity/lib/utils';
import Image from "next/image";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowUpRightFromCircleIcon, ArrowUpRightFromSquareIcon, ArrowUpRightIcon, ExternalLinkIcon } from 'lucide-react';
import { AllApplicationConfigs } from '@/config/application';

type ApplicationListQueryResult = ApplicationListByCategoryQueryResult | ApplicationListOfFeaturedQueryResult | ApplicationListOfRecentQueryResult;;

interface AppGridClientProps {
  lang: string;
  itemList: any;
}

export default function AppGridClient({ lang, itemList }: AppGridClientProps) {
  const applicationConfig = AllApplicationConfigs[lang];

  return (
    <>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {itemList.map((item) => {
          const coverImageUrl = urlForImageWithSize(item.coverImage, 960, 540);
          if (!coverImageUrl) {
            console.warn('AppGridClient, no cover image for ', item.name);
          }
          return coverImageUrl && (
            <div key={item._id}
              className="group cursor-pointer overflow-hidden rounded-lg border
                transition-all hover:bg-accent md:scale-100 md:hover:scale-105">
              <Link href={`/${lang}/app/${item.slug}`}>
                <div className="item-bg-linear rounded-t-lg px-4 pt-4">
                  <Image width={480} height={270}
                    alt={item.name ?? ""}
                    className="rounded-t-lg w-full"
                    src={coverImageUrl} />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-bold font-heading line-clamp-1">{item.name}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground my-2 line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </Link>

              {
                (item.price === 'Free' || item.github) &&
                <div className="flex px-4 pb-4 gap-2">
                  {
                    item.price === 'Free' &&
                    <Badge variant="outline" className="text-xs py-1 px-3
                        text-primary dark:text-foreground/80
                        hover:border-transparent dark:hover:border-transparent
                        hover:bg-primary hover:text-primary-foreground dark:hover:text-primary-foreground
                        dark:hover:bg-primary-800 dark:border-primary-foreground/20">
                      {applicationConfig.free}
                    </Badge>
                  }
                  {
                    item.github &&
                    <Badge variant="outline" className="text-xs py-1 px-3
                        text-primary dark:text-foreground/80
                        hover:border-transparent dark:hover:border-transparent
                        hover:bg-primary hover:text-primary-foreground dark:hover:text-primary-foreground
                        dark:hover:bg-primary-800 dark:border-primary-foreground/20">
                      {applicationConfig.opensource}
                    </Badge>
                  }
                </div>
              }
            </div>
          )
        })}
      </div>
    </>
  )
}
