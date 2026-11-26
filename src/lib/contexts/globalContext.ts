import { createContext } from 'react';
import type { ContextPlayerProps } from '../types/contextType';

/**
    This stores important data about currently playing song. Every component using this context can access these data.
    I bet that this will need a more proper implementation tho.
    On the plus side, both Miniplayer and MainPlayer share resources this way.
    Here is just declaration, the data will be updated bellow.
*/
export const CurrPlayingContext = createContext<ContextPlayerProps | null>(
    null,
);
