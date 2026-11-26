import { IoPause, IoPlay } from 'react-icons/io5';
import { cn } from '../../../lib/utils';

interface PlayPauseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPlaying: boolean;
    size: 'large' | 'normal';
}

/**
 * Circular Play / Pause button used by players.
 */
export const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
    isPlaying,
    size,
    disabled = false,
    className,
    ...props
}) => {
    const iconSize = size === 'normal' ? 20 : 40;
    return (
        <button
            {...props}
            aria-label={isPlaying ? 'Pause (P)' : 'Play (P)'}
            title={isPlaying ? 'Pause (P)' : 'Play (P)'}
            className={cn(
                'grid size-11 shrink-0 place-items-center rounded-full border',
                'border-foreground/40 transition-colors',
                'disabled:opacity-50 hover:bg-hover-bg',
                disabled
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:bg-foreground/10',
                size === 'normal' ? 'size-11' : 'size-15',
                className,
            )}
            disabled={disabled}
        >
            {isPlaying ? (
                <IoPause size={iconSize} />
            ) : (
                <IoPlay size={iconSize} />
            )}
        </button>
    );
};
