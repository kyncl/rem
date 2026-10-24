import { CSSProperties } from 'react';
import { cn } from '../../lib/utils';
import { PLACEHOLDER } from '../../media';

interface VinylDiskProps extends React.ComponentProps<"div"> {
    coverArt?: string;
    spinning?: boolean;
    spinDelay?: CSSProperties['animationDelay'];
}

export const VinylDisk: React.FC<VinylDiskProps> = ({ coverArt, spinning = false, spinDelay = '0', className, style, ...props }) => {
    // const oldDesign = (
    //     <>
    //         <img src={coverArt} alt="cover art" className="rounded-full w-full h-full" />
    //         <div
    //             className="rounded-full z-10 w-full h-full absolute left-0 top-0"
    //             style={{
    //                 background:
    //                     "repeating-radial-gradient(circle at center, #1b1b1b 0 2px, transparent 2px 4px)",
    //             }}
    //         />
    //     </>
    // );

    const newDesign = (
        <>
            <div
                className="rounded-full w-full h-full absolute left-0 top-0"
                style={{
                    background:
                        "repeating-radial-gradient(circle at center, #1b1b1b 0 2px, transparent 2px 4px)",
                }}
            />
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        "conic-gradient(transparent 0 20%, rgba(255,255,255,.14) 25%, transparent 30% 70%, rgba(255,255,255,.14) 75%, transparent 80%)",
                }}
            />
            <div className="absolute inset-[23%] grid place-items-center rounded-full">
                <div
                    style={{ backgroundImage: `url(${coverArt ?? PLACEHOLDER})` }}
                    className="rounded-full w-full h-full bg-cover bg-center"
                />
                <div className="size-[12%] rounded-full bg-background z-15 absolute" />
            </div>
        </>
    );

    return (
        <div {...props} className={cn(className, "relative aspect-square rounded-full border-2 border-foreground/40")}>
            <div
                className="vinyl-spin relative inset-0 w-full h-full animate-[spin_6s_linear_infinite] rounded-full motion-reduce:animate-none"
                style={{
                    animationPlayState: spinning ? "running" : "paused",
                    animationDelay: spinDelay,
                }}
            >
                {newDesign}
                {/*oldDesign*/}
            </div>
        </div>
    );
};