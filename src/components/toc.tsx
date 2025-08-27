"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        window.history.pushState(null, '', window.location.pathname);
    };

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
            <button
                onClick={scrollToTop}
                className="flex text-muted-foreground items-center text-sm hover:text-[var(--theme-color)] mt-4"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
                回到顶部
            </button>
        </div>
    );
}

function TocNode({ item, level }: TocNodeProps) {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const hasChildren = item.items && item.items.length > 0;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetElement = document.getElementById(item.url.slice(1));
        if (targetElement) {
            const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - 80,
                behavior: "smooth"
            });
            window.history.pushState(null, '', item.url);
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
                <Link
                    href={item.url}
                    className={cn(
                        "text-sm transition-colors py-1 flex-1 text-primary hover:text-[var(--theme-color)]",
                        "break-words min-w-0 truncate",
                        "whitespace-nowrap overflow-hidden" 
                    )}
                    onClick={handleClick}
                    title={item.title}
                >
                    {item.title}
                </Link>
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