"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Char } from "./poem-preview/char"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export type PoemCharData = {
    char: string
    pinyin?: string
}

export type NoteBlock = {
    start: number // 起始下标
    length: number // 长度
    note: string
}

export type PoemLineData = {
    sentence: PoemCharData[]
    notes?: NoteBlock[]
}

export interface PoemPreviewProps {
    title: string
    author: string
    dynasty?: string
    mode: "poem" | "paragraph"
    content: {
        paragraph: {
            sentence: PoemCharData[]
            notes?: NoteBlock[]
            translation?: string
        }[]
    }[]
    // translations removed
}

export function PoemPreview({
    title,
    author,
    dynasty,
    mode,
    content,
}: PoemPreviewProps) {
    const [showPinyin, setShowPinyin] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)
    const [highlighted, setHighlighted] = useState<[number, number] | null>(null)

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-2">
                <div className="text-3xl font-bold poem-title">{title}</div>
                <div className="mt-6 text-lg text-gray-700">
                    {dynasty ? `【${dynasty}】` : ""}{author}
                </div>
            </div>
            <div className="flex justify-center gap-4 my-4">
                <Button variant="outline" onClick={() => setShowTranslation(v => !v)}>
                    {showTranslation ? "隐藏翻译" : "显示翻译"}
                </Button>
                <Button variant="outline" onClick={() => setShowPinyin(v => !v)}>
                    {showPinyin ? "隐藏拼音" : "显示拼音"}
                </Button>
            </div>
            <div className={mode === "poem" ? "text-center" : "text-left"}>
                {content.map((paragraph, pIdx) => (
                    <div
                        key={pIdx}
                        className={mode === "paragraph" ? "mt-8" : ""}
                    >
                        {paragraph.paragraph.map((sentence, sIdx) => {
                            const isHighlighted = highlighted?.[0] === pIdx && highlighted?.[1] === sIdx
                            if (mode === "poem") {
                                return (
                                    <div
                                        key={sIdx}
                                        className="mb-6"
                                        onMouseEnter={() => showTranslation && setHighlighted([pIdx, sIdx])}
                                        onMouseLeave={() => setHighlighted(null)}
                                    >
                                        <PoemLine
                                            line={{ sentence: sentence.sentence, notes: sentence.notes }}
                                            showPinyin={showPinyin}
                                            highlight={isHighlighted}
                                        />
                                        {showTranslation && sentence.translation && (
                                            <div className="mt-2">
                                                <span
                                                    className={`text-xl text-gray-500 ${
                                                        isHighlighted
                                                            ? "bg-yellow-100 px-1"
                                                            : ""
                                                    }`}
                                                >
                                                    {sentence.translation}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={sIdx}
                                        className="flex flex-col"
                                        onMouseEnter={() => showTranslation && setHighlighted([pIdx, sIdx])}
                                        onMouseLeave={() => setHighlighted(null)}
                                    >
                                        <PoemLine
                                            line={{ sentence: sentence.sentence, notes: sentence.notes }}
                                            showPinyin={showPinyin}
                                            highlight={isHighlighted}
                                        />
                                        {showTranslation && sentence.translation && (
                                            <div
                                                className={`text-sm text-gray-400 leading-tight ${
                                                    isHighlighted
                                                        ? "bg-yellow-100 px-1"
                                                        : ""
                                                }`}
                                            >
                                                {sentence.translation}
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

function PoemLine({
    line,
    showPinyin,
    highlight,
}: {
    line: PoemLineData
    showPinyin: boolean
    highlight: boolean
}) {
    const { sentence, notes } = line
    const result: React.ReactNode[] = []
    let i = 0
    while (i < sentence.length) {
        const note = notes?.find(n => n.start === i)
        if (note) {
            result.push(
                <NotePopover key={i} note={note.note}>
                    {Array.from({ length: note.length }).map((_, j) => (
                        <Char
                            key={i + j}
                            data={sentence[i + j]}
                            showPinyin={showPinyin}
                            highlight={highlight}
                        />
                    ))}
                </NotePopover>
            )
            i += note.length
        } else {
            result.push(
                <Char
                    key={i}
                    data={sentence[i]}
                    showPinyin={showPinyin}
                    highlight={highlight}
                />
            )
            i++
        }
    }

    return (
        <div className="flex justify-center text-2xl leading-10">
            {result}
        </div>
    )
}

function NotePopover({
    note,
    children,
}: {
    note: string
    children: React.ReactNode
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <span className="poem-note-underline cursor-pointer flex">
                    {children}
                </span>
            </PopoverTrigger>
            <PopoverContent side="top" className="text-xs max-w-xs">
                {note}
            </PopoverContent>
        </Popover>
    )
}
