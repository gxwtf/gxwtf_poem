import React from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';

interface EmblaCarouselDotButtonProps {
    selected: boolean;
    onClick: () => void;
}

const EmblaCarouselDotButton: React.FC<EmblaCarouselDotButtonProps> = ({ selected, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-3 h-3 rounded-full mx-1 ${selected ? 'bg-blue-500' : 'bg-gray-300'}`}
        />
    );
};

export default EmblaCarouselDotButton;