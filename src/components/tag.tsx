import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TagProps {
  text: string
  href?: string
}

export function Tag({ text, href }: TagProps) {
  if (href) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link href={href}>{text}</Link>
      </Button>
    )
  }
  return (
    <Button size="sm" variant="outline">
      {text}
    </Button>
  )
}