import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobApplicationModal from './JobApplicationModal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import Chatbot from '../Components/Chatbot'; 
import debounce from 'lodash.debounce';
import DeleteConfirmationModal from '../Components/DeleteConfirmationModal';

export default function JobApplicationTable({ applications: initialApplications }) {
    const [applications, setApplications] = useState(initialApplications);
    const [totalApplications, setTotalApplications] = useState(initialApplications.length);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null); // For edit mode
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(''); // State for popup message
    const [showPopup, setShowPopup] = useState(false);
    const [isViewMode, setViewMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    

    const handleNewApplication = (newApplication) => {
        setApplications([...applications, newApplication]);
        setTotalApplications(applications.length + 1);
    };

    const handleEditApplication = (id) => {
        console.log("Editing application with ID:", id);
        const applicationToEdit = applications.find(app => app.id === id);
        console.log("applicationToEdit:", applicationToEdit);
        if (applicationToEdit) {
            setCurrentApplication(applicationToEdit); // Set the current application to the one being edited
            setViewMode(false); // Set view mode to false for editing
            setIsModalOpen(true); // Open the modal
        }
    };

    const handleViewApplication = (application) => {
        setCurrentApplication(application);
        setViewMode(true); // Set view mode to true
        setIsModalOpen(true);
    };

    const handleDeleteApplication = async () => {
        try {
            if (!selectedApplicationId) {
                console.error('No application ID selected.');
                return;
            }
    
            const response = await fetch(`/jobs/${selectedApplicationId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': window.Laravel.csrfToken,
                },
            });
    
            if (response.ok) {
                setApplications(applications.filter(app => app.id !== selectedApplicationId));
                setTotalApplications(applications.length - 1);
                setPopupMessage('Job application deleted successfully!');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
                setIsDeleteConfirmationModalOpen(false); // Close the modal after successful delete
            } else {
                const responseText = await response.text();
                console.error('Failed to delete job application:', responseText);
                setPopupMessage('Failed to delete the application.');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setPopupMessage('An error occurred while deleting the application.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };
    

    const openDeleteModal = (id) => {
        setSelectedApplicationId(id); // Store the ID of the application to be deleted
        setIsDeleteConfirmationModalOpen(true); // Open the Delete Confirmation Modal
    };
    const handleCloseModal = () => {
        console.log("Closing modal"); 
        setIsModalOpen(false); // Close the modal
        setCurrentApplication(null); // Reset current application
        setViewMode(false); // Reset view mode
    };

    const closeDeleteModal = () => {
        setIsDeleteConfirmationModalOpen(false); // Close the Delete Confirmation Modal
        setSelectedApplicationId(null);
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
                    setApplications(applications.map(app => (app.id === currentApplication.id ? result : app)));
                    setPopupMessage('Job application updated successfully!'); 
                    setShowPopup(true); 
                    setTimeout(() => setShowPopup(false), 3000);
                } else {
                    handleNewApplication(result); 
                    setPopupMessage('Job application added successfully!'); 
                    setShowPopup(true); 
                    setTimeout(() => setShowPopup(false), 7000); 
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
            case 'New':
                return { bgColor: 'bg-blue-600', textColor: 'text-white' }; // Blue background for New
            default:
                return { bgColor: 'bg-gray-400', textColor: 'text-black' }; // Default gray
        }
    };
    
    const handleSearch = debounce(async (query) => {
        try {
            const response = await fetch(`/job-applications/search?search=${query}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setApplications(data); // Update the applications with filtered data
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }, 500);
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value); // Update the search input immediately
        handleSearch(value);  // Debounce the actual search operation
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };
    
    useEffect(() => {
        setTotalApplications(applications.length);
    }, [applications]);

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
                {/* <div className="mb-4 flex justify-end">
                    <Link
                        href="/dashboard" // Change this to your dashboard route
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Back to Dashboard
                    </Link>
                </div> */}
                {/* Total Applications Count */}
                <div className="mb-4 flex items-start justify-between">
    {/* Left Section: Search Input and Total Applications */}
    <div className="w-full max-w-md">
        {/* Dynamic Search Display */}
        <div className="mb-2">
           
            <input
                type="text"
                placeholder="Search job applications..."
                value={searchTerm} // Bind the searchTerm state
                onChange={handleInputChange} // Update state and trigger debounce logic
                className="w-full p-3 border border-gray-300 rounded-lg shadow-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            />
        </div>
        {/* Total Applications */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search for: <span className="font-semibold text-gray-800 dark:text-gray-200">{searchTerm || ""}</span>
            </label>
        <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Applications: <span className="font-medium text-gray-800 dark:text-gray-200">{totalApplications}</span>
        </div>
        
    </div>

    <div className="flex w-auto mt-14 mr-12">
        <button
            onClick={() => {
                setCurrentApplication(null); // Reset for new application
                setIsModalOpen(true);
            }}
            className="px-12 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Add Job
        </button>

        </div>
</div>


                {/* Applications Table */}
                <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Company</th>
                                    <th className="px-4 py-2">Position</th>
                                    <th className="px-4 py-2">Application Date</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {applications.map((application) => (
                                <tr key={application.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-2">
                                        <div className={`inline-block rounded-full py-1 px-3 ${getStatusStyles(application.status).bgColor}`}>
                                            <span className={`${getStatusStyles(application.status).textColor}`}>
                                                {application.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button 
                                            onClick={() => handleViewApplication(application)} // Open modal on company click
                                            className="text-blue-600 hover:underline"
                                        >
                                            {application.company}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">{application.position}</td>
                                    <td className="px-4 py-2">{application.applicationDate}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleEditApplication(application.id)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(application.id)}
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
            <Chatbot />

            {/* Job Application Modal */}
                <JobApplicationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    application={currentApplication} // Pass current application for editing or viewing
                    isViewMode={isViewMode} // Pass the view mode prop
                />
                <DeleteConfirmationModal
                isOpen={isDeleteConfirmationModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteApplication}
                message="Are you sure you want to delete this job application?"
            />
            </div>

        </AuthenticatedLayout>
    );
}
