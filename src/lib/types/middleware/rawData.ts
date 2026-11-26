export interface RawTrack {
    id: string;
    title: string;
    comment: string | null;
    duration: number;
    is_favorite: boolean;
    path: string;
}
