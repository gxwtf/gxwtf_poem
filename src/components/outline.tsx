"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export type OutlineContent = {
    title: string,
    id: string,
    children?: Array<OutlineContent>
};

/**
 * recursive component to build an outline
 * @param {Object} props
 * @param {OutlineContent} [props.content] outline content
 * @param {string} [props.activeId] index of active section
 * @param {React.Dispatch<React.SetStateAction<string>>} [props.setActiveId]
 * @returns outline component
 */
function BasicOutline({ content, activeId, setActiveId }: {
    content: OutlineContent
    activeId: string,
    setActiveId: React.Dispatch<React.SetStateAction<string>>
}) {
    const router = useRouter();
    let chs = (<></>);
    if (content.children) {
        chs = (
            <div className="pl-4 flex flex-col">
                {content.children.map((ch, index) => (
                    <BasicOutline key={index} content={ch} activeId={activeId} setActiveId={setActiveId} />
                ))}
            </div>
        );
    }
    return (<>
        <Link className={`${activeId == content.id ? "" : "text-primary"} cursor-pointer`}
            href={"#" + content.id}
        >
            {content.title}
        </Link>
        {chs}
    </>);
}

/**
 * outline component
 * @param {Object} props
 * @param {OutlineContent} [props.content] content of outline
 * @return {React.JSX.Element} outline component
 */
export function Outline({ content }: {
    content: OutlineContent
}): React.JSX.Element {
    const [activeId, setActiveId] = useState<string>(content.id);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function calcActiveId() {
        if (window.location.hash) {
            setActiveId(window.location.hash.substring(1));
        }
    }
    useEffect(() => {
        console.log("fuck");
        calcActiveId();
        window.addEventListener("hashchange", calcActiveId);
    }, []);
    useEffect(() => {
        calcActiveId();
    }, [pathname, searchParams]);

    return (<BasicOutline content={content} activeId={activeId} setActiveId={setActiveId} />);
}