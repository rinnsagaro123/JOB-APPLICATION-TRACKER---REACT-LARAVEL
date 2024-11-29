import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '../Components/WelcomeAppLogo';
import { useState } from 'react';
import Background from '../Components/Background';


export default function JobApplicationTracker({ auth, laravelVersion, phpVersion }) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <>
            <Head title="Job Application Tracker" />
            {/* <Link href="/" className="flex items-center">
                    <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                        TrackMyJob
                    </span>
                </Link> */}
            <div className="bg-gray-50 text-black/50 dark:bg-white dark:text-black/50 min-h-screen flex flex-col items-center justify-center px-6 py-12">
                {/* Background Image */}
              <Background />

                {/* Main Content Section */}
            <nav className="fixed top-10 left-0 w-full font-black bg-white-800 text-white z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="h-20 w-auto fill-current text-white" />
                        <span className="text-xl font-semibold hover:text-blue-400" style={{ textDecoration: 'none' }}>
                            
                            TrackMyJob
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="hidden lg:flex space-x-14"> {/* On larger screens, display links */}
                    <Link
                        href="/job-applications"
                        className="text-l hover:text-blue-400"
                    >
                        Home
                    </Link>
                        <Link
                            href="/logout"
                            className="text-l hover:text-blue-400"
                        >
                            Features
                        </Link>
                        <Link
                            href="/logout"
                            className="text-l hover:text-blue-400"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/logout"
                            className="text-l hover:text-blue-400"
                        >
                            Success Stories
                        </Link>
                        <Link
                            href="/logout"
                            className="text-l hover:text-blue-400"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Hamburger Icon (visible on smaller screens) */}
                    <div className="lg:hidden">
                        <button
                            className="text-black hover:text-indigo-400"
                            onClick={() => setNavbarOpen(!navbarOpen)} // Toggle the state to show/hide the navbar
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu (visible on smaller screens) */}
                <div className={`lg:hidden ${navbarOpen ? 'block' : 'hidden'}`}>
                    <div className="px-6 py-4 space-y-4">
                        <Link href="/job-applications" className="block hover:text-indigo-400">
                            Home
                        </Link>
                        <Link href="/logout" className="block hover:text-indigo-400">
                            Features
                        </Link>
                        <Link href="/logout" className="block hover:text-indigo-400">
                            Pricing
                        </Link>
                        <Link href="/logout" className="block hover:text-indigo-400">
                            Success Stories
                        </Link>
                        <Link href="/logout" className="block hover:text-indigo-400">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
            {/* Main Content */}
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col items-center justify-center px-6 py-12">
                {/* Background Image */}
                {/* <img
                    id="background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                    src="/assets/job-tracker-bg.svg"
                    alt="Job Tracker Background"
                    onError={handleImageError}
                /> */}

                {/* Middle Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto bottom-14 mt-20">
                <h1 className="text-5xl font-extrabold text-white dark:text-white mb-6">
                    Track Your <span className="text-blue-500">Job Applications</span> Effortlessly
                </h1>
                <p className="text-lg text-gray-300 dark:text-gray-200 max-w-md mx-auto mb-8">
                    <span className="text-blue-400">Organize</span>, <span className="text-blue-400">monitor</span>, and <span className="text-blue-400">follow up</span> on all your job applications in one place. Stay on top of your <span className="text-blue-400">job search</span> like never before.
                </p>
                <div className="mt-6 space-x-4">
                    <Link
                        href={auth?.user ? '/job-applications' : '/register'}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
                    >
                    {auth?.user ? (
                    <>
                        Go to <span className="text-yellow-400">TrackMyJob</span>
                    </>
                ) : (
                    'Sign Up'
                )}
                    </Link>
                    {!auth?.user && (
                        <Link
                            href="/login"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
                        >
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>

            </div>

                {/* Information Section */}
                <div className="relative z-10 mt-16 grid gap-6 max-w-3xl mx-auto">

                    <div id="docs-card" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
                        <div id="docs-card-content" className="flex flex-col items-start">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                How it Works
                            </h2>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Simply log in, add your applications, and get reminders to follow up. Track the status of each application, stay organized, and increase your chances of landing your dream job.
                            </p>
                        </div>
                    </div>

                    <div id="docs-card" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
                        <div id="docs-card-content" className="flex flex-col items-start">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Key Features
                            </h2>
                            <ul className="mt-3 text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
                                <li>Track your job application status</li>
                                <li>Set follow-up reminders</li>
                                <li>View detailed job application history</li>
                                <li>Organize job applications by type, location, and status</li>
                            </ul>
                        </div>
                    </div>

                    <div id="docs-card" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
                        <div id="docs-card-content" className="flex flex-col items-start">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Why Choose JobAppTracker?
                            </h2>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                JobAppTracker is designed to help you stay on top of your job search. With its intuitive interface, customizable features, and efficient tracking system, you’ll never miss an opportunity again.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer Section */}
                <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
                    <p className="text-sm">&copy; 2024 JobAppTracker. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}
