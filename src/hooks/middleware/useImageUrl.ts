import { useEffect, useState } from 'react';
import { BackendResponse } from '../../lib/types';
import { invoke } from '@tauri-apps/api/core';

interface TrackCover {
    imageUrl?: string;
}

interface TrackCoverArgs {
    trackPath: string;
}

/**
 * Fetches the raw track image bytes and then creates a usable url using a blob.
 */
export const useTrackCover = ({ trackPath: path }: TrackCoverArgs) => {
    const [rawImgData, setRawImgData] = useState<number[] | null>(null);
    const [response, setResponse] = useState<BackendResponse<TrackCover>>(() => ({ status: 'waiting' }));

    useEffect(() => {
        const process = async () => {
            try {
                const data = await invoke<number[]>("get_raw_img", { path });
                setRawImgData(data);
            }
            catch {
                setResponse({ status: 'ready', imageUrl: undefined });
            }
        };
        process();
    }, [path]);

    useEffect(() => {
        if (rawImgData === null) return;

        const url = URL.createObjectURL(
            new Blob([new Uint8Array(rawImgData)], { type: "image/jpeg" })
        );

        setResponse({
            status: 'ready',
            imageUrl: url
        });

        return () => URL.revokeObjectURL(url);
    }, [rawImgData]);

    return response;
};
