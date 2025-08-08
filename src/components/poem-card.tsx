import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
        <CardTitle className="text-[var(--theme-color)] font-bold text-xl">{title}</CardTitle>
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

export function PoemTinyCard({
  title
}:
  {
    title: string
  }) {
  return (
    <div
      className="
        p-4 rounded-md bg-white border border-gray-200 
        transition-all duration-300 ease-in-out 
        cursor-pointer no-underline
        hover:-translate-y-1 hover:shadow-md hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]
      "
    >
    <CardTitle className="text-primary">{title}</CardTitle>
    </div>
  )
}