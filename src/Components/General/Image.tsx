import { useRef } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    altSrc?: string;
    alt?: string;
}

/**
 * Extension of the HTML img component.
 */
export const Image: React.FC<ImageProps> = ({ altSrc, alt, ...props }) => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleImgError = () => {
        const img = imgRef.current;
        if (img === null || !altSrc) return;

        img.src = altSrc;
    };

    return <img {...props} alt={alt} ref={imgRef} onError={handleImgError} />;
};
