"use client"

import { useState } from "react";
import {Sentence, SentenceData, Translation} from "./sentence";

export type ParagraphData = {
    paragraph: SentenceData[]
}

export function Paragraph({
    para,
    showPinyin,
    mode
}: {
    para: ParagraphData
    showPinyin: boolean
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
        <div className={`paragraph ${mode}`}>
            <div className="original-line">
                {mode === "paragraph" && <span style={{ width: "2em", display: "inline-block" }}></span>}
                {para.paragraph.map((s, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`inline-block ${highlightId === index ? "highlight" : ""}`}
                    >
                        <Sentence sent={s} showPinyin={showPinyin} highlight={highlightId === index} />
                    </span>
                ))}
            </div>
            <div className="translation-line">
                {mode === "paragraph" && <span style={{ width: "2em", display: "inline-block" }}></span>}
                {para.paragraph.map((s, index) =>
                    s.translation ? (
                        <span
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className={`inline-block ${highlightId === index ? "highlight" : ""}`}
                        >
                            <Translation 
                                translation={s.translation.translation} 
                                highlight={highlightId === index} 
                            />
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}