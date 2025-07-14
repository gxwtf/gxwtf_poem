"use client"

// 古诗文句子组件

import { Char, CharData } from "./char"
import { WordNotePopover } from "./word-note"


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

export function Translation({
    translation,
    highlight
}: {
    translation: string
    highlight: boolean
}) {
    return (
        <span className={`text-xl text-gray-500 ${highlight ? "bg-yellow-100" : ""}`}>
            {translation}
        </span>
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
            let length=note.end-note.start+1;
            unit = Array.from({ length: (note.end - note.start + 1) }).map((_, j) => (
                <WordNotePopover key={i + j} note={note.note} left={j==0} right={j==length-1}>
                    <Char
                        data={sentence[i + j]}
                        showPinyin={showPinyin}
                        highlight={highlight}
                    />
                </WordNotePopover>
            ));
            i = note.end;
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
        if (Array.isArray(unit)) {
            charList.push(...unit);
        } else {
            charList.push(unit);
        }
    }
    return (
        <span className="text-2xl leading-10">{charList}</span>
    )
}