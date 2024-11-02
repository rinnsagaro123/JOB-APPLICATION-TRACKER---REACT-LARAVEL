import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobApplicationModal from './JobApplicationModal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from '@inertiajs/react';

export default function JobApplicationTable({ applications: initialApplications }) {
    const [applications, setApplications] = useState(initialApplications);
    const [totalApplications, setTotalApplications] = useState(initialApplications.length);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null); // For edit mode
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(''); // State for popup message
    const [showPopup, setShowPopup] = useState(false);
    

    useEffect(() => {
        setTotalApplications(applications.length);
    }, [applications]);

    const handleNewApplication = (newApplication) => {
        setApplications([...applications, newApplication]);
        setTotalApplications(applications.length + 1);
    };

    const handleEditApplication = (id) => {
        const applicationToEdit = applications.find(app => app.id === id);
        setCurrentApplication(applicationToEdit);
        setIsModalOpen(true);

    };

    const handleDeleteApplication = async (id) => {
        try {
            const response = await fetch(`/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': window.Laravel.csrfToken,
                },
            });

            if (response.ok) {
                setApplications(applications.filter(app => app.id !== id));
                setTotalApplications(applications.length - 1);
                setPopupMessage('Job application deleted successfully!'); // Set the success message
                setShowPopup(true); // Show the popup
                setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
            } else {
                console.error('Failed to delete job application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSubmit = async (data) => {
        const method = currentApplication ? 'PUT' : 'POST';
        const url = currentApplication ? `/jobs/${currentApplication.id}` : '/jobs';
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': window.Laravel.csrfToken,
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                if (currentApplication) {
                    // Update existing application in state
                    setApplications(applications.map(app => (app.id === currentApplication.id ? result : app)));
                    setPopupMessage('Job application updated successfully!'); // Set the success message for edit
                    setShowPopup(true); // Show the popup
                    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
                } else {
                    handleNewApplication(result); // Handle new application addition
                    setPopupMessage('Job application added successfully!'); // Set the success message for add
                    setShowPopup(true); // Show the popup
                    setTimeout(() => setShowPopup(false), 7000); // Hide the popup after 3 seconds
                }
                setIsModalOpen(false);
                setCurrentApplication(null);
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Accepted':
                return { bgColor: 'bg-green-600', textColor: 'text-white' }; // Green background
            case 'Rejected':
                return { bgColor: 'bg-red-600', textColor: 'text-white' }; // Red background
            case 'Waiting':
                return { bgColor: 'bg-yellow-600', textColor: 'text-black' }; // Yellow background
            default:
                return { bgColor: 'bg-gray-400', textColor: 'text-black' }; // Default gray
        }
    };
    

    return (
        <AuthenticatedLayout>
        <div className="py-12">
            <Head title="Job Applications" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {showPopup && (
                    <div className="mb-4 overflow-hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        {popupMessage}
                    </div>
                )}
                <div className="mb-4 flex justify-end">
                    <Link
                        href="/dashboard" // Change this to your dashboard route
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {/* Total Applications Count */}
                <div className="mb-4 p-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                    Total Applications: {totalApplications}
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => {
                            setCurrentApplication(null); // Reset for new application
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Job
                    </button>
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
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    {applications.map((application) => (
        <tr key={`${application.id}-${application.company}`} className="border-b border-gray-200 dark:border-gray-700">
            <td className="px-4 py-2">{application.company}</td>
            <td className="px-4 py-2">{application.position}</td>
            <td className="px-4 py-2">
                <div className={`inline-block rounded-full py-1 px-3 ${getStatusStyles(application.status).bgColor}`}>
                    <span className={`${getStatusStyles(application.status).textColor}`}>
                        {application.status}
                    </span>
                </div>
            </td>
            <td className="px-4 py-2">{application.applicationDate}</td>
            <td className="px-4 py-2">
                <button
                    onClick={() => handleEditApplication(application.id)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteApplication(application.id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            </td>
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

            {/* Job Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                application={currentApplication} // Pass current application for editing
            />

        </div>
        </AuthenticatedLayout>
    );
}
