import {queryClient, router, stytch, trpc, trpcClient} from "./config";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "@tanstack/react-router";
import {StytchProvider} from "@stytch/react";
import {TailwindToaster} from "./components";
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <StytchProvider stytch={stytch}>
                        <RouterProvider router={router} />
                        <ReactQueryDevtools initialIsOpen={false} position={'top-left'} />
                        <TailwindToaster />
                    </StytchProvider>
                </QueryClientProvider>
            </trpc.Provider>
        </StrictMode>
    );
}