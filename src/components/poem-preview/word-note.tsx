"use client"

/**
 * WordNotePopover 组件用于展示句子层面中某个词语的注释内容。
 *
 * 用途：
 * - 当用户将鼠标悬停或点击句子中标注注释的词语时弹出该组件。
 * - 组件内部使用 SectionContent 渲染缩进的注释正文，格式清晰。
 * - 底部包含“广学”和“收藏”按钮，支持后续交互拓展。
 *
 * 使用方式：
 * ```tsx
 * <WordNotePopover note="古义：指君主或上级发出的命令">
 *     <span>令</span>
 * </WordNotePopover>
 * ```
 */

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionContent } from "../section"

export function WordNotePopover({
    note,
    children,
    left,
    right,
}: {
    note: string
    children: React.ReactNode
    left: boolean
    right: boolean
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <span className={
                    `relative cursor-pointer inline-flex flex-wrap items-center align-baseline pb-1
                    after:content-[''] after:absolute
                    ${left?"after:left-[1px]":"after:left-0"}
                    ${right?"after:right-[1px]":"after:right-0"}
                    after:bottom-0
                    after:h-[2px] after:bg-[var(--theme-color)]`
                }>
                    {children}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-100 max-h-80 overflow-auto border shadow-lg rounded-lg bg-background">
                <Section padding="p-2">
                    <SectionContent val={note} />
                </Section>
                <div className="p-4 text-right space-x-2">
                    <Button onClick={(e) => e.stopPropagation()}>
                        <ThumbsUp className="mr-2 h-4 w-4" /> 广学
                    </Button>
                    <Button onClick={(e) => e.stopPropagation()}>
                        <Star className="mr-2 h-4 w-4" /> 收藏
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}