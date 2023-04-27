import { ClerkProvider } from '@clerk/clerk-react';
import { useColorMode } from '../hooks';
import { dark } from '@clerk/themes';

export const ClerkAuthProvider: FCC = ({ children }) => {
    const { isDarkMode } = useColorMode();

    return (
        <ClerkProvider
            appearance={{ baseTheme: isDarkMode ? dark : undefined }}
            publishableKey={import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY}
        >
            {children}
        </ClerkProvider>
    );
};
