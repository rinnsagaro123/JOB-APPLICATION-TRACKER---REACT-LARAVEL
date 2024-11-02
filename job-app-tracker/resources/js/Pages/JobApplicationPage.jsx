import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobApplicationTable from '@/Pages/JobApplicationTable';

export default function JobApplicationsPage({ applications }) {
    return (
        <AuthenticatedLayout>
            <Head title="Job Applications" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <JobApplicationTable applications={applications} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
