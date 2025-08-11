"use client"
/**
 * @description generate a outline
 * @param {Array<any>} content content of outline, keys must be ["1","2","3",...]
 * @return {React.ReactElement} outline component
 */
import React from "react";
import { useState } from "react";
export type OutlineContent = {
    title: string,
    id: number,
    children?: Array<OutlineContent>
};
export function Outline({ content, activeId, setActiveId }: {
    content: OutlineContent
    activeId?: number,
    setActiveId?: React.Dispatch<React.SetStateAction<number>>
}) {
    const [internalActiveId, internalSetActiveId] = useState(content.id);
    const currentActiveId = setActiveId ? activeId : internalActiveId;
    const currentSetActiveId = setActiveId ? setActiveId : internalSetActiveId;
    let chs = (<></>);
    if (content.children) {
        chs = (
            <div className="pl-4">
                {content.children.map((ch, index) => (
                    <Outline key={index} content={ch} activeId={currentActiveId} setActiveId={currentSetActiveId} />
                ))}
            </div>
        );
    }
    return (<>
        <p className={`${currentActiveId == content.id ? "" : "text-primary"} cursor-pointer`} onClick={() => { currentSetActiveId(content.id) }}>
            {content.title}
        </p>
        {chs}
    </>);
}