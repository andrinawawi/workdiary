<?php

namespace App\Http\Controllers;

use App\Task;
use App\Project;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		$owner_user_id = $this->getOwnerUserId();

        // get all the tasks belongs to this team's projects
        // pluck refer https://stackoverflow.com/a/34308311/1331003
        $projectIds = Project::where('owner_user_id', $owner_user_id)->pluck('id')->toArray();

        $tasks = Task::with(['user', 'project'])->whereIn('project_id', $projectIds)->get();
		// we need to return all users, project since they will be used
		// in AddTask page , ToDO: remove this later on when use Redux ......
//         $projects = Project::where('owner_user_id', $owner_user_id)->get();
//         $users = $this->getAllUsers();

		$result['tasks'] = $tasks;
// 		$result['projects'] = $projects;
// 		$result['users'] = $users;

        return response()->json($result);
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
            'description' => 'required|string|max:1000',
		);
		$validatedData = $request->validate($rules);

		// add owner_user id to logged In admin....
		$owner_user_id = $this->getOwnerUserId();
        $projects = Project::where('owner_user_id', $owner_user_id)->get(['id']);

        $task = Task::create([
            'description' => Input::get('description'),
            'status' => 'ToDo',
            'assigned_user_id' => Input::get('assigned_user_id'),
            'project_id' => Input::get('project_id'),
            'end_date' => Input::get('end_date')
        ]);

// 		$task->user()->associate(User::where('id', $owner_user_id)->first());
// 		// toDO correct this 1st project code.....
// 		$task->project()->associate(Project::where('id', $projects[0])->first());
        
		$task->save();

		// redirect
        return response()->json('Successfully created a Task');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		// get the task
		$task = Task::find($id);

// 		$owner_user_id = $this->getOwnerUserId();

		// we need to return all users, project since they will be used
		// in AddTask page , ToDO: remove this later on when use Redux ......
//         $projects = Project::where('owner_user_id', $owner_user_id)->get();
//         $users = $this->getAllUsers();

		$result['task'] = $task;
// 		$result['projects'] = $projects;
// 		$result['users'] = $users;

        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
		// validate
		// read more on validation at http://laravel.com/docs/validation
		$rules = array(
			'description'       => 'required',
			'status'       => 'required',
			'assigned_user_id'       => 'required',
			'project_id'       => 'required',
		);
		$validatedData = $request->validate($rules);

		// store
		$task = Task::find($id);
		$task->description = Input::get('description');
		$task->status = Input::get('status');
		$task->end_date = Input::get('end_date');
		$task->assigned_user_id = Input::get('assigned_user_id');;
		$task->project_id = Input::get('project_id');;

		$task->save();

		// redirect

        return response()->json('Successfully Updated Task');
    }

//     /**
//      * Remove the specified resource from storage.
//      *
//      * @param  \App\Task  $task
//      * @return \Illuminate\Http\Response
//      */
//     public function destroy(Task $task)
//     {
//         //
//     }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Request $request, $id)
	{
		// delete
		$user = Auth::user();
		$logged_user_id = $user->id;

		$deletedRows = Task::where('id', $id)->where(
				'assigned_user_id', $logged_user_id)->delete();
// 		Task::destroy($id);

		Log::info('Deleted tasks count : '.json_encode($deletedRows));
		

		// redirect
// 		Session::flash('message', 'Successfully deleted the project!');
// 		return Redirect::to('project');
	    return response()->json('Successfully Deleted the task');
	}

}
