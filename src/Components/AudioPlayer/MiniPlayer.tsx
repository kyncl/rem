import { IoPause, IoPlay } from "react-icons/io5";
import { Vinyl } from "./Vinyl";
import { useSwipe } from "../../hooks/UseSwipe";
import { ProgressBar } from "./Progressbar";
import { Track } from "../../lib/audioTypes";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { PlayerState } from "../../lib/playerActions";

type MiniPlayerProps = {
    playerState: PlayerState,
    track: Track;
    playing: boolean;
    progress: number;
    onTogglePlay: () => void;
    onSeek: (seconds: number) => void;
    onExpand: () => void;
};

export const MiniPlayer = ({ playerState, track, playing, progress, onTogglePlay, onSeek, onExpand }: MiniPlayerProps) => {
    // Swipe up (or tap) on the vinyl / title area pulls the full player up
    const swipe = useSwipe({ onUp: onExpand });
    const audioIcon = playerState.volume >= 0.5 ?
        <MdVolumeUp size={30} /> :
        playerState.muted || playerState.volume == 0.0 ?
            <MdVolumeOff size={30} /> : <MdVolumeDown size={30} />
        ;

    return (
        <div className="rounded-3xl border
        fixed bottom-4 w-21/22
        bg-background-dark
        left-1/2
        -translate-x-1/2
        border-foreground/30 bg-card-bg p-3">
            <div className="flex items-center gap-3">
                <button
                    {...swipe}
                    onClick={onExpand}
                    aria-label="Open player"
                    className="flex min-w-0 flex-1
                    cursor-pointer touch-none items-center gap-3 text-left"
                >
                    <Vinyl progress={progress} track={track} spinning={playing} className="w-14" />
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-medium leading-tight">{track.title}</span>
                        <span className="block truncate text-sm text-muted">{track.author}</span>
                    </span>
                </button>

                <button>
                    {audioIcon}
                </button>

                <button
                    onClick={onTogglePlay}
                    aria-label={playing ? "Pause (P)" : "Play (P)"}
                    title={playing ? "Pause (P)" : "Play (P)"}
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-foreground/40 transition-colors hover:bg-hover-bg"
                >
                    {playing ? <IoPause size={20} /> : <IoPlay size={20} />}
                </button>
            </div>

            <ProgressBar current={progress} duration={track.duration ?? 0} onSeek={onSeek} className="mt-3" />
        </div>
    );
};
