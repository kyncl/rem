import { useEffect, useState } from 'react';
import { BackendResponse, Track } from '../../lib/types';
import { invoke } from '@tauri-apps/api/core';

interface RawTrack {
    id: string;
    title: string;
    comment: string | null;
    duration: number;
    is_favorite: boolean;
    path: string;
}

interface AllTracks {
    tracks: Track[];
}

/**
 * Fetches all tracks from the backend.
 */
export const useAllTracks = () => {
    const [response, setResponse] = useState<BackendResponse<AllTracks>>(() => ({ status: 'waiting' }));

    useEffect(() => {
        const process = async () => {
            const rawTracks = await invoke("get_all_tracks") as RawTrack[];

            const tracks = rawTracks
                .slice(0, 10)
                .map((rawTrack): Track => ({
                    id: rawTrack.id,
                    title: rawTrack.title,
                    comment: rawTrack.comment,
                    duration: rawTrack.duration,
                    isFavorite: rawTrack.is_favorite,
                    path: rawTrack.path,
                    diskNumber: 1, // TODO: Actual disk number, or remove
                    author: ['Author 1', 'Author 1'] // TODO: Real authors, or remove
                }));

            setResponse({
                status: 'ready',
                tracks: tracks,
            });
        };
        process();
    }, []);

    return response;
};