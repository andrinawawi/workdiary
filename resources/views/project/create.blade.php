@extends('layouts.app')

@section('content')
<div class="container">

<nav class="navbar navbar-inverse">
	<div class="navbar-header">
		<a class="navbar-brand" href="{{ URL::to('project') }}">Project Alert</a>
	</div>
	<ul class="nav navbar-nav">
		<li><a href="{{ URL::to('project') }}">View All project</a></li>
		<li><a href="{{ URL::to('project/create') }}">Create a Project</a>
	</ul>
</nav>

<h1>Create a project</h1>

<!-- if there are creation errors, they will show here -->
{{ Html::ul($errors->all() )}}

{{ Form::open(array('url' => 'project')) }}

	<div class="form-group">
		{{ Form::label('name', 'Name') }}
		{{ Form::text('name', null, array('class' => 'form-control')) }}
	</div>

	<div class="form-group">
		{{ Form::label('description', 'Description') }}
		{{ Form::text('description', null, array('class' => 'form-control')) }}
	</div>
	{{ Form::submit('Create a Project!', array('class' => 'btn btn-primary')) }}

{{ Form::close() }}

</div>

@endsection
