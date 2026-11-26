import { FaHome } from 'react-icons/fa';
import { cn } from '../../lib/utils';

interface AppLogoProps extends React.ComponentProps<'div'> {}

export const AppLogo: React.FC<AppLogoProps> = ({ ...props }) => {
    const { className } = props;

    return (
        <div {...props} className={cn(className, 'aspect-square')} title='REM'>
            {/*I'm gonna puke from that white square*/}
            <FaHome size={30} />
            {/* The app logo/icon */}
        </div>
    );
};
