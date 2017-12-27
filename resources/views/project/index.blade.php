@extends('layouts.app')

@section('content')
<div class="container">

<nav class="navbar navbar-inverse">
    <div class="navbar-header">
        <a class="navbar-brand" href="{{ URL::to('project') }}">Project Alert</a>
    </div>
    <ul class="nav navbar-nav">
        <li><a href="{{ URL::to('project') }}">View All projects</a></li>
        <li><a href="{{ URL::to('project/create') }}">Create a Project</a>
    </ul>
</nav>

<h1>All projects</h1>

<!-- will be used to show any messages -->
@if (Session::has('message'))
    <div class="alert alert-info">{{ Session::get('message') }}</div>
@endif

<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
            <td>Actions</td>
        </tr>
    </thead>
    <tbody>
    @foreach($project as $key => $value)
        <tr>
            <td>{{ $value->id }}</td>
            <td>{{ $value->name }}</td>
            <td>{{ $value->description }}</td>

            <!-- we will also add show, edit, and delete buttons -->
            <td>

                <!-- delete the nerd (uses the destroy method DESTROY /project/{id} -->
                <!-- we will add this later since its a little more complicated than the other two buttons -->

                <!-- show the nerd (uses the show method found at GET /project/{id} -->
                <a class="btn btn-small btn-success" href="{{ URL::to('project/' . $value->id) }}">Show</a>

                <!-- edit this nerd (uses the edit method found at GET /project/{id}/edit -->
                <a class="btn btn-small btn-info" href="{{ URL::to('project/' . $value->id . '/edit') }}">Edit</a>

            </td>
        </tr>
    @endforeach
    </tbody>
</table>

</div>
@endsection
