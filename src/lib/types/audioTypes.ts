export type Album = {
    id: string;
    title?: string;
    artist: string[];
    cover?: string;
    trackCount: number;
};

export type Track = {
    id: string;
    title: string;
    comment: string | null;
    path: string;
    duration: number;
    author: string[];
    isFavorite: boolean;

    diskNumber: number;
};

export type AlbumDisk = {
    number: number;
    trackCount: number;
};