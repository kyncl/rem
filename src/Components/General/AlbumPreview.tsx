import { Album } from '../../lib/types/audioTypes';
import { cn, vt } from '../../lib/utils';
import { PLACEHOLDER } from '../../media';
import { Image } from './Image';

interface AlbumPreviewProps extends React.ComponentProps<"div"> {
    album: Album;
    showTitle?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const AlbumPreview: React.FC<AlbumPreviewProps> = ({ album, onClick, children, showTitle = true, ...props }) => {
    const { className } = props;

    return (
        <div {...props} className={cn(className, "relative z-1")}>
            <div className="w-full h-full">
                <button
                    className={cn(
                        "aspect-square w-full rounded-lg object-cover my-1.75 border border-foreground/30 relative",
                        onClick && "cursor-pointer hover:border-main"
                    )}
                    {...vt(`album-cover-${album.id}`, "Album")}
                    onClick={onClick}
                >
                    <Image
                        src={album.cover}
                        altSrc={PLACEHOLDER}
                        alt={`Album cover for ${album.title}`}
                        className="rounded-lg w-full h-full album-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    {children}
                </button>
                {showTitle &&
                    <h3
                        {...vt(`album-title-${album.id}`, "Album")}
                        className="mt-2 line-clamp-2 text-center text-lg sm:text-xl">
                        {album.title}
                    </h3>
                }
            </div>
            {onClick && <span className="hover-background absolute rounded-lg" />}
        </div>
    );
};
