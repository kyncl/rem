import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import '../../../css/volumeBar.css';
import { usePlayerInfo } from '../../../hooks';
import { isMobile, vt } from '../../../lib/utils';

interface MuteVolumeButtonProps {
    isHorizontal: boolean;
}

/**
 * This button is primarily meant for computers
 * For phones it doesn't make much sense because you usually don't change
 * sound of app but more likely you change the global sound
 */
export const MuteVolumeButton: React.FC<MuteVolumeButtonProps> = ({
    isHorizontal,
}) => {
    const { playerState, actions } = usePlayerInfo();

    if (isMobile()) return null;

    const shown = playerState.muted ? 0 : playerState.volume;
    const percent = Math.round(shown * 100);
    const Icon =
        shown === 0 ? MdVolumeOff : shown < 0.5 ? MdVolumeDown : MdVolumeUp;

    const slider = (
        <input
            type='range'
            min={0}
            max={1}
            step={0.05}
            value={shown}
            aria-label='Volume'
            onChange={(e) => actions.setVolume(Number(e.target.value))}
            className='volume-slider'
            style={{ '--fill': `${percent}%` } as React.CSSProperties}
        />
    );

    return (
        <div
            className='relative group flex items-center'
            {...vt('mute-volume-btn', 'Song')}
            onWheel={(e) =>
                actions.setVolume(
                    playerState.volume + (e.deltaY < 0 ? 0.05 : -0.05),
                )
            }
        >
            <button
                type='button'
                className='cursor-pointer'
                aria-label={playerState.muted ? 'Unmute' : 'Mute'}
                onClick={actions.toggleMute}
            >
                <Icon size={30} />
            </button>

            {isHorizontal ? (
                <div className='ml-3 w-28'>{slider}</div>
            ) : (
                <div
                    className='absolute bottom-full left-1/2
                    -translate-x-1/2 pb-2 opacity-0
                    pointer-events-none transition-opacity duration-150
                    group-hover:opacity-100 group-hover:pointer-events-auto
                    group-focus-within:opacity-100
                    group-focus-within:pointer-events-auto'
                >
                    <div
                        className='relative h-32 w-9
                    rounded-full bg-background-dark shadow-lg
                    ring-1 ring-foreground/20'
                    >
                        <div
                            className='absolute left-1/2 top-1/2 w-24
                        -translate-x-1/2 -translate-y-1/2 -rotate-90 flex items-center justify-center'
                        >
                            {slider}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
