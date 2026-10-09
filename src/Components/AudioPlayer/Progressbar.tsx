const format = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

type ProgressBarProps = {
    current: number;
    duration: number;
    onSeek: (seconds: number) => void;
    className?: string;
};

export const ProgressBar = ({ current, duration, onSeek, className = "" }: ProgressBarProps) => {
    return (
        <div className={`flex items-center gap-2 text-[10px] tabular-nums text-muted ${className}`}>
            <span>{format(current)}</span>
            <input
                type="range"
                min={0}
                max={duration}
                step={1}
                value={current}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Seek"
                className="h-1 flex-1 cursor-pointer accent-main"
            />
            <span>{format(duration)}</span>
        </div>
    );
};
