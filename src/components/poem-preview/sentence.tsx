"use client"

import { Char, CharData } from "./char"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type NoteBlock = {
    start: number
    end: number
    note: string
}

export type TranslationData = {
    translation: string
    highlight?: boolean
}

export type SentenceData = {
    sentence: CharData[]
    notes?: NoteBlock[]
    translation?: TranslationData
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

export function Translation({
    translation,
    highlight
}:{
    translation: string
    highlight: boolean
}){
    return (
        <div className="mt-2">
            <span className={`text-xl text-gray-500 ${highlight ? "bg-yellow-100 px-1" : ""}`}>
                {translation}
            </span>
        </div>
    );
}

export function Sentence({
    sent,
    showPinyin,
    highlight
}: {
    sent: SentenceData,
    showPinyin: boolean,
    highlight: boolean
}) {
    const { sentence, notes } = sent;
    let charList: React.ReactNode[] = [];
    for (let i = 0; i < sentence.length; i++) {
        const note = notes?.find(n => n.start == i);
        let unit: React.ReactNode;
        if (note) {
            unit = (
                <NotePopover key={i} note={note.note}>
                    {Array.from({ length: (note.end - note.start + 1) }).map((_, j) => (
                        <Char
                            key={i + j}
                            data={sentence[i + j]}
                            showPinyin={showPinyin}
                            highlight={highlight}
                        />
                    ))}
                </NotePopover>
            );
            i=note.end;
        }
        else {
            unit = (
                <Char
                    key={i}
                    data={sentence[i]}
                    showPinyin={showPinyin}
                    highlight={highlight}
                />
            );
        }
        charList.push(unit);
    }
    return (
        <span className="inline-flex text-2xl leading-10">{charList}</span>
    );
}