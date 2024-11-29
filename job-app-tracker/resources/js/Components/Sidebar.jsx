// Sidebar.jsx
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div
            className={`fixed left-0 top-0 z-20 w-64 bg-gray text-black transition-all duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="p-6">
                <ul>
                    <li className="mb-4">
                        <NavLink href="/" className="text-gray hover:text-blue-400">
                                    Home
                                    </NavLink>
                        </li>
                        <li className="mb-4">
                        <NavLink href="/" className="text-gray hover:text-blue-400">
                                    Contact
                                    </NavLink>
                        </li>
                        <li className="mb-4">
                        <NavLink href="/" className="text-gray hover:text-blue-400">
                                        About
                                    </NavLink>
                        </li>
                    <li className="mb-4">
                        <Link
                            href="/job-applications"
                            className="text-gray hover:text-blue-400"
                        >
                            Job Applications
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
