<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
	protected function getOwnerUserId() {
		$user = Auth::user();
		
		if ($user == null)
			return -1;
		$owner_user_id = $user->owner_user_id;

    	// owner user is either logged_in user, if his owner_user_id is NULL...
    	/// or owner_user_id ....
		if ($owner_user_id == null)
			$owner_user_id = $user->id;
		
		return $owner_user_id;
	}

	// get all the users belongs to this team (i.e. create by this owner admin user)
	protected function getAllUsers() {
		$owner_user_id = $this->getOwnerUserId();

        $users = User::where('owner_user_id', $owner_user_id)->orWhere('id', $owner_user_id)->get();

		return $users;
	}

}
