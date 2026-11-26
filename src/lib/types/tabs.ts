import type { Album } from './audioTypes';

// These are NOT tab state objects, think of them as recipe for the tab.
// The type, which has to be in each one, is the main address in the router.
// Other data specifies how will it actually it work. For example, the AlbumTab
// needs to know which album it should display.

export interface HomeTab {
    type: 'Home';
}

export interface AlbumTab {
    type: 'Album';
    // This will change to albumId, the whole state of the album
    // should never be sent, this is temporary before DB.
    // Later, each tab will fetch its data from the backend.
    album: Album;
}

export interface SongTab {
    type: 'Song';
}

export interface QueueTab {
    type: 'Queue';
}

export interface LyricsTab {
    type: 'Lyrics';
}

export interface SettingsTab {
    type: 'Settings';
}

export interface ConflictsTab {
    type: 'Conflicts';
}

export type Tab =
    | HomeTab
    | AlbumTab
    | SongTab
    | QueueTab
    | LyricsTab
    | SettingsTab
    | ConflictsTab;

export type TabType = Tab['type'];

/**
 * Which tab data are exposed to other components.
 * previousTab is taken from tabHistory
 */
export interface TabContextProps {
    currentTab: Tab;
    previousTab: Tab | null;
    tabHistory: Tab[];
    changeTo: (targetTab: Tab) => void;
    changeToPrevious: () => void;
}
