import { useEffect, useState } from "react";
import { Track } from "../../lib/types/audioTypes";
import { VinylDisk } from './VinylDisk';
import { useTrackCover } from '../../hooks/middleware';

type VinylProps = { spinning: boolean; className?: string; track: Track | null, progress: number; };

const ARM_START_ANGLE = 18;
const ARM_END_ANGLE = 30;
const ARM_REST_ANGLE = 0;
const MIN_ANGLE_STEP = 1;

const TRANSITION_TIME_MS = 800;

export const Vinyl = ({ spinning, className, track, progress }: VinylProps) => {
    const duration = track?.duration ?? 0;
    const ratio = duration > 0 && Number.isFinite(progress)
        ? Math.min(Math.max(progress / duration, 0), 1)
        : 0;
    const targetAngle = spinning
        ? ARM_START_ANGLE + (ARM_END_ANGLE - ARM_START_ANGLE) * ratio
        : ARM_REST_ANGLE;

    const [angle, setAngle] = useState(targetAngle);
    const [spinDelay] = useState(() => `-${performance.now() % 6000}ms`);
    const coverArt = useTrackCover({ trackPath: track?.path ?? '' });
    const [vinylCanSpin, setVinylCanSpin] = useState<boolean>(false);

    useEffect(() => {
        setAngle(prev =>
            Math.abs(targetAngle - prev) > MIN_ANGLE_STEP ? targetAngle : prev
        );
    }, [targetAngle, progress]);

    useEffect(() => {
        if (!spinning) {
            setVinylCanSpin(false);
            return;
        }

        const id = setTimeout(() => {
            setVinylCanSpin(true);
        }, TRANSITION_TIME_MS);

        return () => {
            clearTimeout(id);
        };
    }, [spinning]);

    return (
        <div className={`relative shrink-0 ${className}`}>
            <VinylDisk coverArt={coverArt.imageUrl} spinning={vinylCanSpin} spinDelay={spinDelay} id="true" />
            <div
                className="absolute z-1 pointer-events-none"
                style={{
                    top: "-4%",
                    right: "-16%",
                    width: "16%",
                    height: "95%",
                    transformOrigin: "50% 8%",
                    transform: `rotate(${angle}deg)`,
                    transition: `transform ${TRANSITION_TIME_MS}ms ease-in-out`
                }}
            >
                {/* Pivot base */}
                <div className="absolute left-1/2 top-0 h-[16%] aspect-square -translate-x-1/2 rounded-full bg-neutral-700 border-2 border-neutral-500 shadow-lg" />
                {/* Arm */}
                <div className="absolute left-1/2 top-[8%] h-[78%] w-[18%] -translate-x-1/2 rounded-full bg-linear-to-r from-neutral-400 to-neutral-600 shadow-md" />
                {/* Headshell with needle */}
                <div className="absolute left-1/2 bottom-0 h-[14%] w-[55%] -translate-x-1/2 rounded-sm bg-neutral-800 border border-neutral-500 shadow-md" />
            </div>
        </div>
    );
};
