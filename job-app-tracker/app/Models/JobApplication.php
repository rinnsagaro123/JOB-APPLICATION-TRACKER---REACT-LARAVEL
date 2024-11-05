<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    // Specify the fillable fields
    protected $fillable = [
        'company',
        'position',
        'status',
        'applicationDate',
        'platform',          // E.g., "LinkedIn", "Company Website"
        'link',              // Link to job posting
        'applicationStatusDate', // Date of last status update
        'contactPerson',     // Name of contact person
        'responseDueDate',   // Date when a response is expected
        'applicationType',   // E.g., "Full-Time", "Internship"
        'location',          // Location of job
        'notes',             // Additional notes about the application
        'followUpStatus',    // Status of follow-up actions
    ];
}
