import { createContext, useEffect } from 'react';
import { useToggle } from '../hooks';

import type { PropsWithChildren } from 'react';

interface ColorModeContext {
    enableDarkMode: () => void;
    enableLightMode: () => void;
    isDarkMode: boolean;
    isLightMode: boolean;
    toggleColorMode: () => void;
}

export const colorModeContext = createContext<ColorModeContext>({
    isDarkMode: false,
    isLightMode: true,
    enableDarkMode: () => null,
    enableLightMode: () => null,
    toggleColorMode: () => null,
});

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
    const [isDarkMode, setIsDarkMode] = useToggle();

    const darkModeLocalStorageName = 'tournament_life_dark_mode';

    // Set the initial dark mode based on the property in local storage, if available.
    useEffect(() => {
        const isDark = localStorage.getItem(darkModeLocalStorageName) == 'true';
        isDark ? enableDarkMode() : enableLightMode();
    }, []);

    // Enable dark mode.
    const enableDarkMode = () => {
        setIsDarkMode.on();
        document.querySelector('html')?.classList.add('dark');
        localStorage.setItem(darkModeLocalStorageName, 'true');
    };

    // Enable light mode.
    const enableLightMode = () => {
        setIsDarkMode.off();
        document.querySelector('html')?.classList.remove('dark');
        localStorage.setItem(darkModeLocalStorageName, 'false');
    };

    // Toggle between light mode and dark mode.
    const toggleColorMode = () => (isDarkMode ? enableLightMode() : enableDarkMode());

    return (
        <colorModeContext.Provider
            value={{
                isDarkMode: isDarkMode,
                isLightMode: !isDarkMode,
                enableDarkMode: enableDarkMode,
                enableLightMode: enableLightMode,
                toggleColorMode: toggleColorMode,
            }}
        >
            {children}
        </colorModeContext.Provider>
    );
};
