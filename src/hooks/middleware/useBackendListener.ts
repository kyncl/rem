import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { Dispatch, SetStateAction, useEffect } from "react";
import { PlayerState } from "../../lib/playerActions";
import { AudioOptions, AudioRealTimeInfo } from '../../lib/types';

/**
 * Well it's obvious right? Basically listens to events from backend.
 * Check out the AudioHandler in backend for better understanding.
* */
export const useBackendListener = (
    setPlayerState: Dispatch<SetStateAction<PlayerState>>
) => {
    useEffect(() => {
        // Most likely backend will read some settings from
        // last session, where the App will store things like
        // is muted, volume and so on
        const setOptions = async () => {
            const opts: AudioOptions =
                await invoke("get_options");
            setPlayerState(s =>
                s.syncAudio(opts.volume, opts.muted));
        };
        setOptions();
        let previousPos = 0;
        const progress = listen<AudioRealTimeInfo>("audio-realtime", (e) => {
            const { position, finished } = e.payload;
            if (finished)
                setPlayerState(s => s.setProgress(0).pause());
            else if (position !== previousPos) {
                previousPos = position;
                setPlayerState(s => s.setProgress(position));
            }
        });

        return () => {
            progress.then(f => f());
        };
    }, []);
};
