import { useRef } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    altSrc?: string;
}

/**
 * Extension of the HTML img component.
 */
export const Image: React.FC<ImageProps> = ({ altSrc, ...props }) => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleImgError = () => {
        const img = imgRef.current;
        if (img === null || !altSrc) return;

        img.src = altSrc;
    };

    return (
        <img
            {...props}
            ref={imgRef}
            onError={handleImgError}
        />
    );
};