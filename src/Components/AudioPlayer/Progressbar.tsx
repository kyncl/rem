import { CSSProperties } from "react";
import "../../css/progressBar.css";
import { useTabs } from '../../hooks/useTabs';
import { formatDuration } from '../../lib/utils';

type ProgressBarProps = {
    current: number;
    duration: number;
    onSeek: (seconds: number) => void;
    className?: string;
};

export const ProgressBar = ({ current, duration, onSeek, className = "" }: ProgressBarProps) => {
    const { currentTab } = useTabs();

    const isSongTab = currentTab.type === "Song";
    const percent = duration > 0 ? (current / duration) * 100 : 0;
    return (
        <div className={`flex gap-2 text-[10px]
            ${isSongTab ? "flex-col" : "items-center"}
            tabular-nums text-muted ${className}`}>
            <span className={isSongTab ? "hidden" : ""}>{formatDuration(current)}</span>
            <input
                type="range"
                min={0}
                max={duration}
                step={1}
                value={current}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Seek"
                style={{ "--progress": `${percent}%` } as CSSProperties}
                className="progress-range flex-1 w-full min-h-2"
            />
            <div className="flex justify-between">
                <span className={isSongTab ? "" : "hidden"}>{formatDuration(current)}</span>
                <span>{formatDuration(duration)}</span>
            </div>
        </div>
    );
};
