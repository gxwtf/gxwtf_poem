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
        Autoplay({ delay: 3000, stopOnInteraction: false })
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
            className={`w-4 h-4 rounded-full mx-1 border transition-all ${
                selected ? "bg-[var(--theme-color)] border-[var(--theme-color)]" : "bg-gray-300 border-gray-400"
            }`}
            onClick={onClick}
            aria-label="跳转到该图片"
        />
    )

    return (
        <div className="w-full h-full flex flex-col items-center justify-center min-h-[256px]">
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
                <CarouselContent>
                    {imageUrls.map((url, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 h-full">
                                <div className="min-h-[256px] relative w-full h-full rounded-xl overflow-hidden">
                                    <img
                                        src={url}
                                        alt={`Carousel image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/300x256/cccccc/999999?text=Image+Not+Found"
                                        }}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* 控制按钮和 DotButton 放在图片下方 */}
                <div className="flex flex-col items-center w-full mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                    <div className="flex items-center justify-center">
                        {scrollSnaps.map((_, idx) => (
                            <DotButton
                                key={idx}
                                selected={selectedIndex === idx}
                                onClick={() => emblaApi?.scrollTo(idx)}
                            />
                        ))}
                    </div>
                </div>
            </Carousel>
        </div>
    )
}