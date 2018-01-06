<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use Searchable;

    //
	public function users()
	{
	  return $this->belongsToMany(User::class)->withTimestamps();
	}

// 	public function owner_user()
// 	{
// 	  return $this->belongsTo(User::class);
// 	}

	public function tasks()
    {
        return $this->hasMany(Task::class);
    }

}
