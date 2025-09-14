import React from 'react';

interface ArrowButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const EmblaCarouselArrowButton: React.FC<ArrowButtonProps> = ({ onClick, disabled }) => {
    return (
        <button
            className={`embla__button embla__button--arrow ${disabled ? 'is-disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="embla__button__icon">{disabled ? '◀' : '▶'}</span>
        </button>
    );
};

export default EmblaCarouselArrowButton;