<!-- resources/views/add-job.blade.php -->
@extends('app')

@section('title', 'Add Job')

@section('content')
    <h1>Add Job</h1>
    <form action="{{ route('job.store') }}" method="POST">
        @csrf
        <div>
            <label for="company">Company:</label>
            <input type="text" id="company" name="company" required>
        </div>
        <div>
            <label for="position">Position:</label>
            <input type="text" id="position" name="position" required>
        </div>
        <div>
            <label for="status">Status:</label>
            <input type="text" id="status" name="status" required>
        </div>
        <div>
            <label for="applicationDate">Application Date:</label>
            <input type="date" id="applicationDate" name="applicationDate" required>
        </div>
        <button type="submit">Add Job</button>
    </form>
@endsection
