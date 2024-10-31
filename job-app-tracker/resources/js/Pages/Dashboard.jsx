import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobApplicationTable from '@/Components/JobApplicationTable';


const applications = [
    { company: 'Company A', position: 'Developer', status: 'Pending', applicationDate: '2024-10-10' },
    { company: 'Company B', position: 'Designer', status: 'Interviewed', applicationDate: '2024-10-15' },
    // Add more job applications as needed
];


export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>  {/* Job Application Table */}
                    <div className="mt-8">
                        <JobApplicationTable applications={applications} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
