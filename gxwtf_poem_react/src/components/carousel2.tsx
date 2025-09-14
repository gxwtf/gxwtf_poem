import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Embla/Embla.css";

const Carousel2 = () => {
    const [emblaRef] = useEmblaCarousel();

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {/* Add your slides here */}
                <div className="embla__slide">Slide 1</div>
                <div className="embla__slide">Slide 2</div>
                <div className="embla__slide">Slide 3</div>
                {/* Add more slides as needed */}
            </div>
        </div>
    );
};

export default Carousel2;