import { UserButton, useUser } from '@clerk/clerk-react';
import { useColorMode } from '../../../hooks';
import { ColorMode } from '../../ColorMode';
import { dark } from '@clerk/themes';

export const Footer = () => {
    const { isDarkMode } = useColorMode();
    const { user } = useUser();

    return (
        <li className={'-mx-3 mt-auto mb-1 flex justify-between'}>
            <div className={'flex'}>
                <UserButton
                    appearance={{
                        baseTheme: isDarkMode ? dark : undefined,
                        elements: { userButtonBox: 'bg-opacity-100 ml-2 mb-2' },
                    }}
                />
                <span className={'ml-2.5 text-xl dark:text-gray-100'}>{user?.fullName}</span>
            </div>
            <ColorMode />
        </li>
    );
};
