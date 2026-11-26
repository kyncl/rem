import { useEffect, useState } from 'react';
import '../css/style.css';
import { useActions, useTabs } from '../hooks';
import { useBackendListener } from '../hooks/middleware';
import { CurrPlayingContext } from '../lib/contexts/globalContext';
import { miniPlayerBlacklist } from '../lib/miniPlayerBlacklist';
import { PlayerState } from '../lib/playerActions';
import type { Album, Track } from '../lib/types/audioTypes';
import { MiniPlayer } from './AudioPlayer/MiniPlayer';
import { Navbar } from './General/Navbar';
import { RenderTabs } from './RenderTabs';

const ALBUMS: Album[] = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    title: `Album ${i + 1}`,
    artist: [`Artist ${i + 1}`, `Other Artist ${i + 1}`],
    trackCount: 30,
    cover: import.meta.env.VITE_TESTING_IMG,
}));

function App() {
    const { currentTab } = useTabs();

    /// I know it's wrong but this is just something for a demo
    //  Also I have no fucking idea, how the DB will look
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

    const [playerState, setPlayerState] = useState(new PlayerState());
    // const [hasConflicts] = useState(false);

    useBackendListener(setPlayerState, setCurrentTrack);

    const actions = useActions(setPlayerState, setCurrentTrack, playerState);

    useEffect(() => {
        actions.loadSong(import.meta.env.VITE_TESTING_SOUND_LINK, false);
    }, [actions.loadSong]);

    return (
        <CurrPlayingContext.Provider
            value={{
                // Behold, the context now has some actual context!
                // Other components can access this data.
                playerState: playerState,
                track: currentTrack,
                actions: actions,
            }}
        >
            <main className='min-h-screen text-foreground bg-background flex flex-col'>
                <Navbar />
                <RenderTabs albums={ALBUMS} />
                {!miniPlayerBlacklist.includes(currentTab.type) && (
                    <MiniPlayer />
                )}
            </main>
        </CurrPlayingContext.Provider>
    );
}

export default App;
