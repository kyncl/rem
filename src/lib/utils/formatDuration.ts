
/**
 * Formats seconds to the HH:mm:ss format.
 */
export const formatDuration = (seconds: number, includeHours: boolean = false, separator: string = ':') => {
    if (seconds < 0) seconds = 0;

    const formatRepeating = (value: number) => String(Math.floor(value % 60)).padStart(2, '0');

    const minutes = seconds / 60.0;

    if (includeHours) {
        const hours = minutes / 60.0;
        return `${Math.floor(hours)}${separator}${formatRepeating(minutes)}${separator}${formatRepeating(seconds)}`;
    } else {
        return `${Math.floor(minutes)}${separator}${formatRepeating(seconds)}`;
    }
};