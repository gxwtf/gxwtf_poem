// 作者预览组件

"use client"

import { useState, useContext } from "react"
import { Meta } from "./meta"
import { Section, SectionHeading, SectionContent, TinySection } from "../section";
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
            <Meta name={name} avatar={avatar ? avatar : `https://gxwtf.cn/gytb.png`} dynasty={dynasty} />

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
