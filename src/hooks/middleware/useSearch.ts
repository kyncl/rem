import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import type { Track } from '../../lib/types';
import type { BackendResponse, RawTrack } from '../../lib/types/middleware';

interface SearchedTracks {
    tracks: Track[];
}

interface SearchArgs {
    query: string;
}

/**
 * Fetches tracks from the backend using a query.
 */
export const useSearch = ({ query }: SearchArgs) => {
    const [response, setResponse] = useState<BackendResponse<SearchedTracks>>(
        () => ({ status: 'waiting' }),
    );

    useEffect(() => {
        const process = async () => {
            const rawTracks = (await invoke('search', {
                query: query,
            })) as RawTrack[];

            const tracks = rawTracks.map(
                (rawTrack): Track => ({
                    id: rawTrack.id,
                    title: rawTrack.title,
                    comment: rawTrack.comment,
                    duration: rawTrack.duration,
                    isFavorite: rawTrack.is_favorite,
                    path: rawTrack.path,
                    diskNumber: 1, // TODO: Actual disk number, or remove
                    author: ['Author 1', 'Author 1'], // TODO: Real authors, or remove
                }),
            );

            setResponse({
                status: 'ready',
                tracks: tracks,
            });
        };
        process();
    }, [query]);

    return response;
};
