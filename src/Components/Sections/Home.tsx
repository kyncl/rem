import { usePlayerInfo } from '../../hooks/usePlayerInfo';
import { Album } from "../../lib/types/audioTypes";
import { withTransition } from '../../lib/viewTransition';
import { AlbumPreview } from '../General/AlbumPreview';

export const Home = ({ albums }: { albums: Album[]; }) => {
    const playerInfo = usePlayerInfo();

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,10rem),1fr))] gap-4 p-3 pb-50 sm:gap-6">
            {albums.map((album) => (
                <AlbumPreview
                    key={album.id}
                    album={album}
                    className="album-item"
                    onClick={() => withTransition(() => {
                        playerInfo.actions.setAlbumSection(album);
                    }, "Album")}
                />
            ))}
        </div>
    );
};
