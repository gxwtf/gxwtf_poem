// 作者预览组件

"use client"

import { Section, SectionHeading, TinySection } from "../section";
import { PoemTinyCard } from "../poem-card";

export interface PoemPreviewProps {
    name: string
    avatar?: string
    dynasty?: string
    content?: string
    poem?: string[]
}

export function AuthorPreview({
    name,
    avatar,
    dynasty,
    content,
    poem,
}: PoemPreviewProps) {
    return (
        <>
            <TinySection>
                {content || "暂无简介"}
            </TinySection>
            <Section>
                <SectionHeading val="课内作品" level={1} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {poem?.map((title, idx) => (
                        <PoemTinyCard key={title + idx} {...{ title }} />
                    ))}
                </div>
            </Section>
        </>
    )
}
