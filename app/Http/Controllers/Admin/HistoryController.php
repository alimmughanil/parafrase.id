<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\PromptHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->show) {
            $data = collect(PromptHistory::with('user')->get());
            $promptHistory = ['data' => $data];
        } else {
            $promptHistory = collect(PromptHistory::with('user')->paginate(10));
        }

        $data = [
            'title' => 'History',
            'history' => $promptHistory
        ];
        return Inertia::render('Admin/History/Index', $data);
    }

    public function show($userId, Request $request)
    {
        if ($request->show) {
            $data = collect(PromptHistory::with('user')->where('user_id', $userId)->get());
            $promptHistory = ['data' => $data];
        } else {
            $promptHistory = collect(PromptHistory::with('user')->where('user_id', $userId)->paginate(10));
        }
        $data = [
            'title' => 'History ' . $userId,
            'history' => $promptHistory
        ];
        return Inertia::render('Admin/History/Index', $data);
    }
}