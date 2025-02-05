import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGridClient from "@/components/product-grid-client";
import TopicListClient from "@/components/topic-list-client";
import { COMMON_PARAMS } from "@/lib/constants";
import { enSiteConfig as siteConfig } from "@/config/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoryQuery, productListByCategoryQuery } from "@/sanity/lib/queries";
import { CategoryQueryResult, GroupQueryResult, ProductListByCategoryQueryResult } from "@/sanity.types";

interface TopicPageProps {
    params: {
        lang: string;
        group: string;
        category: string;
    };
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { lang, group, category } = params;
    const queryParams = { ...COMMON_PARAMS, lang, group, category };

    const categoryQueryResult = await sanityFetch<CategoryQueryResult>({
        query: categoryQuery,
        params: queryParams,
    });

    if (!categoryQueryResult) {
        return {};
    }

    const currentUrl = `${siteConfig.url}/${lang}/topics/${group}/category/${category}`;
    const canonicalUrl = `${siteConfig.url}/en/topics/${group}/category/${category}`;

    return {
        title: categoryQueryResult.name,
        description: siteConfig.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: categoryQueryResult.name,
            description: siteConfig.description,
            url: currentUrl,
            siteName: siteConfig.name,
            locale: lang,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: categoryQueryResult.name,
            description: siteConfig.description,
            site: siteConfig.name,
            creator: siteConfig.name,
        },
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { lang, group, category } = params;
    const queryParams = { ...COMMON_PARAMS, lang, group, category };

    const categoryQueryResult = await sanityFetch<CategoryQueryResult>({
        query: categoryQuery,
        params: queryParams,
    });

    if (!categoryQueryResult) {
        return notFound();
    }

    const productListQueryResult = await sanityFetch<ProductListByCategoryQueryResult>({
        query: productListByCategoryQuery,
        params: queryParams,
    });

    if (!productListQueryResult) {
        return notFound();
    }

    const groupQueryResult: GroupQueryResult = {
        _id: categoryQueryResult._id,
        _type: "group",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: "1",
        name: categoryQueryResult.name,
        slug: group,
        categories: [{
            _id: categoryQueryResult._id,
            _type: "category",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            _rev: "1",
            name: categoryQueryResult.name,
            slug: category,
        }],
    };

    return (
        <div className="space-y-8">
            <TopicListClient lang={lang} group={groupQueryResult} />
            <ProductGridClient lang={lang} itemList={productListQueryResult} />
        </div>
    );
}