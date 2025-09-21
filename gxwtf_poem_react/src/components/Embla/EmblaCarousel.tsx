import React, { useRef } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import './Embla.css';
import EmblaCarouselArrowButtons from './EmblaCarouselArrowButtons';
import EmblaCarouselDotButton from './EmblaCarouselDotButton';

const EmblaCarousel = ({ slides }) => {
    const [emblaRef] = useEmblaCarousel();
    const slideCount = slides.length;

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {slides.map((slide, index) => (
                    <div className="embla__slide" key={index}>
                        {slide}
                    </div>
                ))}
            </div>
            <EmblaCarouselArrowButtons />
            <div className="embla__dots">
                {Array.from(Array(slideCount).keys()).map((index) => (
                    <EmblaCarouselDotButton key={index} index={index} />
                ))}
            </div>
        </div>
    );
};

export default EmblaCarousel;