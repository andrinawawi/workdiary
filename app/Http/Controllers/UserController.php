<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use App\Task;
use App\Project;

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
		$owner_user_id = $this->getOwnerUserId();

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

		// add owner_user id to logged In admin....
		$user = Auth::user();
		$owner_user_id = $user->id;

        $user = User::create([
            'name' => Input::get('name'),
            'email' => Input::get('email'),
            'owner_user_id' => $owner_user_id,
            // TODO : default password of 123456 should be handled better
            'password' => bcrypt('123456'),
        ]);

		// be default create all team members to 'user' role.....
		$user->roles()->attach(Role::where('name', 'user')->first());
        
		// redirect
        return response()->json('Successfully created a User');
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

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Request $request, $id)
	{
// 		$request->user()->authorizeRoles('admin');
		// delete
		$user = Auth::user();
		$owner_user_id = $user->id;

		$deletedRows = User::where('id', $id)->where(
				'owner_user_id', $owner_user_id)->delete();
// 		User::destroy($id);

		// redirect
// 		Session::flash('message', 'Successfully deleted the project!');
// 		return Redirect::to('project');
	    return response()->json('Successfully Deleted the user');
	}

    public function tasks(Request $request, $userId)
    {
        // get all the tasks belongs to this given user Id
        $tasks = Task::with(['user', 'project'])->where('assigned_user_id', $userId)->get();

		// we need to return all users, project since they will be used
		// in AddTask page , ToDO: remove this later on when use Redux ......
		$owner_user_id = $this->getOwnerUserId();
        $projects = Project::where('owner_user_id', $owner_user_id)->get();
        $users = $this->getAllUsers();

		$result['tasks'] = $tasks;
		$result['projects'] = $projects;
		$result['users'] = $users;

        return response()->json($result);
    }

}
