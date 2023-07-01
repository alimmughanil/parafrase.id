<?php

namespace App\Http\Controllers;

use App\Models\PromptHistory;
use Illuminate\Http\Request;

class PromptHistoryController extends Controller
{
    public function get($request)
    {
        if (env('APP_ENV') == "local") {
            if (!auth()->check()) return collect([]);
            $promptHistory = PromptHistory::where('user_id', auth()->user()->id)->get();
        } else {
            if (auth()->check()) {
                $promptHistory = PromptHistory::where('user_id', auth()->user()->id)
                    ->orWhere('ip_address', $request->ip())
                    ->orWhere('user_agent', $request->userAgent())
                    ->get();
            } else {
                $promptHistory = PromptHistory::where('ip_address', $request->ip())
                    ->orWhere('user_agent', $request->userAgent())
                    ->get();
            }
        }

        return $promptHistory;
    }

    public function store($history)
    {
        $promptHistory = PromptHistory::create($history);
        return $promptHistory;
    }
}