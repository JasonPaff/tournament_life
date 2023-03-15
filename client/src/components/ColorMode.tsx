import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useColorMode } from '../hooks';

export const ColorMode = () => {
    const { isDarkMode, isLightMode, toggleColorMode } = useColorMode();

    return (
        <div>
            {isDarkMode && <SunIcon className={'mt-1 h-7 w-7 text-yellow-400'} onClick={toggleColorMode} />}
            {isLightMode && <MoonIcon className={'mt-1 h-7 w-7 text-gray-400'} onClick={toggleColorMode} />}
        </div>
    );
};