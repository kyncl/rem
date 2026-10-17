import { IoPause, IoPlay } from "react-icons/io5";
import { Vinyl } from "./Vinyl";
import { useSwipe } from "../../hooks/useSwipe";
import { ProgressBar } from "./Progressbar";
import { vt, withTransition } from "../../lib/viewTransition";
import { MuteVolumeBtn } from "./MuteVolumeBtn";
import { usePlayerInfo } from '../../hooks/usePlayerInfo';

export const MiniPlayer = () => {
    const miniPlayerInfo = usePlayerInfo();

    const expand = () => withTransition(miniPlayerInfo.actions.setSong, "Song");
    // Swipe up (or tap) on the vinyl / title area pulls the full player up
    const swipe = useSwipe({ onUp: miniPlayerInfo.actions.setSong });

    return (
        <div
            {
            /* Because Album makes the transition broken, we will make exception */
            ...vt("mini-player", "Album")
            }
            className="rounded-3xl border
            fixed bottom-4 w-21/22
            bg-background-dark
            left-1/2
            -translate-x-1/2
            border-foreground/30 bg-card-bg p-3 z-50">
            <div className="flex items-center gap-3">
                <button
                    {...swipe}
                    onClick={expand}
                    aria-label="Open player"
                    className="flex min-w-0 flex-1
                    cursor-pointer touch-none items-center gap-3 text-left"
                >
                    <div
                        {...vt("player-vinyl", "Song")}>
                        <Vinyl progress={miniPlayerInfo.playerState.progress}
                            track={miniPlayerInfo.track}
                            spinning={miniPlayerInfo.playerState.playing}
                            className="w-14" />
                    </div>
                    <span className="min-w-0">
                        <span
                            {...vt("player-title", "Song")}
                            className="block truncate text-lg font-medium
                        leading-tight">{miniPlayerInfo.track.title}</span>
                        <span
                            {...vt("player-author", "Song")}
                            className="block truncate text-sm text-muted">
                            {miniPlayerInfo.track.author}</span>
                    </span>
                </button>

                <MuteVolumeBtn />

                <button
                    onClick={miniPlayerInfo.actions.togglePlay}
                    aria-label={miniPlayerInfo.playerState.playing
                        ? "Pause (P)" : "Play (P)"}
                    title={miniPlayerInfo.playerState.playing
                        ? "Pause (P)" : "Play (P)"}
                    className="grid size-11 shrink-0 cursor-pointer
                    place-items-center rounded-full border
                    border-foreground/40 transition-colors
                    hover:bg-hover-bg"
                    {...vt("play-pause-btn", "Song")}
                >
                    {miniPlayerInfo.playerState.playing ? <IoPause size={20} /> : <IoPlay size={20} />}
                </button>
            </div>

            <div {...vt("progress-bar", "Song")}>
                <ProgressBar current={miniPlayerInfo.playerState.progress}
                    duration={miniPlayerInfo.track.duration ?? 0}
                    onSeek={miniPlayerInfo.actions.setSeek} className="mt-3" />
            </div>
        </div>
    );
};
