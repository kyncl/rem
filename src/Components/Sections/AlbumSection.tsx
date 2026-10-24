import { MdPlaylistAdd } from 'react-icons/md';
import { usePlayerInfo } from '../../hooks';
import { Album, AlbumDisk } from '../../lib/types';
import { cn, formatDuration, vt } from '../../lib/utils';
import { VinylDisk } from '../AudioPlayer/VinylDisk';
import { AlbumPreview } from '../General/AlbumPreview';
import { CreatorLink } from '../General/ArtistLink';
import { SongList } from '../General/SongList';
import { useAllTracks } from '../../hooks/middleware';

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

    // TODO: Use tracks from the actual album
    const { status, error, tracks } = useAllTracks();

    // TODO: Use disks from the actual album
    const disks: AlbumDisk[] = [...new Set(tracks?.map(({ diskNumber }) => diskNumber) ?? [])]
        .map((diskNumber): AlbumDisk => ({
            number: diskNumber,
            trackCount: tracks?.reduce((count, track) => count + (diskNumber === track.diskNumber ? 1 : 0), 0) ?? 0,
        }));

    const totalDurationSeconds = !tracks ? 0 : tracks.reduce((total, { duration }) => total + duration, 0);

    return (
        <div className="bg-background p-3 flex justify-between max-md:flex-col md:flex-row gap-4 relative">
            <div className="flex flex-col md:sticky md:top-15 h-min">
                <div>
                    <h1
                        {...vt(`album-title-${album.id}`, "Album")}
                        className='text-4xl block'
                    >
                        {album.title}
                    </h1>
                    <div className="flex flex-row gap-2">
                        {album.artist.map((_, index) => {
                            // This will pass the album artist id instead
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
                                    key={`disk-${disk.number}`}
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
            {status === 'ready'
                ? (
                    <SongList
                        isReorderable
                        songs={tracks}
                        onSongClicked={(idx) => {
                            // Replaced with actual logic
                            console.log(`Play album id:${album.id} from song id:${tracks[idx].id}`);
                            playerInfo.actions.loadSong(tracks[idx].path, true);
                        }}
                        menuOptions={[
                            {
                                name: 'Add to...',
                                icon: MdPlaylistAdd,
                                onClick: (index: number) => {
                                    console.log(`Add song ${tracks[index]} to...`);
                                    console.error('Not implemented yet >:O');
                                }
                            },
                        ]}
                        className="w-full md:max-w-1/2 pb-31.25 z-5"
                    /**
                     * 125px is based on the MiniPlayer height and some spacing,
                     * I'm not sure how to have this dynamic
                     */
                    />
                )
                : (
                    <p>{error?.message ?? '...'}</p>
                )
            }
        </div>
    );
};
