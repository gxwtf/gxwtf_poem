export function Meta({
    title,
    author,
    dynasty,
}: {
    title: string
    author: string
    dynasty?: string
}) {
    return (
        <div className="text-center mb-2">
            <div className="text-3xl font-bold poem-title">{title}</div>
            <div className="mt-6 text-lg text-gray-700">
                {dynasty ? `【${dynasty}】` : ""}{author}
            </div>
        </div>
    )
}