<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Prompt;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\PromptHistory;
use App\Http\Controllers\PromptHistoryController;

class PromptController extends Controller
{
    public function __construct(PromptHistoryController $promptHistoryController)
    {
        $this->promptHistoryController = $promptHistoryController;
    }
    public function index()
    {
        return redirect('/');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required'],
            'text' => ['required'],
            'language' => ['required'],
        ]);

        try {
            $promptHistory = $this->promptHistoryController->get($request);
            // if (!$promptHistory->isEmpty() && !auth()->check()) return redirect('/login')->with('message', 'Anda telah mencapai batas pemakaian, silahkan masuk menggunakan akun anda terlebih dahulu');
            // if (count($promptHistory) >= auth()->user()->limit) return redirect('/')->with('message', 'Anda telah mencapai batas pemakaian akun basic, silahkan upgrade akun anda terlebih dahulu');

            $prompt = Prompt::where('type', $request->type)->where('lang', $request->language)->first();
            if (!$prompt) return redirect('/')->with('message', 'Gagal membuat prompt');

            $additional = json_decode($prompt->additional);
            $instruction = $prompt->instruction;

            if ($request->type == "translate") {
                $instruction .= ' ' . $additional->conjunction->to;
                $instruction .= ' ' . $additional->translate->to;
            }
            $instruction .= ': ';
            $instruction .= $request->text;

            $token = env("CHATGPT_SECRET_KEY");
            $baseUrl = "https://api.openai.com";
            $client = new Client(['base_uri' => $baseUrl]);
            $req = $client->post('/v1/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token
                ],
                'json' => [
                    "model" => $prompt->model,
                    "prompt" => $instruction,
                    "max_tokens" => floatval($prompt->max_tokens),
                    "temperature" => floatval($prompt->temperature),
                    "top_p" => floatval($prompt->top_p),
                    "frequency_penalty" => floatval($prompt->frequency_penalty),
                    "presence_penalty" => floatval($prompt->presence_penalty)
                ]
            ]);
            $res = $req->getBody()->getContents();

            $this->promptHistoryController->store($request);

            return redirect('/')->with('result', $res);
        } catch (\Throwable $th) {
            dd($th);
            return redirect('/')->with('message', 'Gagal membuat prompt');
        }
    }
}
