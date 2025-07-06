import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tag } from "@/components/tag"

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
    <Card>
      <CardHeader>
        <CardTitle className="card-title text-xl">{title}</CardTitle>
        <CardDescription>
          {dynasty ? `【${dynasty}】` : ""}{author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-4">{content}</div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {tags?.map(tag => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}