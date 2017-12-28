<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', 'OneController@index');

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/one', 'OneController@index')->name('home');

Route::get('/admin', 'HomeController@myadmin')->name('home');

// Route::get('/project', 'ProjectController@index')->name('home');

Route::resource('project', 'ProjectController');

Route::resource('user', 'UserController');

Route::resource('items', 'ItemController');

Route::resource('task', 'TaskController');

Route::post('/project/{project}/update_users', 'ProjectController@updateusers')->name('home');

// custom controller to fetch tasks related to specific user or project ....
Route::get('/project/{project}/tasks', 'ProjectController@tasks')->name('home');

Route::get('/user/{user}/tasks', 'UserController@tasks')->name('home');
