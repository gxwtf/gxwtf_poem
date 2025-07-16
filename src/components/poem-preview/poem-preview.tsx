// 古诗文预览组件

"use client"

import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Meta } from "./meta"
import { Paragraph, ParagraphData } from "./paragraph";
import { Memorize } from "./memorize"; 
import { MemorizeContext } from "./memorize-context";
import { Section, SectionHeading, SectionContent } from "../section";

function ControlButtons({
    showTranslation,
    setShowTranslation,
    showPinyin,
    setShowPinyin,
    showNotes,
    setShowNotes
}: {
    showTranslation: boolean
    setShowTranslation: React.Dispatch<React.SetStateAction<boolean>>
    showPinyin: boolean
    setShowPinyin: React.Dispatch<React.SetStateAction<boolean>>
    showNotes: boolean
    setShowNotes: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const { memorize } = useContext(MemorizeContext);

    return (
        <div className="flex justify-center gap-4 my-4">
            <Button variant="outline" onClick={() => setShowTranslation(v => !v)}>
                {showTranslation ? "隐藏翻译" : "显示翻译"}
            </Button>
            {isNaN(memorize) ? (
                <Button variant="outline" onClick={() => setShowPinyin(v => !v)}>
                    {showPinyin ? "隐藏拼音" : "显示拼音"}
                </Button>
            ) : null}
            {isNaN(memorize) ? (
                <Button variant="outline" onClick={() => setShowNotes(v => !v)}>
                    {showNotes ? "隐藏注释" : "显示注释"}
                </Button>
            ) : null}
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
    const [showNotes, setShowNotes] = useState(true)  // 默认显示注释
    const { memorize } = useContext(MemorizeContext);

    useEffect(() => {
        console.log('XC',memorize);
        if (isNaN(memorize))setShowNotes(true);
        else setShowNotes(false);
    }, [memorize]);
    
    return (
        <>
            <div className="max-w-3xl mx-auto py-8">
                <Meta title={title} author={author} dynasty={dynasty} />
                <ControlButtons
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    showPinyin={showPinyin}
                    setShowPinyin={setShowPinyin}
                    showNotes={showNotes}
                    setShowNotes={setShowNotes}
                />
                <div className={mode === "poem" ? "text-center" : "text-left"}>
                    {content.map((paragraph, pIdx) => (
                        <div key={pIdx} className={mode === "paragraph" ? "mt-8" : ""}>
                            <Paragraph
                                para={paragraph}
                                showPinyin={showPinyin}
                                showTranslation={showTranslation}
                                mode={mode}
                                showNotes={showNotes}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Section>
                <SectionHeading val="写作背景" level={1} />
                <SectionContent val={background || "暂无相关背景信息"} indent />
            </Section>
            <Section>
                <SectionHeading val="内容赏析" level={1} />
                <SectionContent val={appreciation || "暂无相关背景信息"} indent />
            </Section>
        </>
    )
}
