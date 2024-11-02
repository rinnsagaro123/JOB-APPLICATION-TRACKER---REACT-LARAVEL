<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'applicationDate' => 'required|date',
        ]);

        JobApplication::create($request->all());

        return response()->json(['message' => 'Job application added successfully!'], 201);
        
    }
    public function index()
    {
        // Fetch all job applications from the database
        $applications = JobApplication::all();

        // Pass the applications data to the Inertia component
        return Inertia::render('JobApplicationTable', [
            'applications' => $applications,
        ]);
    }
    public function destroy($id)
    {
        $job = JobApplication::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job application deleted successfully!'], 200);
    }
    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'status' => 'required|string|max:100',
            'applicationDate' => 'required|date', // Ensure this is a valid date
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Find the job application by ID
        $jobApplication = JobApplication::find($id);
    
        if (!$jobApplication) {
            return response()->json(['message' => 'Job application not found'], 404);
        }
    
        // Update the job application fields
        $jobApplication->company = $request->input('company');
        $jobApplication->position = $request->input('position');
        $jobApplication->status = $request->input('status');
        $jobApplication->applicationDate = $request->input('applicationDate');
    
        // Save the updated job application
        $jobApplication->save();
    
        // Optionally, return the updated application as JSON
        return response()->json($jobApplication, 200);
    }
}

