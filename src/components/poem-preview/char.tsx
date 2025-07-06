"use client"

export type CharData = {
    char: string
    pinyin?: string
}

export function Char({
    data,
    showPinyin,
    highlight,
}: {
    data: CharData
    showPinyin: boolean
    highlight: boolean
}) {
    return (
        <div className={`text-black pr-1 ${highlight ? "bg-yellow-100" : ""}`}>
            <span className="inline-flex flex-col items-center mx-0.5 min-w-[1.5em]">
                {showPinyin && (
                    <span className="text-base text-gray-500 mb-0.5 leading-none">{data.pinyin || ""}</span>
                )}
                <span>
                    {data.char}
                </span>
            </span>
        </div>
    );
}