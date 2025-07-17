"use client"

/**
 * Section 组件用于组织和包裹内容模块，提供统一的内边距和布局结构。
 *
 * 用途：
 * - 为段落、注释、卡片等内容提供包裹容器，便于统一控制内边距和排版。
 * - 默认上下左右使用 padding 为 p-6，可通过传入 padding 属性自定义。
 *
 * 示例用法：
 * ```tsx
 * <Section padding="px-6 pt-3 pb-3">
 *   <SectionHeading val="注释" level={1} />
 *   <SectionContent val="此处为注释内容" indent />
 * </Section>
 * ```
 */

import React from "react";

import { Quote } from "lucide-react";

export const SectionHeading: React.FC<{ val: string; level?: 1 | 2 | 3; primaryColor?: string }> = ({
    val,
    level = 1,
    primaryColor = "var(--theme-color)",
}) => {
    const styles = {
        1: "text-xl font-bold border-b-2 pb-1 mb-4",
        2: "text-lg font-bold border-b pb-1 mb-3",
        3: "text-base mb-2",
    };

    const style = styles[level] + " inline-block";

    return (
        <div
            className={style}
            style={
                {
                    "--tw-border-opacity": "1",
                    "--tw-text-opacity": "1",
                    color: primaryColor,
                    borderColor: level == 1 ? primaryColor : undefined,
                } as React.CSSProperties
            }
        >
            {val}
        </div>
    );
};

export const SectionContent: React.FC<{ val: string; indent?: boolean; lineHeight?: string; paragraphSpacing?: string }> = ({ val, indent = false, lineHeight = "leading-7", paragraphSpacing = "mb-4" }) => {
    const formattedContent = val.split('\n').map((paragraph, index) => (
        <p
            key={index}
            className={`text-primary ${paragraphSpacing} whitespace-pre-line ${indent ? 'indent-8' : ''} ${lineHeight}`}
        >
            {paragraph}
        </p>
    ));
    return <div className="space-y-4 text-lg">{formattedContent}</div>;
};

interface SectionProps {
    children: React.ReactNode;
    padding?: string;
}

export const Section: React.FC<SectionProps> = ({ children, padding = "p-6" }) => {
    return (
        <div className={`${padding} text-left`}>
            {children}
        </div>
    );
}

export const TinySection: React.FC<SectionProps> = ({ children, padding = "p-6" }) => {
    return (
        <div className={`${padding}`}>
        <div className="relative p-6 bg-gray-50 rounded-lg text-primary leading-relaxed 
                                  border-l-4 pl-8 border-[var(--theme-color)]">
            <Quote className="absolute top-1 left-1 text-[var(--theme-color)] w-6 h-6 opacity-80" strokeWidth={2} />
            {children}
        </div >
        </div>
    );
}