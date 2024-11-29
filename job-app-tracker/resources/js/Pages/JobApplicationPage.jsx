import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobApplicationTable from '@/Pages/JobApplicationTable';
import Sidebar from '../Components/Sidebar';

export default function JobApplicationsPage({ applications }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };
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
