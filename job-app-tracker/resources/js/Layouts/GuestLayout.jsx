import ApplicationLogo from '@/Components/WelcomeAppLogo';
import { Link } from '@inertiajs/react';
import Background from '@/Components/Background';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
                    <div className="z-10">
                <Link href="/">
                    <ApplicationLogo className="h-32 w-32 fill-current text-indigo-600" />
                </Link>
            </div>
            <Background />
            <div className="relative mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
