import { Album } from "../../lib/audioTypes";

export const Home = ({ albums }: { albums: Album[] }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,10rem),1fr))] gap-4 p-3 pb-50 sm:gap-6">
            {albums.map((album) => (
                <div key={album.id} className="album-item min-w-0 relative z-1">
                    <div>
                        <button className="cursor-pointer aspect-square w-full rounded-lg object-cover border border-foreground/30 hover:border-main">
                            <img
                                src={album.cover}
                                alt={`Album cover for ${album.title}`}
                                className="aspect-square rounded-lg"
                                loading="lazy"
                                decoding="async"
                            />
                        </button>
                        <h3 className="mt-2 line-clamp-2 text-center text-lg sm:text-xl">
                            {album.title}
                        </h3>
                    </div>
                    <span className="hover-background absolute rounded-lg"/>
                </div>
            ))}
        </div>
    );
};
