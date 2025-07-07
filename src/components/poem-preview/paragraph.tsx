"use client"

import { useState } from "react";
import {Sentence,SentenceData} from "./sentence";

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
                {para.sentences.map((s) => (
                    <span
                        key={s.id}
                        onMouseEnter={() => handleMouseEnter(s.id)}
                        onMouseLeave={handleMouseLeave}
                        className={highlightId === s.id ? "highlight" : ""}
                    >
                        <Sentence sent={s} showPinyin={showPinyin} highlight={highlightId === s.id} />
                    </span>
                ))}
            </div>
            <div className="translation-line">
                {mode === "paragraph" && <span style={{ width: "2em", display: "inline-block" }}></span>}
                {para.sentences.map((s) =>
                    s.translation ? (
                        <span
                            key={s.id}
                            onMouseEnter={() => handleMouseEnter(s.id)}
                            onMouseLeave={handleMouseLeave}
                            className={highlightId === s.id ? "highlight" : ""}
                        >
                            {s.translation.translation}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}