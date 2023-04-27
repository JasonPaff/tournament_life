import { ClerkAuthProvider, ColorModeProvider, DevProvider, QueryProvider } from './provider';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Header, Sidebar, TailwindToaster } from './components';
import { RouteProvider } from './provider';

export const App = () => {
    return (
        <ColorModeProvider>
            <ClerkAuthProvider>
                <SignedIn>
                    <QueryProvider>
                        <RouteProvider />
                        <Header />
                        <Sidebar />
                        <TailwindToaster />
                    </QueryProvider>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ClerkAuthProvider>
        </ColorModeProvider>
    );
};
