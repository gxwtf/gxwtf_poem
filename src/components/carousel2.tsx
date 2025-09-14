"use client"

import React from "react"
import EmblaCarousel from "./Embla/EmblaCarousel"
import { EmblaOptionsType } from "embla-carousel"
import "./Embla/embla.css" 

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export function Carousel() {
    return (
        <div className="min-h-[256px] flex items-center justify-center">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    )
}