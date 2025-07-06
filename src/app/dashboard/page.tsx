export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="bg-muted/50 aspect-video rounded-xl" />
      <div className="bg-muted/50 aspect-video rounded-xl" />
      <div className="bg-muted/50 aspect-video rounded-xl" />
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min md:col-span-3" />
    </div>
  )
}
