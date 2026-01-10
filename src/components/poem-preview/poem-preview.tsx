// 古诗文预览组件

"use client"

import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Paragraph, ParagraphData } from "./paragraph";
import { Memorize } from "./memorize";
import { MemorizeContext } from "./memorize-context";
import { StarButton } from "../star";
import { usePathname } from "next/navigation";

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
    const url = decodeURI(usePathname());

    const poemParams = url.substring(url.indexOf('poem') + 5);
    const version = poemParams.substring(0,poemParams.indexOf('/'));
    const title = poemParams.substring(poemParams.indexOf('/')+1);

    return (
        <div className="flex justify-center gap-4 my-4">
            <Button variant="outline" className="text-primary" onClick={() => setShowTranslation(v => !v)}>
                {showTranslation ? "隐藏翻译" : "显示翻译"}
            </Button>
            {isNaN(memorize) ? (
                <Button variant="outline" className="text-primary" onClick={() => setShowPinyin(v => !v)}>
                    {showPinyin ? "隐藏拼音" : "显示拼音"}
                </Button>
            ) : null}
            {isNaN(memorize) ? (
                <Button variant="outline" className="text-primary" onClick={() => setShowNotes(v => !v)}>
                    {showNotes ? "隐藏注释" : "显示注释"}
                </Button>
            ) : null}
            <Memorize></Memorize>
            <StarButton version={version} title={title}></StarButton>
        </div>
    )
}

export interface PreviewData {
    mode: "poem" | "paragraph";
    preview: ParagraphData[];
}

export interface PoemPreviewProps {
    data: PreviewData;
}

export function PoemPreview({ data }: PoemPreviewProps) {
    const {
        mode,
        preview,
    } = data;
    const [showPinyin, setShowPinyin] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)
    const [showNotes, setShowNotes] = useState(true)  // 默认显示注释
    const { memorize } = useContext(MemorizeContext);

    useEffect(() => {
        console.log('XC', memorize);
        if (isNaN(memorize)) setShowNotes(true);
        else setShowNotes(false);
    }, [memorize]);

    return (
        <>
            <div className="max-w-full mx-auto">
                <ControlButtons
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    showPinyin={showPinyin}
                    setShowPinyin={setShowPinyin}
                    showNotes={showNotes}
                    setShowNotes={setShowNotes}
                />
                <div className={mode === "poem" ? "text-center" : "text-left"}>
                    {preview.map((paragraph, pIdx) => (
                        <div key={pIdx} className={mode === "paragraph" ? "my-4" : ""}>
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
        </>
    )
}
