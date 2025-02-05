import TopicListClient from "@/components/topic-list-client";
import { COMMON_PARAMS } from "@/lib/constants";
import { GroupQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groupQuery } from "@/sanity/lib/queries";

interface ProductListLayoutProps {
    children: React.ReactNode;
    params: {
        lang: string;
        group: string;
    };
}

export default async function ProductListLayout({ children, params }: ProductListLayoutProps) {
    // console.log('ProductListLayout, params:', params);
    const { lang, group } = params;
    const queryParams = { ...COMMON_PARAMS, lang };
    // console.log('ProductListLayout, language:', lang); // language: en
    // console.log('ProductListLayout, queryParams:', queryParams); // queryParams: { defaultLocale: 'en', lang: 'en' }

    const groupQueryResult = await sanityFetch<GroupQueryResult>({
        query: groupQuery,
        params: {
            ...queryParams,
            slug: group,
        },
    });
    // console.log('ProductListLayout, groupQueryResult:', groupQueryResult);

    return (
        <div className="container">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* Left Sidebar */}
                <div className="w-full md:w-64">
                    {/* Category List */}
                    <TopicListClient lang={lang} group={groupQueryResult} />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}