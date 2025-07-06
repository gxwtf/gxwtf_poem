"use client"

export function Translation({
    translation,
    highlight
}:{
    translation: string
    highlight: boolean
}){
    return (
        <div className="mt-2">
            <span className={`text-xl text-gray-500 ${highlight ? "bg-yellow-100 px-1" : ""}`}>
                {translation}
            </span>
        </div>
    );
}