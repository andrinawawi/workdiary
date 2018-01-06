@extends('layouts.app')

@section('content')
<div id="example"></div>
<!-- 
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div>
 -->


<!-- 
                <div>
					<a href="/one">One</a>
                </div>
                <div>
					<a href="/admin">Admin</a>
                </div>
                <div>
					<a href="/project">Projects</a>
                </div>
 -->
<!-- 
            </div>
        </div>
    </div>
</div>
 -->
 <!-- Scripts -->
<script src="{{ asset('js/app.js?t=93') }}"></script>

@endsection
