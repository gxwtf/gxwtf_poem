"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
    title: string;
    url: string;
    depth: number;
    items?: TocItem[];
}

interface TableOfContentsProps {
    toc: TocItem[];
}

interface TocNodeProps {
    item: TocItem;
    level: number;
}

export function TableOfContents({ toc }: TableOfContentsProps) {
    if (!toc || toc.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h4 className="text-xl font-semibold text-foreground mb-4">目录</h4>
            <ul className="flex flex-col">
                {toc.map((item) => (
                    <TocNode
                        key={item.url}
                        item={item}
                        level={1}
                    />
                ))}
            </ul>
        </div>
    );
}

function TocNode({ item, level }: TocNodeProps) {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const hasChildren = item.items && item.items.length > 0;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetElement = document.querySelector(item.url);
        if (targetElement) {
            const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - 80,
                behavior: "smooth"
            });
        }
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <li>
            <div className="flex items-start">
                {hasChildren && (
                    <button
                        onClick={handleToggle}
                        className="mr-1 mt-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={isExpanded ? "折叠" : "展开"}
                    >
                        <svg
                            className={cn(
                                "w-3 h-3 transition-transform",
                                isExpanded && "rotate-90"
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                )}
                {!hasChildren && level > 1 && <div className="w-4" />}
                <a
                    href={item.url}
                    className={cn(
                        "text-sm transition-colors py-1 flex-1 text-primary hover:text-[var(--theme-color)]",
                        "break-words min-w-0",
                        level === 1 && "pl-0",
                        level === 2 && "pl-4",
                        level === 3 && "pl-8",
                    )}
                    onClick={handleClick}
                >
                    {item.title}
                </a>
            </div>
            {hasChildren && isExpanded && (
                <ul className="ml-2 border-l border-muted pl-2">
                    {item.items!.map((child) => (
                        <TocNode
                            key={child.url}
                            item={child}
                            level={level + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}