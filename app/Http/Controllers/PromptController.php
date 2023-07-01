<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Prompt;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\PromptHistory;
use App\Http\Controllers\PromptHistoryController;
use App\Models\Configuration;

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
        $tokens = Configuration::select('value')->where('type', 'CHATGPT_SECRET_KEY')->get();
        if ($tokens->isEmpty()) return redirect('/')->with('message', 'Sistem belum siap. harap coba lagi di lain waktu');;
        $promptHistory = $this->promptHistoryController->get($request);

        if (!auth()->check() && !$promptHistory->isEmpty()) {
            return redirect('/login')->with('message', 'Anda telah mencapai batas pemakaian, silahkan masuk menggunakan akun anda terlebih dahulu');
        }

        if (auth()->check() && auth()->user()->type == 'basic' && count($promptHistory) >= auth()->user()->limit) {
            return redirect('/')->with('message', 'Anda telah mencapai batas pemakaian akun basic, silahkan upgrade akun anda terlebih dahulu');
        };

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

        $status = false;
        foreach ($tokens as $token) {
            if (!$status) {
                try {
                    $baseUrl = "https://api.openai.com";
                    $client = new Client(['base_uri' => $baseUrl]);
                    $req = $client->post('/v1/completions', [
                        'headers' => [
                            'Authorization' => 'Bearer ' . $token->value
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
                    $response = $req->getBody()->getContents();
                    $status = true;
                } catch (\Throwable $th) {
                    $status = false;
                }
            }
        }
        if (!$status) return redirect('/')->with('message', 'Sistem belum siap. harap coba lagi di lain waktu');

        $result = json_decode($response);
        $history = [
            'user_id' => auth()->check() ? auth()->user()->id : null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'prompt_text' => $instruction,
            'result_text' => $result->choices[0]->text,
        ];
        $this->promptHistoryController->store($history);

        return redirect('/')->with('result', $response);
    }
}