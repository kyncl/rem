import type { IconType } from 'react-icons';
import { cn } from '../../lib/utils';

interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconType;
    iconSize?: number;
    buttonSize?: 'large' | 'small';
}

/**
 * General button that uses a react icon.
 */
export const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    iconSize = 40,
    buttonSize = 'large',
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            className={cn(
                'grid shrink-0 place-items-center rounded-full',
                'transition-colors',
                'disabled:opacity-50 hover:bg-hover-bg',
                'hover:bg-foreground/10',
                buttonSize === 'large' ? 'size-11' : 'size-7',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            disabled={disabled}
        >
            {<Icon size={iconSize} />}
        </button>
    );
};
