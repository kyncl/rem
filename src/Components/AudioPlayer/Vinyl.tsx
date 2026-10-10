import { Track } from "../../lib/audioTypes";

type VinylProps = { spinning: boolean; className?: string; track: Track, progress: number; };

const ARM_START_ANGLE = 18;
const ARM_END_ANGLE = 50;
const ARM_REST_ANGLE = 0;

export const Vinyl = ({ spinning, className, track, progress }: VinylProps) => {
    const playingAngle = track.duration != 0 ?
        (progress / track.duration * ARM_END_ANGLE) + ARM_START_ANGLE : ARM_START_ANGLE;
    const angle = !spinning ? ARM_REST_ANGLE : Math.min(playingAngle, ARM_END_ANGLE);

    return (
        <div className={`relative shrink-0 ${className}`}>
            <div className="relative aspect-square rounded-full border-2 border-foreground/40">
                <div
                    className="relative inset-0 w-full h-full animate-[spin_6s_linear_infinite] rounded-full motion-reduce:animate-none"
                    style={{ animationPlayState: spinning ? "running" : "paused" }}
                >
                    <img src={track?.cover} alt="cover art" className="rounded-full w-full h-full" />
                    <div
                        className="rounded-full z-10 w-full h-full absolute left-0 top-0"
                        style={{
                            background:
                                "repeating-radial-gradient(circle at center, #1b1b1b 0 2px, transparent 2px 4px)",
                        }}
                    />
                </div>
            </div>

            <div
                className="absolute z-20 pointer-events-none"
                style={{
                    top: "-4%",
                    right: "-16%",
                    width: "16%",
                    height: "95%",
                    transformOrigin: "50% 8%",
                    transform: `rotate(${angle}deg)`,
                    transition: "transform 0.8s ease-in-out",
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
