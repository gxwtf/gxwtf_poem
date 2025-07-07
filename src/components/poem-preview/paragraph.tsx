"use client"

import { useState } from "react";
import {Sentence, SentenceData, Translation} from "./sentence";

export type ParagraphData = {
    paragraph: SentenceData[]
}

export function Paragraph({
    para,
    showPinyin,
    showTranslation,
    mode
}: {
    para: ParagraphData
    showPinyin: boolean
    showTranslation: boolean
    mode: "poem" | "paragraph"
}) {
    const [highlightId, setHighlightId] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHighlightId(id);
    };

    const handleMouseLeave = () => {
        setHighlightId(null);
    };

    return (
        <div>
            <div className="sentences">
                {mode === "paragraph" && <span style={{ width: "3em", display: "inline-block" }}></span>}
                {para.paragraph.map((s, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => showTranslation && handleMouseEnter(index)}
                        onMouseLeave={() => showTranslation && handleMouseLeave()}
                        className={`inline ${highlightId === index ? "highlight" : ""}`}
                    >
                        <Sentence sent={s} showPinyin={showPinyin} highlight={highlightId === index} />
                    </span>
                ))}
            </div>
            {showTranslation && (
                <div className="translations">
                    {mode === "paragraph" && <span style={{ width: "2em", display: "inline-block" }}></span>}
                    {para.paragraph.map((s, index) =>
                        s.translation ? (
                            <span
                                key={index}
                                onMouseEnter={() => showTranslation && handleMouseEnter(index)}
                                onMouseLeave={() => showTranslation && handleMouseLeave()}
                                style={{ display: "inline" }}
                                className={highlightId === index ? "highlight" : ""}
                            >
                                <Translation 
                                    translation={s.translation.translation} 
                                    highlight={highlightId === index} 
                                />
                            </span>
                        ) : null
                    )}
                </div>
            )}
        </div>
    );
}