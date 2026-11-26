import { createContext } from 'react';
import type { TabContextProps } from '../types/tabs';

export const TabContext = createContext<TabContextProps | null>(null);
