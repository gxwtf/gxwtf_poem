// 作者介绍页面
import { notFound } from 'next/navigation'
import {SiteHeader} from "@/components/site-header";
import React from "react";

interface Params {
    params: {
        author: string;
    };
}

export async function generateMetadata({ params }: Params) {
    const { author } = await params;
    const Author = decodeURIComponent(author);
    return {
        title: `作者介绍 - ${Author}`,
        description: '作者介绍页面',
    };
}

export default async function Page({ params }: Params) {
    const { author } = await params;
    const Author = decodeURIComponent(author);
    try {
        const { default: PreviewMDX } = await import(
            `@/author/${Author}/intro.mdx`
        );

        return (
            <>
                <SiteHeader data={[{name: "作者", href: "/authors"}]} now={Author} />
                <div className="p-8">
                    <PreviewMDX />
                </div>
            </>
        );
    } catch (error) {
        console.error('MDX文件加载失败:', error);
        notFound();
    }
}
