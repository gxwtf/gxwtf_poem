// app/overview/layout.tsx
export const metadata = {
  title: "古诗文概览 - 广学古诗文",
  description: "古诗文概览页面",
}

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}