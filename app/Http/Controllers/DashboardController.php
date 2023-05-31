<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $data = [
            'title' => 'Dashboard'
        ];
        $role = auth()->user()->role;
        return Inertia::render('Admin/Dashboard/Index', $data);
    }
}