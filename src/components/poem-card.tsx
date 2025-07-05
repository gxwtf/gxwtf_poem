import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PoemCardProps {
  title: string
  author: string
  dynasty?: string
  content: string
  tags?: string[]
}

export function PoemCard({
  title,
  author,
  dynasty,
  content,
  tags,
}: PoemCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex flex-row items-center">
          <span className="text-[#b22222]">{title}</span>
        </CardTitle>
        <CardDescription className="text-sm mt-1">
          {dynasty ? `【${dynasty}】 ` : ""}{author}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 text-sm text-gray-700 overflow-hidden">
        <div className="line-clamp-5">{content}</div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags?.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}