// 作者基本信息组件

"use client"

import Image from "next/image"

export function Meta({
    name,
    avatar,
    dynasty,
}: {
    name: string
    avatar: string
    dynasty?: string
}) {
    return (
        <div className="text-center mt-6 mb-8">
            <Image id="authorImage" className="w-40 h-40 object-cover rounded-full border-4 border-[var(--theme-color)] shadow-[0_4px_15px_rgba(163,31,36,0.2)] mx-auto mb-8" 
                 src={avatar} alt={name} width={40} height={40} 
                 style={{ objectFit: 'cover' }}/>
            <h1 id="authorName" className="text-3xl font-bold tracking-wide">{dynasty ? `【${dynasty}】` : ""}{name}</h1>
        </div>
    )
}