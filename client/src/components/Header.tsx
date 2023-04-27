import { UserButton } from '@clerk/clerk-react';
import { ColorMode } from './ColorMode';
import { useColorMode } from '../hooks';
import { dark } from '@clerk/themes';

export const Header = () => {
    const { isDarkMode } = useColorMode();

    return (
        <div className={'flex justify-end bg-gray-100 dark:bg-gray-900'}>
            <ColorMode />
            <UserButton
                appearance={{
                    baseTheme: isDarkMode ? dark : undefined,
                    elements: { userButtonBox: 'dark:bg-gray-900 bg-gray-100 mr-5 mt-2' },
                }}
            />
        </div>
    );
};
