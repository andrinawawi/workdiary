<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
			$table->string('description', 1000);
			$table->date('end_date');
			$table->enum('status', ['ToDo', 'Working', 'Done']);
			$table->integer('project_id')->unsigned();
			$table->integer('assigned_user_id')->unsigned();

			$table->foreign('assigned_user_id')->references('id')->on('users');
			$table->foreign('project_id')->references('id')->on('projects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
