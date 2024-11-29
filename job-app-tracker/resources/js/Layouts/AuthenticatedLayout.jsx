import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const { theme, setTheme } = useTheme();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <Navbar user={user} />
            {/* Main Layout */}
            <div className="flex flex-1 mt-16">
                {/* Sidebar */}
                <div
                    className={`flex flex-col h-[calc(100vh-4rem)] w-64 bg-gray dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                >
                    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    {header && (
                        <header className="bg-white shadow dark:bg-gray-800">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                        </header>
                    )}

                    {/* Content */}
                    <main className="p-4">{children}</main>
                </div>
            </div>
        </div>
    );
}
