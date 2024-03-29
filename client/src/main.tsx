import { queryClient, router, stytch, trpc, trpcClient } from './config';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StytchProvider } from '@stytch/react';
import { TailwindToaster } from './components';
import { ColorModeProvider } from './provider';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/App.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <StytchProvider stytch={stytch}>
                        <ColorModeProvider>
                            <RouterProvider router={router} />
                            <TailwindToaster />
                        </ColorModeProvider>
                    </StytchProvider>
                </QueryClientProvider>
            </trpc.Provider>
        </StrictMode>
    );
}
