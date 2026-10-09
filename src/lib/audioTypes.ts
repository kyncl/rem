export type Album = {
    id: string;
    title?: string;
    artist: string[];
    cover?: string;
};

export type Track = {
    id: string;
    path: string;
    title?: string;
    author: string[];
    duration: number;
    cover?: string;
};


export const toTrack = (album: Album, path: string, duration: number): Track => ({
    id: album.id,
    title: album.title,
    author: album.artist,
    duration: duration,
    cover: album.cover,
    path: path
});
