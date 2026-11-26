import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { TabContextProvider } from './lib/providers/TabContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <TabContextProvider>
            <App />
        </TabContextProvider>
    </React.StrictMode>,
);
