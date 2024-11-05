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
        $validatedData = $request->validate([
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'status' => 'nullable|string',
            'applicationDate' => 'nullable|date',
            'platform' => 'nullable|string',
            'link' => 'nullable|url',
            'applicationStatusDate' => 'nullable|date',
            'contactPerson' => 'nullable|string|max:255',
            'responseDueDate' => 'nullable|date',
            'applicationType' => 'nullable|string',
            'location' => 'nullable|string',
            'notes' => 'nullable|string',
            'followUpStatus' => 'nullable|string',
        ]);

        JobApplication::create($validatedData);

        return redirect()->back()->with('success', 'Job Application added successfully.');
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
            'applicationDate' => 'required|date',
            'platform' => 'nullable|string|max:255',
            'link' => 'nullable|url',
            'applicationStatusDate' => 'nullable|date',
            'contactPerson' => 'nullable|string|max:255',
            'responseDueDate' => 'nullable|date',
            'applicationType' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'followUpStatus' => 'nullable|string|max:100',
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
        $jobApplication->platform = $request->input('platform');
        $jobApplication->link = $request->input('link');
        $jobApplication->applicationStatusDate = $request->input('applicationStatusDate');
        $jobApplication->contactPerson = $request->input('contactPerson');
        $jobApplication->responseDueDate = $request->input('responseDueDate');
        $jobApplication->applicationType = $request->input('applicationType');
        $jobApplication->location = $request->input('location');
        $jobApplication->notes = $request->input('notes');
        $jobApplication->followUpStatus = $request->input('followUpStatus');
    
        // Save the updated job application
        $jobApplication->save();
    
        // Optionally, return the updated application as JSON
        return response()->json($jobApplication, 200);
    }
    
}

