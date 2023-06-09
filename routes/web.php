<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\PromptsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ConfigurationController;

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

Route::get('/', HomeController::class)->name('home');

Route::get('/dashboard', DashboardController::class)->name('dashboard')->middleware('auth', 'isAdmin');

Route::resource('/prompt', PromptController::class)->only('index', 'store');

Route::middleware('auth', 'isAdmin')->group(function () {
    Route::resource('/prompts', PromptsController::class)->only('index', 'create', 'edit', 'store', 'update', 'destroy');
    Route::resource('/configuration', ConfigurationController::class)->only('index', 'create', 'edit', 'store', 'update', 'destroy');
    Route::resource('/users', UsersController::class)->only('index', 'create', 'edit', 'store', 'update', 'destroy');
    Route::resource('/history', HistoryController::class)->only('index', 'show');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';