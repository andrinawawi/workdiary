<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;

use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		$user = Auth::user();
				
        Log::info('Showing user profile loggedIn: '.json_encode($user));

		$owner_user_id = $user->owner_user_id;
		
    	// owner user is either logged_in user, if his owner_user_id is NULL...
    	/// or owner_user_id ....
		if ($owner_user_id == null)
			$owner_user_id = $user->id;

        //
        // get all the users belongs to this team (i.e. create by this owner admin user)
        $users = User::where('owner_user_id', $owner_user_id)->orWhere('id', $owner_user_id)->get();

        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		// validate
		// read more on validation at http://laravel.com/docs/validation
		$rules = array(
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
		);
		$validatedData = $request->validate($rules);

// 		$project = new User;
// 		$project->name       = Input::get('name');
// 		$project->email      = Input::get('email');
// 		$project->save();

        $user = User::create([
            'name' => Input::get('name'),
            'email' => Input::get('email'),
            // TODO : default password of 123456 should be handled better
            'password' => bcrypt('123456'),
        ]);

		// be default create all team members to 'user' role.....
		$user->roles()->attach(Role::where('name', 'user')->first());
        
        return $user;

		// redirect
        return response()->json('Successfully created a User');
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		// get the user
		$user = User::find($id);

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
		// validate
		// read more on validation at http://laravel.com/docs/validation
		$rules = array(
			'name'       => 'required',
		);
		$validatedData = $request->validate($rules);

		// store
		$user = User::find($id);
		$user->name = Input::get('name');
		$user->email = Input::get('email');

		$user->save();

		// redirect

        return response()->json('Successfully Updated');
        //
    }

}
