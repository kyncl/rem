import { Vinyl } from "./../AudioPlayer/Vinyl";
import { MdOutlineSkipNext, MdOutlineSkipPrevious, } from "react-icons/md";
import { ProgressBar } from "./../AudioPlayer/Progressbar";
import { MuteVolumeButton } from "../AudioPlayer/Controls/MuteVolumeButton";
import { CreatorLink } from '../General/ArtistLink';
import { PlayPauseButton } from '../AudioPlayer/Controls/PlayPauseButton';
import { IconButton } from '../General/IconButton';
import { usePlayerInfo, useResponsive } from '../../hooks';
import { vt } from '../../lib/utils';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { AutoScrolled } from '../General/AutoScrolled';

/**
    This component is for showing the currently played song in fullscreen.
    Miniplayer is for p*ssies, real men go here! Can be accessed using
    the render function from ./rem/src/lib/tabs.tsx
*/
export const Song = () => {
    //Loads all the data from App.tsx. When something changes there, this little guy will know.
    const playerInfo = usePlayerInfo();
    const { isMobile } = useResponsive();

    // Testing temporary data
    const albumTitle = "Some Album";
    if (playerInfo.track !== null) {
        playerInfo.track!.author = ["Author 1", "Author 2"];
    }

    const noSongSelected = playerInfo.track === null;

    const playingTitle = playerInfo.track?.title ?? "Nothing playing...";

    return (
        <div className="flex items-center justify-center flex-col w-full grow p-3 gap-6">
            <div {...vt("player-vinyl", "Song")}>
                <Vinyl progress={playerInfo.playerState.progress}
                    track={playerInfo.track}
                    spinning={playerInfo.playerState.playing}
                    className="max-[350px]:w-50 max-[450px]:w-60 max-[600px]:w-80 w-110" />
            </div>
            <div
                {...vt("player-title", "Song")}
                className="min-w-0 w-full flex flex-col justify-center"
            >
                <AutoScrolled
                    element={(
                        <p className="text-3xl md:text-4xl lg:text-5xl text-center font-medium leading-tight">
                            {playingTitle}
                        </p>
                    )}
                    className="w-full"
                />
                {/* <span
                    {...vt("player-title", "Song")}
                    className="block min-w-0 w-full truncate text-3xl md:text-5xl lg:text-7xl font-medium leading-tight"
                >
                    {playerInfo.track?.title ?? "Nothing playing..."}
                </span> */}
                {!noSongSelected && (
                    <span className="block min-w-0 w-full truncate text-center text-1xl md:text-2xl lg:text-3xl font-light leading-tight">
                        {albumTitle}
                    </span>
                )}
            </div>
            <div className="grow" />
            <div className="w-full flex flex-col items-stretch gap-2 px-5 lg:px-10">
                <div className="flex items-center">
                    <div
                        {...vt("player-author", "Song")}
                        className="w-full flex gap-2">
                        {playerInfo.track?.author?.map((_, index) => {
                            // This will pass the song author id instead
                            const creatorId = index;
                            return <CreatorLink
                                key={`${index}-${creatorId}`}
                                creatorId={creatorId}
                                className="text-lg text-muted"
                            />;
                        })}
                    </div>
                    <div className="grow" />
                    <div>
                        <IconButton
                            disabled={noSongSelected}
                            buttonSize='small'
                            title={playerInfo.track?.isFavorite ? "Unfavorite" : "Favorite"}
                            icon={playerInfo.track?.isFavorite ? IoIosHeart : IoIosHeartEmpty}
                            iconSize={20}
                        />
                    </div>
                </div>
                <div
                    {...vt("progress-bar", "Song")}>
                    <ProgressBar
                        disabled={noSongSelected}
                        current={playerInfo.playerState.progress}
                        duration={playerInfo.track?.duration ?? 0}
                        onSeek={playerInfo.actions.setSeek}
                        className="stretch"
                    />
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/4 flex justify-center items-center">
                    <MuteVolumeButton isHorizontal={!isMobile} />
                </div>
                <div className="w-2/4 flex justify-center items-center gap-4">
                    <IconButton
                        disabled={noSongSelected}
                        icon={MdOutlineSkipPrevious}
                        iconSize={40}
                    />
                    <PlayPauseButton
                        size="large"
                        isPlaying={playerInfo.playerState.playing}
                        onClick={playerInfo.actions.togglePlay}
                        disabled={noSongSelected}
                        {...vt("play-pause-btn", "Song")}
                    />
                    <IconButton
                        disabled={noSongSelected}
                        icon={MdOutlineSkipNext}
                        iconSize={40}
                    />
                </div>
                <div className="w-1/4 flex justify-center items-center">
                </div>
            </div>
        </div>
    );
};
