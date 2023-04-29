import type { FC } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { ToggleSetter } from '../../../hooks';

interface HamburgerProps {
    setIsSidebarOpen: ToggleSetter;
}

export const Hamburger: FC<HamburgerProps> = ({ setIsSidebarOpen }) => {
    return (
        <div className={'fixed inset-y-0 flex h-16 shrink-0 items-center px-2'}>
            <button
                type={'button'}
                className={'p-2.5 text-gray-700 dark:text-gray-300 lg:hidden'}
                onClick={setIsSidebarOpen.on}
            >
                <span className={'sr-only'}>Open sidebar</span>
                <Bars3Icon className={'h-9 w-9'} aria-hidden={'true'} />
            </button>
        </div>
    );
};
