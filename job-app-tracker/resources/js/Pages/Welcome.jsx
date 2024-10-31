import { Head, Link } from '@inertiajs/react';

export default function JobApplicationTracker({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Job Application Tracker" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col items-center justify-center px-6">
                <img
                    id="background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
                    src="/assets/job-tracker-bg.svg"
                    alt="Job Tracker Background"
                    onError={handleImageError}
                />

                {/* Main Heading */}
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                        Track Your Job Applications Effortlessly
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Organize, monitor, and follow up on all your job applications in one place.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-6 space-x-4">
                        <Link
                            href={auth?.user ? '/dashboard' : '/register'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {auth?.user ? 'Go to Dashboard' : 'Sign Up'}
                        </Link>
                        {!auth?.user && (
                            <Link
                                href="/login"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Information Section */}
                <div className="relative z-10 mt-10 grid gap-6 max-w-2xl mx-auto">
                    <div id="docs-card" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div id="docs-card-content" className="flex flex-col items-start">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                How it Works
                            </h2>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Simply log in, add your applications, and get reminders to follow up.
                                Track the status of each application and stay organized in your job hunt.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 mt-10 text-gray-500 dark:text-gray-400 text-sm">
                    <p>
                        Powered by Laravel {laravelVersion} and PHP {phpVersion}
                    </p>
                </footer>
            </div>
        </>
    );
}
