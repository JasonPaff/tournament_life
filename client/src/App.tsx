import { ClerkAuthProvider, ColorModeProvider, QueryProvider } from './providers';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { RouteProvider } from './providers';

export const App = () => {
    return (
        <ColorModeProvider>
            <ClerkAuthProvider>
                <SignedIn>
                    <QueryProvider>
                        <RouteProvider />
                    </QueryProvider>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ClerkAuthProvider>
        </ColorModeProvider>
    );
};
