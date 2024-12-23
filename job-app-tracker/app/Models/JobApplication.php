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
        'platform',
        'link',
        'applicationStatusDate',
        'contactPerson',
        'responseDueDate',
        'applicationType',
        'location',
        'notes',
        'followUpStatus',
        'user_id', // Add this
    ];
}
