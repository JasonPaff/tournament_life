import { NavItems } from './NavItems';
import { Footer } from './Footer';
import { Logo } from './Logo';

export const FixedPanel = () => {
    return (
        <div className={'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'}>
            <div
                className={
                    'dark:bg-slate-950 flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-200 px-6 ring-1 ring-white/5'
                }
            >
                <Logo />
                <nav className={'flex flex-1 flex-col'}>
                    <ul className={'flex flex-1 flex-col gap-y-7'}>
                        <NavItems />
                        <Footer />
                    </ul>
                </nav>
            </div>
        </div>
    );
};
