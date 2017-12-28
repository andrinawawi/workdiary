<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
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
    
}
