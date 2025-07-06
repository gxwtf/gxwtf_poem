"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
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
  chars: PoemCharData[]
  notes?: NoteBlock[]
}

export interface PoemPreviewProps {
  title: string
  author: string
  dynasty?: string
  mode: "poem" | "paragraph"
  lines: PoemLineData[]
  translations?: string[]
}

export function PoemPreview({
  title,
  author,
  dynasty,
  mode,
  lines,
  translations,
}: PoemPreviewProps) {
  const [showPinyin, setShowPinyin] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-2">
        <div className="text-3xl font-bold text-[#a31f24]">{title}</div>
        <div className="mt-1 text-lg text-gray-700">
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
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="mb-2">
            <PoemLine
              line={line}
              showPinyin={showPinyin}
            />
            {showTranslation && translations?.[lineIdx] && (
              <div className="text-base text-gray-500 mt-1">
                {translations[lineIdx]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PoemLine({
  line,
  showPinyin,
}: {
  line: PoemLineData
  showPinyin: boolean
}) {
  const { chars, notes } = line
  const result: React.ReactNode[] = []
  let i = 0
  while (i < chars.length) {
    const note = notes?.find(n => n.start === i)
    if (note) {
      result.push(
        <NotePopover key={i} note={note.note}>
          {Array.from({ length: note.length }).map((_, j) => (
            <div key={i + j}>
              <PoemChar
                data={chars[i + j]}
                showPinyin={showPinyin}
              />
            </div>
          ))}
        </NotePopover>
      )
      i += note.length
    } else {
      result.push(
        <div key={i}>
          <PoemChar
            data={chars[i]}
            showPinyin={showPinyin}
          />
        </div>
      )
      i++
    }
  }

  return (
    <div className="flex justify-center gap-1">
      {result}
    </div>
  )
}

function PoemChar({
  data,
  showPinyin,
}: {
  data: PoemCharData
  showPinyin: boolean
}) {
  // 所有字符都用inline-flex包裹，保证对齐
  return (
    <span className="inline-flex flex-col items-center mx-0.5 min-w-[1.5em]">
      {showPinyin && (
        <span className="text-xs text-gray-500 mb-0.5 leading-none">{data.pinyin || ""}</span>
      )}
      <span className="text-black">
        {data.char}
      </span>
    </span>
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
        <span className="border-b border-[#a31f24] cursor-pointer hover:text-[#a31f24] flex gap-1">
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent side="top" className="text-xs max-w-xs">
        {note}
      </PopoverContent>
    </Popover>
  )
}
