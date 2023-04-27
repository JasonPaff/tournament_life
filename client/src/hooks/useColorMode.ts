import { colorModeContext } from '../provider';
import { useContext } from 'react';

export const useColorMode = () => {
    const { enableDarkMode, enableLightMode, isDarkMode, isLightMode, toggleColorMode } = useContext(colorModeContext);
    return { enableDarkMode, enableLightMode, isDarkMode, isLightMode, toggleColorMode };
};
