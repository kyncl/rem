import type React from 'react';
import type { CSSProperties } from 'react';
import '../../css/progressBar.css';
import { useTabs } from '../../hooks';
import { cn, formatDuration } from '../../lib/utils';

interface ProgressBarProps extends React.ComponentProps<'div'> {
    current: number;
    duration: number;
    onSeek: (seconds: number) => void;
    disabled?: boolean;
}

export const ProgressBar = ({
    current,
    duration,
    onSeek,
    className,
    disabled = false,
    ...props
}: ProgressBarProps) => {
    const { currentTab } = useTabs();

    const isSongTab = currentTab.type === 'Song';
    const percent = duration > 0 ? (current / duration) * 100 : 0;
    return (
        <div
            {...props}
            className={cn(
                'flex gap-2 text-[10px] tabular-nums text-muted',
                isSongTab ? 'flex-col' : 'items-center',
                className,
            )}
        >
            <span className={isSongTab ? 'hidden' : ''}>
                {formatDuration(current)}
            </span>
            <input
                type='range'
                min={0}
                max={duration}
                step={1}
                value={current}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label='Seek'
                style={{ '--progress': `${percent}%` } as CSSProperties}
                className={cn(
                    'progress-range flex-1 w-full min-h-2',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
                disabled={disabled}
            />
            <div className='flex justify-between'>
                <span className={isSongTab ? '' : 'hidden'}>
                    {formatDuration(current)}
                </span>
                <span>{formatDuration(duration)}</span>
            </div>
        </div>
    );
};
