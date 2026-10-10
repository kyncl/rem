import { PlayerState } from "./playerActions";
import { Track } from "./audioTypes";

export type PlayerInfo = {
    playerState: PlayerState;
    track: Track;
};

export type MiniPlayerProps = {
    playerState: PlayerState;
    track: Track;
    onTogglePlay: () => void;
    onSeek: (seconds: number) => void;
    onExpand: () => void;
};
