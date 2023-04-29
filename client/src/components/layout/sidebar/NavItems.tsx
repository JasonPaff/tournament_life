import type { ToggleSetter } from '../../../hooks';
import type { FC } from 'react';

import { Link } from '@tanstack/router';
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
} from '@heroicons/react/24/outline';

interface NavItemProps {
    setIsSidebarOpen?: ToggleSetter;
}

export const NavItems: FC<NavItemProps> = ({ setIsSidebarOpen }) => {
    const styles: Record<'base' | 'active' | 'inActive', string> = {
        base: 'flex gap-x-3 p-2 leading-6',
        active: 'bg-gray-800 text-white flex rounded-lg font-bold',
        inActive:
            'font-semibold flex text-gray-500 rounded-lg hover:dark:text-white hover:text-white dark:text-gray-500 font-bold hover:bg-gray-800',
    };

    return (
        <li>
            <ul className={'-mx-2 space-y-1'}>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/tournaments'}
                    >
                        <div className={styles.base}>
                            <FolderIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Tournaments
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/template-builder'}
                    >
                        <div className={styles.base}>
                            <ServerIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Template Builder
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/session-builder'}
                    >
                        <div className={styles.base}>
                            <SignalIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Session Builder
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/bankroll'}
                    >
                        <div className={styles.base}>
                            <GlobeAltIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Bankroll
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/statistics'}
                    >
                        <div className={styles.base}>
                            <ChartBarSquareIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Statistics
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        activeProps={{ className: styles.active }}
                        inactiveProps={{ className: styles.inActive }}
                        onClick={setIsSidebarOpen?.off}
                        to={'/settings'}
                    >
                        <div className={styles.base}>
                            <Cog6ToothIcon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            Settings
                        </div>
                    </Link>
                </li>
            </ul>
        </li>
    );
};
