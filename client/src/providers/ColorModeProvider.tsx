import { useBrowserStorage, useToggle } from '../hooks';
import { createContext, useEffect } from 'react';
import { StorageKeys } from '../configs';

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

export const ColorModeProvider: FCC = ({ children }) => {
    const { getFromLocalStorage, saveToLocalStorage } = useBrowserStorage();
    const [isDarkMode, setIsDarkMode] = useToggle();

    // Set the initial dark mode based on the property in local storage, if available.
    useEffect(() => {
        const isDark = getFromLocalStorage<boolean>(StorageKeys.tournament_life_dark_mode);
        isDark ? enableDarkMode() : enableLightMode();
    }, []);

    // Enable dark mode.
    const enableDarkMode = () => {
        setIsDarkMode.on();
        document.querySelector('html')?.classList.add('dark');
        saveToLocalStorage(StorageKeys.tournament_life_dark_mode, true);
    };

    // Enable light mode.
    const enableLightMode = () => {
        setIsDarkMode.off();
        document.querySelector('html')?.classList.remove('dark');
        saveToLocalStorage(StorageKeys.tournament_life_dark_mode, false);
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
