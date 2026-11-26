import type { PlayerActions, PlayerState } from '../playerActions';
import type { Track } from './audioTypes';

// Most likely we will have to separate it into multiple contexes
// because some values are changed not many times and others, like
// every time you do some small change. This may cause unnesecery
// re-renders. Rn I don't see any big performance issues, but
// this may cause it
export type ContextPlayerProps = {
    playerState: PlayerState;
    track: Track | null;
    actions: PlayerActions;
};
