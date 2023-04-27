import { Link } from '@tanstack/react-router';

export const NavBar = () => {
    return (
        <div className={'flex w-full justify-center'}>
            <div />
            <div className={'space-x-4 text-lg'}>
                <Link activeProps={{ className: 'font-bold' }} to={'/dashboard'}>
                    Dashboard
                </Link>
            </div>
        </div>
    );
};
