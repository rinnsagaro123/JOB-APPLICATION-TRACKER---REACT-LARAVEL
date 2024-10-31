import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import JobApplicationModal from './JobApplicationModal'; // Import your modal component
import { useForm } from 'react-hook-form';

export default function JobApplicationTable({ applications }) {
    const [totalApplications, setTotalApplications] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Calculate total applications on component mount or when applications change
    useEffect(() => {
        setTotalApplications(applications.length);
    }, [applications]);

    const onSubmit = (data) => {
        // Make a POST request to store the application
        fetch('/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.Laravel.csrfToken, // Ensure this is set in your Blade template
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsModalOpen(false); // Close modal on success
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Job Applications
                </h2>
            }
        >
            <Head title="Job Applications" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal on click
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Job
                        </button>
                    </div>
                    {/* Total Applications Count */}
                    <div className="mb-4 p-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                        Total Applications: {totalApplications}
                    </div>

                    {/* Applications Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2">Company</th>
                                        <th className="px-4 py-2">Position</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Application Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((application, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <td className="px-4 py-2">{application.company}</td>
                                            <td className="px-4 py-2">{application.position}</td>
                                            <td className="px-4 py-2">{application.status}</td>
                                            <td className="px-4 py-2">{application.applicationDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* No Applications Message */}
                            {applications.length === 0 && (
                                <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                                    No job applications found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Close modal
                onSubmit={handleSubmit(onSubmit)} // Pass onSubmit handler
                register={register}
                errors={errors}
            />
        </AuthenticatedLayout>
    );
}
