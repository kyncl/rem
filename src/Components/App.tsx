import { useEffect, useRef, useState } from "react";
import "../css/style.css";
import { Navbar } from "./General/Navbar";
import { Album, toTrack, Track } from "../lib/audioTypes";
import { MiniPlayer } from "./AudioPlayer/MiniPlayer";
import { useShortcuts } from "../hooks/UseShortcuts";
import { render, Tabs } from "../lib/tabs";
import { invoke } from "@tauri-apps/api/core";
import { PlayerActions, PlayerState } from "../lib/playerActions";
import { createContext } from 'react';
import { MiniPlayerProps } from "../lib/playerTypes";
import { miniPlayerBlacklist } from "../lib/miniPlayerBlacklist";

const ALBUMS: Album[] = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    title: `Album ${i + 1}`,
    artist: [`Artist ${i + 1}`],
    cover: import.meta.env.VITE_TESTING_IMG
}));

/*
    This stores important data about currently playing song. Every component using this context can access these data.
    I bet that this will need a more proper implementation tho.
    On the plus side, both Miniplayer and MainPlayer share resources this way.
    Here is just declaration, the data will be updated bellow.
*/
export const CurrPlayingContext = createContext<MiniPlayerProps>({
        playerState: null as unknown as PlayerState,
        track: null as unknown as Track,
        playing: false,
        progress: 0,
        onTogglePlay: () => {},
        onSeek: () => {},
        onExpand: () => {} });

function App() {
    const [lastTab, setLastTab] = useState<Tabs>("Home");
    const [currentTab, setCurrentTab] = useState<Tabs>("Home");

    /// I know it's wrong but this is just something for a demo
    //  Also I have no fucking idea, how the DB will look
    const [currentTrack, setCurrentTrack] = useState<Track>(toTrack(ALBUMS[0], import.meta.env.VITE_TESTING_SOUND_LINK, 171));
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasConflicts] = useState(false);
    const [playerState, setPlayerState] = useState(new PlayerState);

    useEffect(() => {
        const play = async () => {
            console.log(
                await invoke("test"));
        };
        play();
    }, []);

    useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = playerState.volume;
    }, [audioRef, playerState.volume])

    /** Update progress bar (probably will be removed) */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playerState.playing) {
            audio.play().catch(err => {
                // AbortError happens also on quick pause
                if (err.name !== "AbortError") console.error(err);
            });
        } else {
            audio.pause();
        }
    }, [playerState.playing]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        // Don't touch it! This is basically only when you press click on
        // the slidebar so that you change the position
        if (Math.abs(audio.currentTime - playerState.progress) > 0.5) {
            audio.currentTime = playerState.progress;
        }

        if (audio.ended) {
            // Add afterwads next track
            setPlayerState(s => s.reset())
        }
    }, [playerState.progress]);

    const actions: PlayerActions = {
        togglePlay: () => setPlayerState(s => s.togglePlay()),
        toggleRepeat: () => setPlayerState(s => s.toggleRepeat()),
        toggleShuffle: () => setPlayerState(s => s.toggleShuffle()),
        toggleMute: () => setPlayerState(s => s.toggleMute()),
        pressShuffle: () => { /* This is going to be little longer
            cuz it requires also saving the state before shuffle*/ },
        setAlbumSection: () => {
            setLastTab(currentTab);
            setCurrentTab("Album");
        },
        setHome: () => {
            setLastTab(currentTab);
            setCurrentTab("Home");
        },
        setLyrics: () => {
            setLastTab(currentTab);
            setCurrentTab("Lyrics");
        },
        setQueue: () => {
            setLastTab(currentTab);
            setCurrentTab("Queue");
        },
        setSong: () => {
            setLastTab(currentTab);
            setCurrentTab("Song");
        },
        setPrevious: () => {
            setCurrentTab(lastTab);
            setLastTab(currentTab);
        },
        setConflicts: () => {
            setLastTab(currentTab);
            setCurrentTab("Conflicts");
        },
        setSettings: () => {
            setLastTab(currentTab);
            setCurrentTab("Settings");
        }
    };

    useShortcuts({
        r: actions.toggleRepeat,
        s: actions.toggleShuffle,
        l: actions.setLyrics,
        m: actions.toggleMute,
        q: actions.setQueue,
        p: actions.togglePlay,
        " ": actions.togglePlay,
        o: actions.setSettings,
        "!": actions.setConflicts,
        escape: () => setCurrentTab("Home"),
    });

    return (
        <CurrPlayingContext.Provider value={{ //Behold, the context now has some actual context! Other components can access this data.
            playerState: playerState,
            track: currentTrack,
            playing: playerState.playing,
            progress: playerState.progress,
            onTogglePlay: actions.togglePlay,
            onSeek: (num:number) => {
                if (audioRef.current) audioRef.current.currentTime = num;
                setPlayerState(s => s.setProgress(num));
            },
            onExpand: actions.setSong}}>

            <main className="min-h-screen text-foreground bg-background">
                <Navbar
                    hasConflicts={hasConflicts}
                    isHome={currentTab === "Home"}
                    onPreviousClick={actions.setPrevious}
                    onConflictsClick={actions.setConflicts}
                    onSettingsClick={actions.setSettings} />
                {render(currentTab, ALBUMS)}
                <audio
                    ref={audioRef}
                    src={currentTrack.path}
                    onTimeUpdate={e => {
                        const t = e.currentTarget.currentTime;
                        setPlayerState(s => s.setProgress(t));
                    }}
                />
                {miniPlayerBlacklist.includes(currentTab) ? <></> : <MiniPlayer/>}
            </main>
        </CurrPlayingContext.Provider>
    );
}

export default App;
