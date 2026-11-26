import { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { usePlayerInfo } from '../../hooks';
import { useSearch } from '../../hooks/middleware';
import { cn } from '../../lib/utils';

interface Result {
    text: string;
    desc: string;
    path: string;
}

export const Search = ({
    searchInMiddle = true,
}: {
    searchInMiddle?: boolean;
}) => {
    const [results, setResults] = useState<Result[]>([]);
    const MIN_CH = 18;
    const MAX_CH = 40;
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const chars = Math.min(Math.max(value.length, MIN_CH), MAX_CH);
    const playerInfo = usePlayerInfo();

    const { status, tracks } = useSearch({ query: value });

    const handlePlayTrack = (path: string) => {
        console.log('trying to play');
        playerInfo.actions.loadSong(path, true);
    };

    useEffect(() => {
        if (status !== 'ready') return;
        const newResults = tracks.map(
            (track): Result => ({
                text: track.title,
                path: track.path,
                desc: track.comment ?? '',
            }),
        );

        setResults(newResults);
    }, [status, tracks]);

    useEffect(() => {
        if (playerInfo.playerState.search !== showInput) {
            setShowInput(playerInfo.playerState.search);
            inputRef.current?.focus();
        }
    }, [playerInfo.playerState, showInput]);

    return (
        <div className='flex items-center'>
            <button
                type='button'
                className='cursor-pointer'
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                    setShowInput(!showInput);
                    if (showInput) {
                        playerInfo.actions.hideSearch();
                        inputRef.current?.blur();
                    } else {
                        playerInfo.actions.showSearch();
                        inputRef.current?.focus();
                    }
                }}
            >
                <IoSearch size={30} />
            </button>

            <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                    playerInfo.actions.hideSearch();
                    setShowInput(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setShowInput(false);
                        inputRef.current?.blur();
                    }
                }}
                style={{ width: showInput ? `calc(${chars}ch + 1.5rem)` : 0 }}
                className={`rounded-xl bg-background py-1
                    transition-[width,margin,padding,opacity] duration-300 ease-in-out
                    ${showInput ? 'ml-5 px-3 opacity-100' : 'ml-0 px-0 opacity-0'}`}
            />
            {/*
                I mean it will look weird, when the Search Icon is on left,
                but I want to go to eat my dinner :(

                ig we can delete the middle option, since it will be always in the middle 
            */}
            <ul
                className={cn(
                    'fixed sm:max-h-106 overflow-y-auto',
                    'z-50 left-1/2 -translate-x-1/2',
                    !searchInMiddle && 'sm:left-0 sm:translate-x-0',
                    'sm:top-15 top-14 min-w-full',
                    'sm:min-w-120 overflow-hidden sm:rounded-2xl',
                    'rounded-b-2xl max-h-191',
                    'bg-background-dark border border-foreground/20',
                    !showInput && 'hidden',
                )}
                onMouseDown={(e) => e.preventDefault()}
            >
                {results.map((result, i) => (
                    <li
                        key={result.path}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className='animate-fly-in border-b-foreground/30 not-last:border-b hover:bg-background'
                    >
                        <button
                            type='button'
                            onClick={() => handlePlayTrack(result.path)}
                            className='w-full
                        pl-6 pt-5 pb-3
                        h-full text-left cursor-pointer'
                        >
                            <h4 className='text-xl'>{result.text}</h4>
                            <h5 className='text-3xs'>{result.desc}</h5>
                        </button>
                    </li>
                ))}
                {results.length === 0 && (
                    <li className='h-191 sm:h-106 text-center text-xl text-muted'>
                        <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 '>
                            Nothing found
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};
