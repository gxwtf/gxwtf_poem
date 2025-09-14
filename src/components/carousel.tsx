"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )

    const imageUrls = [
        "https://gxwtf.cn/uploads/1744971261038-878773378.png",
        "https://gxwtf.cn/uploads/1744981865272-425518259.JPG",
        "https://gxwtf.cn/uploads/1745031933882-670128608.JPG",
        "https://gxwtf.cn/uploads/1749296307153-813440758.png",
    ]

    // 记录当前 slide 索引
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [emblaApi, setEmblaApi] = React.useState<any>(null)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

    // 监听 emblaApi
    React.useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
        onSelect()
        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi])

    // DotButton 组件
    const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
        <button
            className={`w-3 h-3 rounded-full mx-1 transition-all ${selected
                    ? "border-2 border-[var(--theme-color)]"
                    : "border-2 border-muted-foreground"
                }`}
            onClick={onClick}
            aria-label="跳转到该图片"
        />
    )

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col">
                {/* 轮播内容区域 */}
                <div className="flex-1 relative">
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full h-full"
                        setApi={setEmblaApi}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        {/* 控制按钮放在轮播框内部 */}
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 border-transparent" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 border-transparent" />
                        
                        <CarouselContent className="h-full">
                            {imageUrls.map((url, index) => (
                                <CarouselItem key={index} className="h-full">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <img
                                            src={url}
                                            alt={`Carousel image ${index + 1}`}
                                            className="object-cover w-full h-full object-center"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/300x256/cccccc/999999?text=Image+Not+Found"
                                            }}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                
                <div className="py-4 flex justify-center items-center gap-1">
                    {scrollSnaps.map((_, idx) => (
                        <DotButton
                            key={idx}
                            selected={selectedIndex === idx}
                            onClick={() => emblaApi?.scrollTo(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}