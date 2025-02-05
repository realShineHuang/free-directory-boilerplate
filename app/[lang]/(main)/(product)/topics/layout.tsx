import { Suspense } from "react";
import { FeaturePageHeader } from "@/components/feature-page-header";
import TopicGroupListClient from "@/components/topic-group-list-client";
import { AllProductConfigs } from "@/config/product";
import { COMMON_PARAMS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/session";
import { GroupListWithCategoryQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groupListWithCategoryQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

interface ProductListLayoutProps {
    children: React.ReactNode;
    params: { lang: string };
}

export default async function ProductListLayout({ children, params }: ProductListLayoutProps) {
    // console.log('ProductListLayout, params:', params);
    const { lang } = params;
    const queryParams = { ...COMMON_PARAMS, lang };
    // console.log('ProductListLayout, language:', lang); // language: en
    // console.log('ProductListLayout, queryParams:', queryParams); // queryParams: { defaultLocale: 'en', lang: 'en' }

    const user = await getCurrentUser();
    const productConfig = AllProductConfigs[lang];

    const groupListQueryResult = await sanityFetch<GroupListWithCategoryQueryResult>({
        query: groupListWithCategoryQuery,
        params: queryParams,
    });
    // console.log('ProductListLayout, groupListQueryResult:', groupListQueryResult);
    if (!groupListQueryResult) {
        console.error('ProductListLayout, groupListQueryResult is null');
        return notFound();
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Page Header */}
            <div className="bg-linear py-10">
                <FeaturePageHeader className="container"
                    heading={productConfig.title}
                    text={productConfig.subtitle}>
                </FeaturePageHeader>
            </div>

            <div className="container mt-8 grid md:grid-cols-12 md:gap-8">
                {/* Left Sidebar */}
                <div className="w-full md:w-64">
                    {/* Group List */}
                    <TopicGroupListClient lang={lang} itemList={groupListQueryResult} />
                </div>

                {/* Main Content */}
                <div className="md:col-span-10">
                    <Suspense>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}