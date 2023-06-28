<?php

namespace App\Http\Controllers;

use App\Models\PromptHistory;
use Illuminate\Http\Request;

class PromptHistoryController extends Controller
{
    public function get($request)
    {
        $promptHistory = PromptHistory::where('ip_address', $request->ip())->orWhere('user_agent', $request->userAgent())->get();
        return $promptHistory;
    }

    public function store($request)
    {
        $promptHistory = PromptHistory::create([
            'user_id' => $request->user_id ? $request->user_id : null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        return $promptHistory;
    }
}
