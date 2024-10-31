import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Head, usePage } from '@inertiajs/react';
import '../../css/AddJob.css'; 

export default function AddJob() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { props } = usePage();

    const onSubmit = (data) => {
        const csrfToken = window.Laravel.csrfToken;
    
        fetch('/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            <Head title="Add Job Application" />
            <div className="form-container">
            <h1>Add Job Application</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="job-form">
                <div className="form-group">
                    <label>Company</label>
                    <input {...register('company', { required: true })} className="form-input" />
                    {errors.company && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <input {...register('position', { required: true })} className="form-input" />
                    {errors.position && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input {...register('status', { required: true })} className="form-input" />
                    {errors.status && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Application Date</label>
                    <input type="date" {...register('applicationDate', { required: true })} className="form-input" />
                    {errors.applicationDate && <span className="error-message">This field is required</span>}
                </div>
                <button type="submit" className="submit-button">Add Job Application</button>
            </form>
            </div>
        </>
    );
}
