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
            <Image id="authorImage" className="w-40 h-40 object-cover rounded-full border-4 border-primary shadow-lg mx-auto mb-5" 
                 src={avatar} alt={name} />
            <h1 id="authorName" className="text-3xl font-bold tracking-wide">{dynasty ? `【${dynasty}】` : ""}{name}</h1>
        </div>
    )
}