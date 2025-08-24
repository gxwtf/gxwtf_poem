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
    activeId: string;
    level: number;
    onItemClick: (url: string) => void;
}

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 只设置第一个进入视口的标题为active
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    setActiveId(intersectingEntry.target.id);
                }
            },
            { rootMargin: `0% 0% -80% 0%` }
        );

        itemIds?.forEach((id) => {
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                }
            }
        });

        return () => {
            itemIds?.forEach((id) => {
                if (id) {
                    const element = document.getElementById(id);
                    if (element) {
                        observer.unobserve(element);
                    }
                }
            });
        };
    }, [itemIds]);

    // 返回包含activeId和setActiveId的对象
    return { activeId, setActiveId };
}

export function TableOfContents({ toc }: TableOfContentsProps) {
    const itemIds = React.useMemo(
        () => [...new Set(toc ? toc.flatMap(item => [item.url, ...(item.items || []).map(i => i.url)]).flat().filter(Boolean).map(id => id?.split("#")[1]) : [])],
        [toc]
    );

    // 使用解构获取activeId和setActiveId
    const { activeId, setActiveId } = useActiveItem(itemIds.filter((id): id is string => id !== undefined));

    // 点击跳转处理
    const handleItemClick = (url: string) => {
        const targetId = url.slice(1);
        // 手动设置activeId，避免IntersectionObserver竞争条件
        setActiveId(targetId);
        
        const targetElement = document.querySelector(url);
        if (targetElement) {
            const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - 80,
                behavior: "smooth"
            });
        }
    };

    if (!toc || toc.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground mb-2">目录</h4>
            <ul className="flex flex-col space-y-0">
                {toc.map((item) => (
                    <TocNode
                        key={item.url}
                        item={item}
                        activeId={activeId || ""}
                        level={1}
                        onItemClick={handleItemClick}
                    />
                ))}
            </ul>
        </div>
    );
}

function TocNode({ item, activeId, level, onItemClick }: TocNodeProps) {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const hasChildren = item.items && item.items.length > 0;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onItemClick(item.url);
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <li className="mt-1">
            <div className="flex items-start">
                {hasChildren && (
                    <button
                        onClick={handleToggle}
                        className="mr-1 mt-1.5 text-muted-foreground hover:text-foreground transition-colors"
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
                        "text-sm transition-colors hover:text-foreground py-1 flex-1",
                        "break-words min-w-0",
                        activeId === item.url.slice(1)
                            ? "font-medium text-foreground"
                            : "text-muted-foreground",
                        // 根据层级设置缩进
                        level === 1 && "pl-0",
                        level === 2 && "pl-4",
                        level === 3 && "pl-8",
                        level >= 4 && "pl-12"
                    )}
                    onClick={handleClick}
                    style={{
                        paddingLeft: hasChildren ? undefined : `${(level - 1) * 16}px`
                    }}
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
                            activeId={activeId}
                            level={level + 1}
                            onItemClick={onItemClick}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}