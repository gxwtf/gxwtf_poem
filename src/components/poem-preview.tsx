"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Char } from "./poem-preview/char"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Meta } from "./poem-preview/meta"
import { Paragraph } from "./poem-preview/paragraph"

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
        </div>
    )
}

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

function PoemParagraph({
    paragraph,
    isHighlighted,
    showPinyin,
    showTranslation,
    onMouseEnter,
    onMouseLeave,
    mode
}: {
    paragraph: {
        sentence: PoemCharData[]
        notes?: NoteBlock[]
        translation?: string
    }[]
    isHighlighted: (sIdx: number) => boolean
    showPinyin: boolean
    showTranslation: boolean
    onMouseEnter: (sIdx: number) => void
    onMouseLeave: () => void
    mode: "poem" | "paragraph"
}) {
    const mergedLine: PoemCharData[] = paragraph.flatMap(p => p.sentence)
    const allNotes: NoteBlock[] = paragraph.flatMap(p => p.notes ?? [])
    const mergedTranslation = paragraph.map(p => p.translation).filter(Boolean).join("")

    return (
        <div>
            <div
                className={mode === "paragraph" ? "flex flex-col" : "mb-6"}
                onMouseEnter={() => onMouseEnter(0)}
                onMouseLeave={onMouseLeave}
            >
                <PoemLine
                    line={{ sentence: mergedLine, notes: allNotes }}
                    showPinyin={showPinyin}
                    highlight={isHighlighted(0)}
                />
                {showTranslation && mergedTranslation && (
                    <div
                        className={
                            mode === "paragraph"
                                ? `text-sm text-gray-400 leading-tight ${
                                      isHighlighted(0) ? "bg-yellow-100 px-1" : ""
                                  }`
                                : "mt-2"
                        }
                    >
                        <span
                            className={
                                mode === "poem"
                                    ? `text-xl text-gray-500 ${
                                          isHighlighted(0) ? "bg-yellow-100 px-1" : ""
                                      }`
                                    : ""
                            }
                        >
                            {mergedTranslation}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
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
                        <PoemParagraph
                            paragraph={paragraph.paragraph}
                            isHighlighted={(sIdx) => highlighted?.[0] === pIdx && highlighted?.[1] === sIdx}
                            showPinyin={showPinyin}
                            showTranslation={showTranslation}
                            onMouseEnter={() => showTranslation && setHighlighted([pIdx, 0])}
                            onMouseLeave={() => setHighlighted(null)}
                            mode={mode}
                        />
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
