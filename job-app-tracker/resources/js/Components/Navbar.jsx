import { Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';
import Dropdown from './Dropdown';
import { useTheme } from 'next-themes';

export default function Navbar({ user }) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow z-10">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                        TrackMyJob
                    </span>
                </Link>

                {/* User Dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            type="button"
                            className="inline-flex items-center text-gray-600 dark:text-gray-300"
                        >
                            {user.name}
                            <svg
                                className="ml-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        {/* Profile Link */}
                        <Dropdown.Link href={route('profile.edit')}>
                            Profile
                        </Dropdown.Link>

                        {/* Logout Link */}
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
