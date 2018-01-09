<?php

namespace App;

use Auth;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'description', 'status', 'end_date', 'assigned_user_id', 'project_id'
    ];
    
	public function user()
	{
	  return $this->belongsTo(User::class, 'assigned_user_id');
	}

	public function project()
	{
	  return $this->belongsTo(Project::class);
	}

	 /**
     * Customize task searchable array ....Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $task = $this->toArray();

        $task['owner_user_id'] = $this->getOwnerUserId();

        return $task;
    }

	private function getOwnerUserId() {
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
    
}
