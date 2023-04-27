import { UserButton, useUser } from '@clerk/clerk-react';
import { Dialog, Transition } from '@headlessui/react';
import { useColorMode } from '../../hooks';
import { Fragment, useState } from 'react';
import { ColorMode } from '../ColorMode';
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { dark } from '@clerk/themes';
import clsx from 'clsx';

import type { FC } from 'react';

export const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <SlidingPanel setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className={'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'}>
                <div className={'flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5'}>
                    <Logo />
                    <nav className={'flex flex-1 flex-col'}>
                        <ul className={'flex flex-1 flex-col gap-y-7'}>
                            <NavItems />
                            <Footer />
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Logo = () => {
    return <div className={'flex h-16 shrink-0 items-center text-2xl dark:text-white'}>Tournament Life</div>;
};

const NavItems = () => {
    const navigation = [
        { name: 'Tournaments', href: '#', icon: FolderIcon, current: false },
        { name: 'Template Builder', href: '#', icon: ServerIcon, current: true },
        { name: 'Session Builder', href: '#', icon: SignalIcon, current: false },
        { name: 'Bankroll', href: '#', icon: GlobeAltIcon, current: false },
        { name: 'Tournament Stats', href: '#', icon: ChartBarSquareIcon, current: false },
        { name: 'Session Stats', href: '#', icon: ChartBarSquareIcon, current: false },
        { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
    ];

    return (
        <li>
            <ul className={'-mx-2 space-y-1'}>
                {navigation.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={clsx(
                                item.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-600 hover:bg-gray-800 hover:text-white dark:text-gray-400',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                            )}
                        >
                            <item.icon className={'h-6 w-6 shrink-0'} aria-hidden={'true'} />
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    );
};

const Footer = () => {
    const { isDarkMode } = useColorMode();
    const { user } = useUser();

    return (
        <li className={'-mx-3 mt-auto mb-1 flex space-x-2'}>
            <UserButton
                appearance={{
                    baseTheme: isDarkMode ? dark : undefined,
                    elements: { userButtonBox: 'bg-opacity-100 ml-2 mb-2' },
                }}
            />
            <span className={'text-xl dark:text-gray-100'}>{user?.fullName}</span>
            <ColorMode />
        </li>
    );
};

interface SlidingPanelProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const SlidingPanel: FC<SlidingPanelProps> = ({ setSidebarOpen, sidebarOpen }) => {
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button
                                        type="button"
                                        className="-m-2.5 p-2.5"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                                <Logo />
                                <nav className="flex flex-1 flex-col">
                                    <ul className="flex flex-1 flex-col gap-y-7">
                                        <NavItems />
                                        <Footer />
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
