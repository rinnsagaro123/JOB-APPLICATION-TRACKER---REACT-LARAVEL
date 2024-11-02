<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch job applications from the database
        $applications = JobApplication::all();

        // Pass the data to the Inertia view
        return Inertia::render('Dashboard', [
            'applications' => $applications,
        ]);
    }
}

