import { cn } from '../../lib/utils';

interface CreatorLinkProps extends React.ComponentProps<'button'> {
    creatorId: number;
}

export const CreatorLink: React.FC<CreatorLinkProps> = ({
    creatorId,
    className,
    ...props
}) => {
    const creatorName = `Artist ${creatorId}`; // Replaced with actual value

    const handleShowCreator = () => {
        console.log('Show creator id:', creatorId);
    };

    // Hardcoded "Artist" will be removed when we can get the artist name directly
    // either from the DB here or pass it in the props also
    return (
        <button
            type='button'
            {...props}
            className={cn(
                className,
                'cursor-pointer hover:underline inline-block',
            )}
            onClick={handleShowCreator}
            title={`View ${creatorName}`}
        >
            <p>{creatorName}</p>
        </button>
    );
};
