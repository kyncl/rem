import { Vinyl } from "./../AudioPlayer/Vinyl";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { IoPause, IoPlay } from "react-icons/io5";
import { ProgressBar } from "./../AudioPlayer/Progressbar";
import { useContext } from 'react';
import { MiniPlayerProps} from "../../lib/playerTypes";
import { CurrPlayingContext } from "../App";

export const Song = () => {
    const playerInfo = useContext<MiniPlayerProps>(CurrPlayingContext);
    const audioIcon = playerInfo.playerState.volume >= 0.5 ?
        <MdVolumeUp size={30} /> :
        playerInfo.playerState.muted || playerInfo.playerState.volume == 0.0 ?
            <MdVolumeOff size={30} /> : <MdVolumeDown size={30} />
        ;

    return (
        <div className="">
            <div className="flex items-center gap-3">
                
                    <Vinyl progress={playerInfo.progress} track={playerInfo.track} spinning={playerInfo.playing} className="w-14" />
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-medium leading-tight">{playerInfo.track.title}</span>
                        <span className="block truncate text-sm text-muted">{playerInfo.track.author}</span>
                    </span>

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

            <ProgressBar current={playerInfo.progress} duration={playerInfo.track.duration ?? 0} onSeek={playerInfo.onSeek} className="mt-3" />
        </div>
    )
};
