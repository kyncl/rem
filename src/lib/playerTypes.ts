import { PlayerState } from "./playerActions";
import { Track } from "./audioTypes";

export type PlayerInfo = {
    playerState: PlayerState,
    track: Track;
    playing: boolean;
    progress: number;
};

export type MiniPlayerProps = {
    playerState: PlayerState,
    track: Track;
    playing: boolean;
    progress: number;
    onTogglePlay: () => void;
    onSeek: (seconds: number) => void;
    onExpand: () => void;
};