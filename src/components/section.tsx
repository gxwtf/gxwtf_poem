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
 *   <SectionTitle val="注释" />
 *   <SectionContent val="此处为注释内容" indent />
 * </Section>
 * ```
 */

import React from "react";

export const SectionTitle: React.FC<{ val: string; primaryColor?: string }> = ({ val, primaryColor = "var(--theme-color)" }) => (
    <div
        className="text-xl font-bold border-b-2 pb-1 mb-4 inline-block"
        style={{ '--tw-border-opacity': '1', '--tw-text-opacity': '1', color: primaryColor, borderColor: primaryColor } as React.CSSProperties}
    >
        {val}
    </div>
);

export const SectionContent: React.FC<{ val: string; indent?: boolean; lineHeight?: string; paragraphSpacing?: string }> = ({ val, indent = false, lineHeight = "leading-7", paragraphSpacing = "mb-4" }) => {
    const formattedContent = val.split('\n').map((paragraph, index) => (
        <p
            key={index}
            className={`text-black ${paragraphSpacing} whitespace-pre-line ${indent ? 'indent-8' : ''} ${lineHeight}`}
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

const Section: React.FC<SectionProps> = ({ children, padding = "p-6" }) => {
    return (
        <div className={`${padding} text-left`}>
            {children}
        </div>
    );
}

export { Section };