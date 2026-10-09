import { AlbumSection } from "../Components/Sections/AlbumSection";
import { Conflicts } from "../Components/Sections/Conflicts";
import { Home } from "../Components/Sections/Home";
import { Lyrics } from "../Components/Sections/Lyrics";
import { Settings } from "../Components/Sections/Settings";
import { Song } from "../Components/Sections/Song";
import { SongQueue } from "../Components/Sections/SongQueue";
import { Album } from "./audioTypes";

export type Tabs = "Home" | "Album" | "Song" | "Queue" | "Lyrics" | "Settings" | "Conflicts";
export const render = (currentTab: Tabs, albums: Album[]) => {
    switch (currentTab) {
        case "Home":
            return <Home albums={albums} />;
        case "Song":
            return <Song />;
        case "Album":
            return <AlbumSection />;
        case "Queue":
            return <SongQueue />;
        case "Lyrics":
            return <Lyrics />;
        case "Conflicts":
            return <Conflicts />;
        case "Settings":
            return <Settings />;
    }
};
