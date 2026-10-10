import { IoPause, IoPlay } from "react-icons/io5";
import { Vinyl } from "./Vinyl";
import { useSwipe } from "../../hooks/UseSwipe";
import { ProgressBar } from "./Progressbar";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { MiniPlayerProps } from "../../lib/playerTypes";
import { useContext } from "react";
import { CurrPlayingContext } from "../App";

export const MiniPlayer = () => {
    const miniPlayerInfo = useContext<MiniPlayerProps>(CurrPlayingContext);
    // Swipe up (or tap) on the vinyl / title area pulls the full player up
    const swipe = useSwipe({ onUp: miniPlayerInfo.onExpand });
    const audioIcon = miniPlayerInfo.playerState.volume >= 0.5 ?
        <MdVolumeUp size={30} /> :
        miniPlayerInfo.playerState.muted || miniPlayerInfo.playerState.volume == 0.0 ?
            <MdVolumeOff size={30} /> : <MdVolumeDown size={30} />
        ;

    return (
        <div className="rounded-3xl border
        fixed bottom-4 w-21/22
        bg-background-dark
        left-1/2
        -translate-x-1/2
        border-foreground/30 bg-card-bg p-3 z-3">
            <div className="flex items-center gap-3">
                <button
                    {...swipe}
                    onClick={miniPlayerInfo.onExpand}
                    aria-label="Open player"
                    className="flex min-w-0 flex-1
                    cursor-pointer touch-none items-center gap-3 text-left"
                >
                    <Vinyl progress={miniPlayerInfo.progress} track={miniPlayerInfo.track} spinning={miniPlayerInfo.playing} className="w-14" />
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-medium leading-tight">{miniPlayerInfo.track.title}</span>
                        <span className="block truncate text-sm text-muted">{miniPlayerInfo.track.author}</span>
                    </span>
                </button>

                <button>
                    {audioIcon}
                </button>

                <button
                    onClick={miniPlayerInfo.onTogglePlay}
                    aria-label={miniPlayerInfo.playing ? "Pause (P)" : "Play (P)"}
                    title={miniPlayerInfo.playing ? "Pause (P)" : "Play (P)"}
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-foreground/40 transition-colors hover:bg-hover-bg"
                >
                    {miniPlayerInfo.playing ? <IoPause size={20} /> : <IoPlay size={20} />}
                </button>
            </div>

            <ProgressBar current={miniPlayerInfo.progress} duration={miniPlayerInfo.track.duration ?? 0} onSeek={miniPlayerInfo.onSeek} className="mt-3" />
        </div>
    );
};
