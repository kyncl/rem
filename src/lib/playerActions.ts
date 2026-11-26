import type { Album } from './types/audioTypes';

export class PlayerState {
    public readonly playing: boolean = false;
    public readonly repeat: boolean = false;
    public readonly shuffle: boolean = false;
    public readonly muted: boolean = false;
    public readonly progress: number = 0;
    public readonly volume: number = 1;
    public readonly search: boolean = false;

    // Because React won't see the different value, there must be
    // Cloning
    // Not sure if it was good call because you have less variables
    // but at the same time you clone on every action
    // I guess garbage collector is hopefully OP?
    private clone(patch: Partial<PlayerState>): PlayerState {
        return Object.assign(new PlayerState(), this, patch);
    }

    public play() {
        return this.clone({ playing: true });
    }
    public pause() {
        return this.clone({ playing: false });
    }
    public togglePlay() {
        return this.clone({ playing: !this.playing });
    }
    public toggleRepeat() {
        return this.clone({ repeat: !this.repeat });
    }
    public toggleShuffle() {
        return this.clone({ shuffle: !this.shuffle });
    }

    public mute() {
        return this.clone({ muted: true });
    }
    public unmute() {
        return this.clone({ muted: false });
    }
    public toggleMute() {
        return this.clone({ muted: !this.muted });
    }

    public showSearch() {
        return this.clone({ search: true });
    }
    public hideSearch() {
        return this.clone({ search: false });
    }

    public setVolume(volume: number) {
        return this.clone({ volume: Math.min(1, Math.max(0, volume)) });
    }
    public setProgress(progress: number) {
        return this.clone({ progress: Math.max(0, progress) });
    }

    public get effectiveVolume(): number {
        return this.muted ? 0 : this.volume;
    }

    public reset() {
        return this.clone({ progress: 0, playing: false });
    }
    public syncAudio(volume: number, muted: boolean) {
        return this.clone({ volume, muted });
    }
}

export type PlayerActions = {
    togglePlay: () => void;
    loadSong: (path: string, automatic_start: boolean) => void;
    toggleRepeat: () => void;
    toggleShuffle: () => void;
    pressShuffle: () => void;
    toggleMute: () => void;

    showSearch: () => void;
    hideSearch: () => void;

    setHome: () => void;
    setSong: () => void;
    setAlbumSection: (album: Album) => void;
    setLyrics: () => void;
    setQueue: () => void;
    setPrevious: () => void;
    setConflicts: () => void;
    setSettings: () => void;
    setSeek: (seconds: number) => void;
    setVolume: (seconds: number) => void;
};
