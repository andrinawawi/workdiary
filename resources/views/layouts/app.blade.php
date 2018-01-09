<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Work Diary') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css?t=2443') }}" rel="stylesheet">
	<link rel="stylesheet" href="https://unpkg.com/react-instantsearch-theme-algolia@4.0.0/style.min.css">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Work Diary') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @guest
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        @yield('content')        
    </div>
	<footer>
		<div id="quotes"></div>
		<script>
			var quotesArr = [
				"There isn't a way things should be. There's just what happens, and what we do.",
				"No one can make you feel inferior without your consent.",
				"It's not about how hard you can hit; it's about how hard you can get hit and keep moving forward.",
				"If you want to go fast, go alone. If you want to go far, go together.",
				"Believe you can and you're halfway there.",
				"There is no elevator to success — you have to take the stairs.",
				"It's supposed to be hard. If it were easy, everyone would do it.",
				"I have not failed. I've just found 10,000 ways that won't work.",
				"Whoever is happy will make others happy too.",
				"Problems are no stop signs, they are guidelines.",
				"The only true wisdom is in knowing you know nothing."	
			];
			
			// display random quote based on day of month....one per day....
			var dayOfMonth = new Date().getDate();
			var quoteIndex = dayOfMonth%quotesArr.length;

			document.getElementById("quotes").innerHTML = quotesArr[quoteIndex];
		</script>
	</footer>
</body>


</html>
