import { usePlayerInfo } from '../../hooks/usePlayerInfo';
import { Album, AlbumDisk, Track } from '../../lib/types/audioTypes';
import { cn, formatDuration } from '../../lib/utils';
import { vt } from '../../lib/viewTransition';
import { VinylDisk } from '../AudioPlayer/VinylDisk';
import { AlbumPreview } from '../General/AlbumPreview';
import { SongList } from '../General/SongList';
import { CreatorLink } from '../General/ArtistLink';
import { MdPlaylistAdd } from 'react-icons/md';

interface AlbumSectionProps {
    album: Album;
}

/**
 * This is the Album view/tab/page/section.
 * 
 * Right now album actions buttons are still missing, I'm not sure where to place them nicely
 * to not make it awkward to interact with on mobile with a single hand. 
 */
export const AlbumSection: React.FC<AlbumSectionProps> = ({ album }) => {
    const playerInfo = usePlayerInfo();

    // ToDo: Replace with actual song and disk fetching from the album
    const disks: AlbumDisk[] = new Array(4).fill(0)
        .map((_, i, disks): AlbumDisk => ({ number: i + 1, trackCount: Math.floor(album.trackCount / disks.length) }));
    const songs: Track[] = new Array(album.trackCount).fill(0)
        .map((_, i) => ({
            ...playerInfo.track,
            diskNumber: Math.floor(i / album.trackCount * disks.length) + 1
        }));
    const totalDurationSeconds = songs.length * 120;

    return (
        <div className="p-3 flex justify-between max-md:flex-col md:flex-row gap-4 relative">
            <div className="flex flex-col md:sticky md:top-15 h-min">
                <div>
                    <h1
                        {...vt(`album-title-${album.id}`, "Album")}
                        className='text-4xl block'
                    >
                        {album.title}
                    </h1>
                    <div className="flex flex-row gap-2">
                        {album.artist.map((artist, index) => {
                            // This will pass the album artist id instead
                            console.log(artist);
                            const creatorId = index;
                            return <CreatorLink key={`${index}-${creatorId}`} creatorId={creatorId} />;
                        })}
                    </div>
                </div>
                <div className='w-full flex justify-between'>
                    <AlbumPreview
                        album={album}
                        showTitle={false}
                        className="w-60 lg:w-96"
                    >
                        <div className={cn(
                            'absolute top-0 left-[40%] w-full h-full transition-all -z-10',
                        )}>
                            <div className='w-full h-full relative p-1'>
                                <VinylDisk
                                    coverArt={album.cover}
                                    spinning={true}
                                    className="border border-foreground/30"
                                />
                            </div>
                        </div>
                    </AlbumPreview>
                </div>
                <div className="flex flex-row gap-4 md:gap-2 justify-start md:justify-around items-center h-8">
                    <p>{formatDuration(totalDurationSeconds, true)}</p>
                    <p>{album.trackCount} Songs</p>
                    <div className="flex gap-2 items-center h-full">
                        <p>{disks.length} Disks</p>
                        {disks.map((disk) => {
                            return (
                                <div
                                    className={`bg-album-disk-${disk.number} text-background rounded-full aspect-square h-full flex items-center justify-center`}
                                    title={`Disk ${disk.number}`}
                                >
                                    <p className="font-black">{disk.trackCount}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <p className="text-md pb-2">Short description about the album :P</p>
            </div>
            <SongList
                isReorderable
                songs={songs}
                onSongClicked={(index) => {
                    // Replaced with actual logic
                    console.log(`Play album id:${album.id} from song id:${songs[index].id}`);
                }}
                menuOptions={[
                    {
                        name: 'Add to...',
                        icon: (<MdPlaylistAdd size={20} />),
                        onClick: (index: number) => {
                            console.log(`Add song ${songs[index]} to...`);
                            console.error('Not implemented yet >:O');
                        }
                    },
                ]}
                className="w-full md:max-w-1/2 pb-[125px] z-5"
            /**
             * 125px is based on the MiniPlayer height and some spacing,
             * I'm not sure how to have this dynamic
             */
            />
        </div>
    );
};
