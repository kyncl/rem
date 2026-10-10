import { Vinyl } from "./../AudioPlayer/Vinyl";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { IoPause, IoPlay } from "react-icons/io5";
import { ProgressBar } from "./../AudioPlayer/Progressbar";
import { useContext } from 'react';
import { MiniPlayerProps} from "../../lib/playerTypes";
import { CurrPlayingContext } from "../App";

/*
This component is for showing the currently played song in fullscreen. Miniplayer is for p*ssies, real men go here!
Can be accessed using the render function from ./rem/src/lib/tabs.tsx
*/

export const Song = () => {
    const playerInfo = useContext<MiniPlayerProps>(CurrPlayingContext); //Loads all the data from App.tsx. When something changes there, this little guy will know.
    const audioIcon = playerInfo.playerState.volume >= 0.5 ?
        <MdVolumeUp size={30} /> :
        playerInfo.playerState.muted || playerInfo.playerState.volume == 0.0 ?
            <MdVolumeOff size={30} /> : <MdVolumeDown size={30} />
        ;

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col gap-3">
                
                    <Vinyl progress={playerInfo.progress} track={playerInfo.track} spinning={playerInfo.playing} className="h-1/10" />
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-medium leading-tight">{playerInfo.track.title}</span>
                        <span className="block truncate text-sm text-muted">{playerInfo.track.author}</span>
                    </span>
                <div className="flex items-center gap-3">
                    <button>
                        {audioIcon}
                    </button>

                    <button
                        onClick={playerInfo.onTogglePlay}
                        aria-label={playerInfo.playing ? "Pause (P)" : "Play (P)"}
                        title={playerInfo.playing ? "Pause (P)" : "Play (P)"}
                        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-foreground/40 transition-colors hover:bg-hover-bg"
                    >
                        {playerInfo.playing ? <IoPause size={20} /> : <IoPlay size={20} />}
                    </button>
                </div>
            </div>

            <div className="w-5/6">
                <ProgressBar current={playerInfo.progress} duration={playerInfo.track.duration ?? 0} onSeek={playerInfo.onSeek} className="stretch" />
            </div>
        </div>
    )
};
