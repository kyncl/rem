import { usePlayerInfo, useSwipe } from '../../hooks';
import { vt, withTransition } from '../../lib/utils';
import { CreatorLink } from '../General/ArtistLink';
import { MuteVolumeButton } from './Controls/MuteVolumeButton';
import { PlayPauseButton } from './Controls/PlayPauseButton';
import { ProgressBar } from './Progressbar';
import { Vinyl } from './Vinyl';

export const MiniPlayer = () => {
    const miniPlayerInfo = usePlayerInfo();

    const expand = () => withTransition(miniPlayerInfo.actions.setSong, 'Song');
    // Swipe up (or tap) on the vinyl / title area pulls the full player up
    const swipe = useSwipe({ onUp: miniPlayerInfo.actions.setSong });

    const noSongSelected = miniPlayerInfo.track === null;

    return (
        <div
            {
                /* Because Album makes the transition broken, we will make exception */
                ...vt('mini-player', 'Album')
            }
            className='rounded-3xl border
            fixed bottom-4 w-21/22
            bg-background-dark
            left-1/2
            -translate-x-1/2
            border-foreground/30 bg-card-bg p-3 z-50'
        >
            <div className='flex items-center gap-3'>
                <button
                    {...swipe}
                    onClick={expand}
                    aria-label='Open player'
                    className='flex min-w-0 flex-1
                    cursor-pointer touch-none items-center gap-3 text-left'
                >
                    <div {...vt('player-vinyl', 'Song')}>
                        <Vinyl
                            progress={miniPlayerInfo.playerState.progress}
                            track={miniPlayerInfo.track}
                            spinning={miniPlayerInfo.playerState.playing}
                            className='w-14'
                        />
                    </div>
                    <span className='min-w-0'>
                        <span
                            {...vt('player-title', 'Song')}
                            className='block truncate text-lg font-medium
                        leading-tight'
                        >
                            {miniPlayerInfo.track?.title ??
                                'Nothing playing...'}
                        </span>
                        <span
                            {...vt('player-author', 'Song')}
                            className='flex gap-2'
                        >
                            {miniPlayerInfo.track?.author?.map((_, index) => {
                                // This will pass the song author id instead
                                const creatorId = index;
                                return (
                                    <CreatorLink
                                        key={`${creatorId}`}
                                        creatorId={creatorId}
                                        className='text-sm text-muted'
                                    />
                                );
                            })}
                        </span>
                    </span>
                </button>

                <MuteVolumeButton isHorizontal={false} />

                <PlayPauseButton
                    size='normal'
                    isPlaying={miniPlayerInfo.playerState.playing}
                    onClick={miniPlayerInfo.actions.togglePlay}
                    disabled={noSongSelected}
                    {...vt('play-pause-btn', 'Song')}
                />
            </div>

            <div {...vt('progress-bar', 'Song')}>
                <ProgressBar
                    current={miniPlayerInfo.playerState.progress}
                    duration={miniPlayerInfo.track?.duration ?? 0}
                    onSeek={miniPlayerInfo.actions.setSeek}
                    className='mt-3'
                    disabled={noSongSelected}
                />
            </div>
        </div>
    );
};
