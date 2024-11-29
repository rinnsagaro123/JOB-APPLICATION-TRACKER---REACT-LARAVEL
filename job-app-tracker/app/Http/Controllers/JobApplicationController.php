<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    /**
     * Store a new job application.
     */
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

        // Add the authenticated user's ID
        $validatedData['user_id'] = auth()->id();

        JobApplication::create($validatedData);

        return response()->json(['message' => 'Job application added successfully!'], 201);
    }

    /**
     * List job applications for the authenticated user.
     */
    public function index()
    {
        // Fetch applications for the authenticated user
        $applications = JobApplication::where('user_id', auth()->id())->get();

        return Inertia::render('JobApplicationTable', [
            'applications' => $applications,
        ]);
    }

    /**
     * Update a job application.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
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

        // Find the job application and check ownership
        $jobApplication = JobApplication::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$jobApplication) {
            return response()->json(['message' => 'Job application not found or unauthorized'], 403);
        }

        // Update the job application
        $jobApplication->update($validatedData);

        return response()->json($jobApplication, 200);
    }

    /**
     * Delete a job application.
     */
    public function destroy($id)
    {
        // Find the job application and check ownership
        $jobApplication = JobApplication::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$jobApplication) {
            return response()->json(['message' => 'Job application not found or unauthorized'], 403);
        }

        $jobApplication->delete();

        return response()->json(['message' => 'Job application deleted successfully!'], 200);
    }

    /**
     * Search job applications.
     */
    public function search(Request $request)
    {
        $searchTerm = $request->input('search', '');

        // Fetch applications for the authenticated user that match the search term
        $applications = JobApplication::where('user_id', auth()->id())
            ->when($searchTerm, function ($query, $searchTerm) {
                return $query->where('company', 'like', '%' . $searchTerm . '%')
                    ->orWhere('position', 'like', '%' . $searchTerm . '%')
                    ->orWhere('status', 'like', '%' . $searchTerm . '%')
                    ->orWhere('applicationDate', 'like', '%' . $searchTerm . '%')
                    ->orWhere('platform', 'like', '%' . $searchTerm . '%')
                    ->orWhere('link', 'like', '%' . $searchTerm . '%')
                    ->orWhere('applicationStatusDate', 'like', '%' . $searchTerm . '%')
                    ->orWhere('contactPerson', 'like', '%' . $searchTerm . '%')
                    ->orWhere('responseDueDate', 'like', '%' . $searchTerm . '%')
                    ->orWhere('applicationType', 'like', '%' . $searchTerm . '%')
                    ->orWhere('location', 'like', '%' . $searchTerm . '%')
                    ->orWhere('notes', 'like', '%' . $searchTerm . '%')
                    ->orWhere('followUpStatus', 'like', '%' . $searchTerm . '%');
            })
            ->get();

        return response()->json($applications);
    }
}
