import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useColorMode } from '../hooks';

export const ColorMode = () => {
    const { isDarkMode, isLightMode, toggleColorMode } = useColorMode();

    return (
        <div>
            {/* LIGHT MODE */}
            {isDarkMode && (
                <SunIcon
                    className={'h-7 w-7 cursor-pointer text-yellow-400 hover:text-opacity-75'}
                    onClick={toggleColorMode}
                />
            )}

            {/* DARK MODE */}
            {isLightMode && (
                <MoonIcon
                    className={'h-7 w-7 cursor-pointer text-gray-400 hover:text-opacity-75'}
                    onClick={toggleColorMode}
                />
            )}
        </div>
    );
};
