import { colorModeContext } from '../provider';
import { useContext } from 'react';

interface UseColorMode {
    enableLightMode: () => void;
    isLightMode: boolean;
    isDarkMode: boolean;
    toggleColorMode: () => void;
    enableDarkMode: () => void;
}

export const useColorMode = (): UseColorMode => {
    const { enableDarkMode, enableLightMode, isDarkMode, isLightMode, toggleColorMode } = useContext(colorModeContext);
    return { isDarkMode, isLightMode, enableDarkMode, enableLightMode, toggleColorMode };
};