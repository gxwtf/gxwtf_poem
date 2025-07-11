// 古诗文汉字组件

"use client"

import { useState, useRef } from "react";
import CharNote from "./char-note";

export type CharData = {
    char: string
    pinyin?: string
    note?: { title: string; content: string }[]
    frequency?: number
}

export function Char({
    data,
    showPinyin,
    highlight,
    suppressNote
}: {
    data: CharData
    showPinyin: boolean
    highlight: boolean
    suppressNote?: (suppress: boolean) => void
}) {
    const [showNote, setShowNote] = useState(false);
    const hoverTimer = useRef<number | null>(null);

    const clearHoverTimer = () => {
        if (hoverTimer.current !== null) {
            clearTimeout(hoverTimer.current);
            hoverTimer.current = null;
        }
    };

    const handleMouseEnter = () => {
        clearHoverTimer();
        setShowNote(true);
        suppressNote?.(true);
    };

    const handleMouseLeave = () => {
        clearHoverTimer();
        hoverTimer.current = window.setTimeout(() => {
            setShowNote(false);
            suppressNote?.(false);
        }, 200);
    };

    return (
        <div
            className={`inline-block justify-center text-black pr-1 ${highlight ? "bg-yellow-100" : ""} relative`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="inline-flex flex-col items-center min-w-[1.5em] cursor-pointer">
                {showPinyin && (
                    <span className="text-base text-gray-500 leading-none">{data.pinyin || ""}</span>
                )}
                <span>
                    {data.note ? <strong>{data.char}</strong> : data.char}
                </span>
            </span>

            {showNote && data.note && (
                <div
                    className="absolute z-10 left-1/2 -translate-x-1/2 mt-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CharNote char={data.char} pinyin={data.pinyin} note={data.note} frequency={data.frequency} />
                </div>
            )}
        </div>
    );
}