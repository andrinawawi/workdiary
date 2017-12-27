@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">
                <a href="#abc">ABC</a>
                <br/>
                <a href="#xyz">XYZ</a>
                </div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                </div>
                <div id="abc">
                	This is ABC
                </div>
                <div id="xyz">
                	This is XYZ
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
