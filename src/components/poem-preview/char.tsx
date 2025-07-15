// 古诗文汉字组件

"use client"

import { useState, useRef, useContext, useEffect, memo } from "react";
import CharNote from "./char-note";
import { MemorizeContext } from "./memorize-context";

export type CharData = {
    char: string
    pinyin?: string
    note?: { title: string; content: string }[]
    frequency?: number
}

enum CharMode{
    Read = 0,
    Memorize = 1,
    ShowAnswer = 2
};

export function Char({
    data,
    showPinyin,
    highlight,
    suppressNote,
    showNotes
}: {
    data: CharData
    showPinyin: boolean
    highlight: boolean
    suppressNote?: (suppress: boolean) => void
    showNotes: boolean
}) {
    const [showNote, setShowNote] = useState(false);
    const hoverTimer = useRef<number | null>(null);
    const { memorize } = useContext(MemorizeContext);
    const [ memorizeMode, setMemorizeMode ] = useState(CharMode.Read);

    useEffect(() => {
        if ("。，、；：？！“”‘’（）【】《》…—·～".includes(data.char))setMemorizeMode(CharMode.Read);
        else if (!isNaN(memorize))setMemorizeMode(Math.random() < memorize ? CharMode.Memorize : CharMode.Read);
        else setMemorizeMode(CharMode.Read);
    }, [memorize]);

    // useEffect(() => {
    //     console.log('ShowNotes:', showNotes);
    // }, [showNotes]);

    const clearHoverTimer = () => {
        if (hoverTimer.current !== null) {
            clearTimeout(hoverTimer.current);
            hoverTimer.current = null;
        }
    };

    const handleMouseEnter = () => {
        if (!showNotes) return; // 新增：隐藏注释时不触发
        clearHoverTimer();
        setShowNote(true);
        suppressNote?.(true);
    };

    const handleMouseLeave = () => {
        if (!showNotes) return; // 新增：隐藏注释时不触发
        clearHoverTimer();
        hoverTimer.current = window.setTimeout(() => {
            setShowNote(false);
            suppressNote?.(false);
        }, 200);
    };

    function handleClick() {
        if (memorizeMode === CharMode.Memorize)
            setMemorizeMode(CharMode.ShowAnswer);
    }

    if (memorizeMode !== CharMode.Memorize) return (
        <div
            className={`inline-block justify-center ${memorizeMode === CharMode.Read ? "text-black" : null} pr-1 ${highlight ? "bg-yellow-100" : ""} relative`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="inline-flex flex-col items-center min-w-[1.5em] cursor-pointer">
                {showPinyin && (
                    <span className="text-base text-gray-500 leading-none">{data.pinyin || ""}</span>
                )}
                <span>
                    {data.note && showNotes ? <strong>{data.char}</strong> : data.char}
                </span>
            </span>

            {showNote && data.note && showNotes ? (
                <div
                    className="absolute z-10 left-1/2 -translate-x-1/2 mt-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CharNote char={data.char} pinyin={data.pinyin} note={data.note} frequency={data.frequency} />
                </div>
            ) : null}
        </div>
    );
    
    return (
        <div
            className={`inline-block justify-center text-black pr-1 ${highlight ? "bg-yellow-100" : ""} relative`}
            onClick={handleClick}
        >
            <span className="inline-flex flex-col items-center min-w-[1.5em] cursor-pointer">
                {showPinyin && (
                    <span className="text-base text-gray-500 leading-none">{data.pinyin || ""}</span>
                )}
                <span>
                    __
                </span>
            </span>

            {showNote && data.note && (
                <div
                    className="absolute z-10 left-1/2 -translate-x-1/2 mt-2"
                >
                    <CharNote char={data.char} pinyin={data.pinyin} note={data.note} frequency={data.frequency} />
                </div>
            )}
        </div>
    )
}