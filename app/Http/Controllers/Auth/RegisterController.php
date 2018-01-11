<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Role;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
		
		// by default create admin 'user' for user registered via login interface...
		$user->roles()->attach(Role::where('name', 'admin')->first());

// 		Log::info('Created user : '.json_encode($user));
// 		Log::info('Created user ID : '. $user->id);
// 		Log::info('Created BY KEY : '. env('ALGOLIA_SEARCH_KEY'));
		
		$securedApiKey = \AlgoliaSearch\Client::generateSecuredApiKey(
		  env('ALGOLIA_SEARCH_KEY'), // Make sure to use a search key
		  [
			'filters' => 'owner_user_id:'.$user->id
		  ]
		);
		$user['search_key'] = $securedApiKey;
		$user->save();

        return $user;
    }
}
