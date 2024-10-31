<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}

