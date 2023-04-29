import type { ToggleSetter } from '../../../hooks';
import type { FC } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { NavItems } from './NavItems';
import { Footer } from './Footer';
import { Fragment } from 'react';
import { Logo } from './Logo';

interface SlidingPanelProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: ToggleSetter;
}

export const SlidingPanel: FC<SlidingPanelProps> = ({ setIsSidebarOpen, isSidebarOpen }) => {
    return (
        <Transition.Root show={isSidebarOpen} as={Fragment}>
            <Dialog as={'div'} className={'relative z-50 xl:hidden '} onClose={setIsSidebarOpen.off}>
                <Transition.Child
                    as={Fragment}
                    enter={'transition-opacity ease-linear duration-300'}
                    enterFrom={'opacity-0'}
                    enterTo={'opacity-100'}
                    leave={'transition-opacity ease-linear duration-300'}
                    leaveFrom={'opacity-100'}
                    leaveTo={'opacity-0'}
                >
                    <div className={'fixed inset-0 bg-gray-900/80'} />
                </Transition.Child>

                <div className={'fixed inset-0 flex'}>
                    <Transition.Child
                        as={Fragment}
                        enter={'transition ease-in-out duration-300 transform'}
                        enterFrom={'-translate-x-full'}
                        enterTo={'translate-x-0'}
                        leave={'transition ease-in-out duration-300 transform'}
                        leaveFrom={'translate-x-0'}
                        leaveTo={'-translate-x-full'}
                    >
                        <Dialog.Panel className={'relative mr-16 flex w-full max-w-xs flex-1'}>
                            <Transition.Child
                                as={Fragment}
                                enter={'ease-in-out duration-300'}
                                enterFrom={'opacity-0'}
                                enterTo={'opacity-100'}
                                leave={'ease-in-out duration-300'}
                                leaveFrom={'opacity-100'}
                                leaveTo={'opacity-0'}
                            >
                                <div className={'absolute left-full top-0 flex w-16 justify-center pt-5'}>
                                    <button type={'button'} className={'-m-2.5 p-2.5'} onClick={setIsSidebarOpen.off}>
                                        <span className={'sr-only'}>Close sidebar</span>
                                        <XMarkIcon className={'h-6 w-6 text-white'} aria-hidden={'true'} />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div
                                className={
                                    'dark:bg-slate-950 flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-200 px-6 ring-1 ring-white/10'
                                }
                            >
                                <Logo />
                                <nav className={'flex flex-1 flex-col'}>
                                    <ul className={'flex flex-1 flex-col gap-y-7'}>
                                        <NavItems setIsSidebarOpen={setIsSidebarOpen} />
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
