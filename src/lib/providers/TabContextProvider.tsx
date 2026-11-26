import { useState } from 'react';
import { TabContext } from '../contexts/tabContext';
import type { Tab } from '../types/tabs';

interface TabContextProviderProps {
    children: React.ReactNode;
    defaultTab?: Tab;
}

/**
 * Stores tab state and history, and exposes methods to manage manipulate with that state.
 */
export const TabContextProvider: React.FC<TabContextProviderProps> = ({
    children,
    defaultTab,
}) => {
    const [tabHistory, setTabHistory] = useState<Tab[]>([]);
    const [currentTab, setCurrentTab] = useState<Tab>(
        defaultTab ?? { type: 'Home' },
    );

    const changeTo = (targetTab: Tab) => {
        // You cannot change to the exact tab you currently are.
        if (currentTab !== targetTab) {
            setTabHistory([...tabHistory, currentTab]);
            setCurrentTab(targetTab);
        }
    };

    const changeToPrevious = () => {
        const newTabHistory = [...tabHistory];
        const previousTab = newTabHistory.pop();
        setTabHistory(newTabHistory);
        setCurrentTab(previousTab ?? { type: 'Home' });
    };

    return (
        <TabContext.Provider
            value={{
                currentTab,
                tabHistory,
                previousTab: tabHistory[tabHistory.length - 1] ?? null,
                changeTo,
                changeToPrevious,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};
