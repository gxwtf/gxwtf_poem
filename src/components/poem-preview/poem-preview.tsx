// 古诗文预览组件

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Meta } from "./meta"
import { Paragraph, ParagraphData } from "./paragraph";
import { Section, SectionTitle, SectionContent } from "../section";
import { Memorize } from "./memorize"; 
import { MemorizeContextProvider } from "./memorize-context";

function ControlButtons({
    showTranslation,
    setShowTranslation,
    showPinyin,
    setShowPinyin,
}: {
    showTranslation: boolean
    setShowTranslation: React.Dispatch<React.SetStateAction<boolean>>
    showPinyin: boolean
    setShowPinyin: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <div className="flex justify-center gap-4 my-4">
            <Button variant="outline" onClick={() => setShowTranslation(v => !v)}>
                {showTranslation ? "隐藏翻译" : "显示翻译"}
            </Button>
            <Button variant="outline" onClick={() => setShowPinyin(v => !v)}>
                {showPinyin ? "隐藏拼音" : "显示拼音"}
            </Button>
            <Memorize></Memorize>
        </div>
    )
}

export interface PoemPreviewProps {
    title: string
    author: string
    dynasty?: string
    mode: "poem" | "paragraph"
    content: ParagraphData[]
    background?: string
    appreciation?: string
}

export function PoemPreview({
    title,
    author,
    dynasty,
    mode,
    content,
    background,
    appreciation,
}: PoemPreviewProps) {
    const [showPinyin, setShowPinyin] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)
    
    return (
        <MemorizeContextProvider>
            <div className="max-w-3xl mx-auto py-8">
                <Meta title={title} author={author} dynasty={dynasty} />
                <ControlButtons
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    showPinyin={showPinyin}
                    setShowPinyin={setShowPinyin}
                />
                <div className={mode === "poem" ? "text-center" : "text-left"}>
                    {content.map((paragraph, pIdx) => (
                        <div key={pIdx} className={mode === "paragraph" ? "mt-8" : ""}>
                            <Paragraph
                                para={paragraph}
                                showPinyin={showPinyin}
                                showTranslation={showTranslation}
                                mode={mode}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Section>
                <SectionTitle val="写作背景" />
                <SectionContent val={background || "暂无相关背景信息"} indent />
            </Section>
            <Section>
                <SectionTitle val="内容赏析" />
                <SectionContent val={appreciation || "暂无相关背景信息"} indent />
            </Section>
        </MemorizeContextProvider>
    )
}
