import React from 'react';

const JobApplicationModal = ({ isOpen, onClose, onSubmit, register, errors, application }) => {
    if (!isOpen) return null;

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-semibold mb-4">{application ? 'Edit Job Application' : 'Add Job Application'}</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Company</label>
                        <input
                            {...register('company', { required: true })}
                            defaultValue={application ? application.company : ''} // Pre-fill with current data
                            className="border rounded w-full p-2"
                        />
                        {errors.company && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Position</label>
                        <input
                            {...register('position', { required: true })}
                            defaultValue={application ? application.position : ''} // Pre-fill with current data
                            className="border rounded w-full p-2"
                        />
                        {errors.position && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Status</label>
                        <select
                            {...register('status', { required: true })}
                            defaultValue={application ? application.status : ''} // Pre-fill with current data
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="Waiting">Waiting</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        {errors.status && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Application Date</label>
                        <input
                            type="date"
                            {...register('applicationDate', { required: true })}
                            defaultValue={application ? application.applicationDate : currentDate} // Pre-fill with current data
                            className="border rounded w-full p-2"
                        />
                        {errors.applicationDate && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 text-black rounded px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded px-4 py-2"
                        >
                            {application ? 'Update Job' : 'Add Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationModal;
