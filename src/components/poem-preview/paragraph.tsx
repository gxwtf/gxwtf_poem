"use client"

import { useState } from "react";
import {Sentence, SentenceData} from "./sentence";

export type ParagraphData = {
    sentences: SentenceData[]
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
                {para.sentences.map((s, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={highlightId === index ? "highlight" : ""}
                    >
                        <Sentence sent={s} showPinyin={showPinyin} highlight={highlightId === index} />
                    </span>
                ))}
            </div>
            <div className="translation-line">
                {mode === "paragraph" && <span style={{ width: "2em", display: "inline-block" }}></span>}
                {para.sentences.map((s, index) =>
                    s.translation ? (
                        <span
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className={highlightId === index ? "highlight" : ""}
                        >
                            {s.translation.translation}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}