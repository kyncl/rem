import { useContext } from 'react';
import { TabContext } from '../lib/contexts/tabContext';

export const useTabs = () => {
    const context = useContext(TabContext);
    if (context === null)
        throw new Error('useTabs can be only used inside TabContextProvider');
    return context;
};
