import { useContext } from 'react';
import { CurrPlayingContext } from '../lib/contexts/globalContext';

export const usePlayerInfo = () => {
    const context = useContext(CurrPlayingContext);
    if (context === null)
        throw new Error(
            'usePlayerInfo can be only used inside CurrPlayingContext',
        );
    return context;
};
