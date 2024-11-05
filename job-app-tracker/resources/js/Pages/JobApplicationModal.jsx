import React from 'react';

const JobApplicationModal = ({ isOpen, onClose, onSubmit, register, errors, application, isViewMode }) => {
    if (!isOpen) return null;

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">
                    {isViewMode ? 'View Job Application' : application ? 'Edit Job Application' : 'Add Job Application'}
                </h2>
                <form onSubmit={isViewMode ? (e) => e.preventDefault() : onSubmit}>
                    {/* Only show these fields when not in view mode */}
                    {!isViewMode && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-1">Company</label>
                                <input
                                    {...register('company', { required: true })}
                                    defaultValue={application?.company || ''}
                                    className="border rounded w-full p-2"
                                />
                                {errors.company && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Position</label>
                                <input
                                    {...register('position', { required: true })}
                                    defaultValue={application?.position || ''}
                                    className="border rounded w-full p-2"
                                />
                                {errors.position && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Status</label>
                                <select
                                    {...register('status', { required: true })}
                                    defaultValue={application?.status || ''}
                                    className="border rounded w-full p-2"
                                >
                                    <option value="">Select Status</option>
                                    <option value="New">New</option>
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
                                    defaultValue={application?.applicationDate || currentDate}
                                    className="border rounded w-full p-2"
                                />
                                {errors.applicationDate && <span className="text-red-600">This field is required</span>}
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label className="block mb-1">Application Type:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.applicationType || ''}</div>
                        ) : (
                            <select
                                {...register('applicationType', { required: true })}
                                defaultValue={application?.applicationType || ''}
                                className={`border rounded w-full p-2 ${
                                    errors.applicationType ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Application Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                {/* Add more options as needed */}
                            </select>
                        )}
                        {errors.applicationType && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Location:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.location || ''}</div>
                        ) : (
                            <select
                                {...register('location', { required: true })}
                                defaultValue={application?.location || ''}
                                className={`border rounded w-full p-2 ${
                                    errors.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote/WFH</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Onsite">Onsite</option>
                                <option value="Don't know yet">Don't know yet</option>
                            </select>
                        )}
                        {errors.location && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Notes:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.notes || ''}</div>
                        ) : (
                            <textarea
                                {...register('notes')}
                                defaultValue={application?.notes || ''}
                                className="border rounded w-full p-2"
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Follow-Up Status:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.followUpStatus || ''}</div>
                        ) : (
                            <select
                                id="followUpStatus"
                                {...register('followUpStatus', { required: true })}
                                className={`block w-full p-2 border rounded ${
                                    errors.followUpStatus ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select a status</option>
                                <option value="Not yet">Not yet</option>
                                <option value="Followed up">Followed up</option>
                                <option value="No follow-up needed">No follow-up needed</option>
                            </select>
                        )}
                        {errors.followUpStatus && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Platform:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.platform || ''}</div>
                        ) : (
                            <input
                                type="text"
                                {...register('platform')}
                                defaultValue={application?.platform || ''}
                                className="border rounded w-full p-2"
                            />
                        )}
                        {errors.platform && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Link:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.link || ''}</div>
                        ) : (
                            <input
                                type="url"
                                {...register('link')}
                                defaultValue={application?.link || ''}
                                className="border rounded w-full p-2"
                            />
                        )}
                        {errors.link && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Contact Person:</label>
                        {isViewMode ? (
                            <div className="border rounded w-full p-2">{application?.contactPerson || ''}</div>
                        ) : (
                            <input
                                type="text"
                                {...register('contactPerson')}
                                defaultValue={application?.contactPerson || ''}
                                className="border rounded w-full p-2"
                            />
                        )}
                        {errors.contactPerson && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 text-black rounded px-4 py-2"
                        >
                           {isViewMode ? 'Exit' : 'Cancel'}
                        </button>
                        {!isViewMode && (
                            <button
                                type="submit"
                                className="bg-blue-600 text-white rounded px-4 py-2"
                            >
                                {application ? 'Update Job' : 'Add Job'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationModal;
