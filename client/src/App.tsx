import { ClerkAuthProvider, ColorModeProvider, TrpcProvider } from './provider';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { RouterProvider } from '@tanstack/react-router';
import { Header, TailwindToaster } from './components';
import { router } from './config';

export const App = () => {
    return (
        <ColorModeProvider>
            <ClerkAuthProvider>
                <SignedIn>
                    <TrpcProvider>
                        <Header />
                        <RouterProvider router={router} />
                        <TailwindToaster />
                    </TrpcProvider>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ClerkAuthProvider>
        </ColorModeProvider>
    );
};
