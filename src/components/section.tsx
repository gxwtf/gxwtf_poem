// section 组件

import React from "react";

export const SectionTitle: React.FC<{ val: string; primaryColor?: string }> = ({ val, primaryColor = "var(--primary-color)" }) => (
    <div
        className="text-xl font-bold border-b-2 pb-1 mb-4 inline-block"
        style={{ '--tw-border-opacity': '1', '--tw-text-opacity': '1', color: primaryColor, borderColor: primaryColor } as React.CSSProperties}
    >
        {val}
    </div>
);

export const SectionContent: React.FC<{ val: string; indent?: boolean }> = ({ val, indent = false }) => {
    const formattedContent = val.split('\n').map((paragraph, index) => (
        <p
            key={index}
            className={`text-black mb-4 whitespace-pre-line ${indent ? 'indent-8' : ''}`}
        >
            {paragraph}
        </p>
    ));
    return <div className="space-y-4 text-lg">{formattedContent}</div>;
};

interface SectionProps {
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <div className="p-6 text-left">
            {children}
        </div>
    );
}

export { Section };