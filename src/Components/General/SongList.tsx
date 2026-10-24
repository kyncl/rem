import { IoPlay } from 'react-icons/io5';
import { Track } from '../../lib/types/audioTypes';
import { cn } from '../../lib/utils';
import { CreatorLink } from './ArtistLink';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { IconType } from 'react-icons';

interface SongListItemProps {
    listProps: SongListProps;
    index: number;

    toggleMenu: (index: number) => void;
    openMenuIndex: number;
}

/**
 * A single song in the SongList.
 */
const SongListItem: React.FC<SongListItemProps> = ({ listProps, index, toggleMenu, openMenuIndex }) => {
    const song = listProps.songs[index];

    const handleToggleMenu = () => {
        toggleMenu(index);
    };

    const isMenuOpen = openMenuIndex === index;
    const menuOptions = listProps.menuOptions ?? [];

    return (
        <div
            key={`${song.id}-${index}`}
            className="rounded bg-background-dark h-20 w-full flex items-center group cursor-pointer border border-transparent hover:border-foreground/30"
            onClick={() => listProps.onSongClicked(index)}
            title={`Play ${song.title}`}
        >
            <div className={`h-full w-1 rounded-bl rounded-tl bg-album-disk-${song.diskNumber}`} />

            <div
                className='aspect-square h-full flex justify-center items-center'
            >
                <p className="text-2xl p-1 block group-hover:hidden">{index + 1}</p>
                <p className="hidden group-hover:block"><IoPlay size={20} /></p>
            </div>
            <div className="grow flex flex-col min-w-0">
                {/* TODO: Truncate should be replaced by scrolling text */}
                <p className="text-lg truncate">
                    {song.title}
                </p>

                <div className="flex flex-row gap-2">
                    {song.author.map((_, index) => {
                        // This will pass the song author id instead
                        const creatorId = index;
                        return <CreatorLink key={`${index}-${creatorId}`} creatorId={creatorId} />;
                    })}
                </div>
            </div>
            {menuOptions.length > 0 && (
                <div className='aspect-square h-full flex justify-center items-center'>
                    <div
                        className="rounded-full p-2 hover:bg-foreground/10 relative"
                        title="Toggle menu"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMenu();
                        }}
                    >
                        <BsThreeDotsVertical size={20} />
                        {isMenuOpen && (
                            // This menu is far from final
                            // The options are probably going to be passed by the
                            <div className="absolute z-3 top-2 right-2 w-40 py-3 rounded bg-background border border-foreground/30 flex flex-col gap-2">
                                {menuOptions.map(({ name, onClick, icon: Icon }) => (
                                    <div
                                        className='flex gap-2 px-4 py-1 items-center hover:bg-background-light/20'
                                        title={name}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClick(index);
                                        }}
                                    >
                                        <Icon size={20} />
                                        <p>{name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export interface SongListItemMenuOption {
    name: string;
    icon: IconType;
    onClick: (index: number) => void;
}

interface SongListProps extends React.ComponentProps<"div"> {
    songs: Track[];
    onSongClicked: (index: number) => void;

    menuOptions?: SongListItemMenuOption[];

    /**
     * TODO: Make reordering work
     * In my mind, reordering will happen when a song will be dragged
     * and then just ask to be swapped at an index.
     * Might be more complicated when we get to it tho
     */
    isReorderable?: boolean;
    onReordered?: (indexA: number, indexB: number) => void;
}

/**
 * This is an ordered list of songs. Editing order is NOT implemented yet.
 * When the DB is implemented, the Track type will be replaced with songs IDs.
 */
export const SongList: React.FC<SongListProps> = (listProps) => {
    const { songs, onSongClicked, menuOptions, className, ...props } = listProps;

    const [openMenuIndex, setOpenMenuIndex] = useState<number>(-1);

    // Right now menu doesn't close when clicking elsewhere
    // that needs a body click listener
    const handleToggleMenu = (index: number) => {
        setOpenMenuIndex((value) => value === index ? -1 : index);
    };

    return (
        <div {...props} className={cn(className, "flex flex-col gap-2")}>
            {songs.map((song, index) => <SongListItem
                key={`${song.id}-${index}`}
                listProps={listProps}
                index={index}
                openMenuIndex={openMenuIndex}
                toggleMenu={handleToggleMenu}
            />)}
        </div>
    );
};