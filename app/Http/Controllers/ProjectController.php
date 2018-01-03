<?php

namespace App\Http\Controllers;

use App\Project;
use App\User;
use App\Task;

use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

	public function index(Request $request)
	{
		$request->user()->authorizeRoles(['admin', 'user']);

		$result = array();
        // get all the project for this Team
        
		$owner_user_id = $this->getOwnerUserId();

        $projects = Project::where('owner_user_id', $owner_user_id)->with('users')->get();
        $users = $this->getAllUsers();

		$result['projects'] = $projects;
		$result['users'] = $users;

        return response()->json($result);
       // load the view and pass the projects
//         return view('project.index')
//             ->with('project', $projects);
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		// load the create form (app/views/project/create.blade.php)
// 		return view('project.create');
        //
    }

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		// validate
		// read more on validation at http://laravel.com/docs/validation
		$rules = array(
			'name'       => 'required',
		);
		$validatedData = $request->validate($rules);
		$owner_user_id = $this->getOwnerUserId();

		$project = new Project;
		$project->name       = Input::get('name');
		$project->description      = Input::get('description');
		$project->owner_user_id = $owner_user_id;
		$project->save();

		// redirect
        return response()->json('Successfully created a Project');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		// get the project
// 		$project = Project::find($id);
// 
// 		// show the view and pass the nerd to it
// 		return view('project.show')
// 			->with('project', $project);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		// get the project
		$project = Project::find($id);

        return response()->json($project);

		// show the edit form and pass the nerd
// 		return view('project.edit')
// 			->with('project', $project);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
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
		$project = Project::find($id);
		$project->name = Input::get('name');
		$project->description = Input::get('description');

		$project->save();

		// redirect
// 		Session::flash('message', 'Successfully updated Project!');
// 		return Redirect::to('project');
        return response()->json('Successfully Updated');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Request $request, $id)
	{
		$request->user()->authorizeRoles('admin');
		// delete
		Project::destroy($id);

		// redirect
// 		Session::flash('message', 'Successfully deleted the project!');
// 		return Redirect::to('project');
      	return response()->json('Successfully Deleted');
	}

	/*********************** CUSTOM Methods ****************************/

	/**
	 * This method associates projects with users (many-to-many).
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function updateusers(Request $request, $id)
	{
		$user_idstr = $request->input('users');
		$user_ids = explode(",", $user_idstr);
		
		if (count($user_ids) > 0) {
			// get the project
			$project = Project::find($id);

			Log::info('Update Project users : '.json_encode($user_ids));
			// detach earlier users from this project....and add all as new ....
			$project->users()->sync($user_ids);
			
			$projects = Project::find($id)->with('users')->get();
		}
		
        return response()->json($project);
	}
	
    public function tasks(Request $request, $projectId)
    {
// 		$owner_user_id = $this->getOwnerUserId();

        // get all the tasks belongs to this given project Id
        $tasks = Task::with(['user', 'project'])->where('project_id', $projectId)->get();

		// we need to return all users, project since they will be used
		// in AddTask page , ToDO: remove this later on when use Redux ......
//         $projects = Project::where('owner_user_id', $owner_user_id)->get();
//         $users = $this->getAllUsers();

		$result['tasks'] = $tasks;
// 		$result['projects'] = $projects;
// 		$result['users'] = $users;

        return response()->json($result);
    }
	
}