import { SlidingPanel } from './SlidingPanel';
import { useToggle } from '../../../hooks';
import { FixedPanel } from './FixedPanel';
import { Hamburger } from './Hamburger';

export const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useToggle(false);

    return (
        <div>
            {/* Mobile Hamburger */}
            <Hamburger setIsSidebarOpen={setIsSidebarOpen} />

            {/* Mobile Sidebar */}
            <SlidingPanel setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

            {/* Desktop Sidebar */}
            <FixedPanel />
        </div>
    );
};
