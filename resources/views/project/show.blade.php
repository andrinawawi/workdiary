@extends('layouts.app')

@section('content')
<nav class="navbar navbar-inverse">
	<div class="navbar-header">
		<a class="navbar-brand" href="{{ URL::to('project') }}">Project Alert</a>
	</div>
	<ul class="nav navbar-nav">
		<li><a href="{{ URL::to('project') }}">View All</a></li>
		<li><a href="{{ URL::to('project/create') }}">Create a Project</a>
	</ul>
</nav>

<h1>Showing {{ $project->name }}</h1>

	<div class="jumbotron text-center">
		<h2>{{ $project->name }}</h2>
		<p>
			<strong>Email:</strong> {{ $project->description }}<br>
		</p>
	</div>

</div>

@endsection
