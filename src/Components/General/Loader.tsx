interface LoaderProps extends React.ComponentProps<'div'> {}

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
    return (
        <div {...props}>
            {/* Room for a banger animation ;) */}
            <p className='tracking-wider font-light text-sm'>LOADING...</p>
        </div>
    );
};
