<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required'],
            'text' => ['required'],
        ]);

        $token = env("CHATGPT_SECRET_KEY");
        $baseUrl = "https://api.openai.com";
        $prompt = null;

        switch ($request->type) {
            case 'paraphrase':
                $prompt = "buatkan parafrase dari kalimat: " . $request->text;
                break;
            case 'correction':
                $prompt = "Tulis ulang dan perbaiki tata bahasa sesuai dengan PUEBI pada paragraf: " . $request->text;
                break;
            case 'summerize':
                $prompt = "buatkan ringkasan kalimat pada paragraf: " . $request->text;
                break;
            case 'translateId':
                $prompt = "terjemahankan bahasa indonesia ke bahasa inggris pada kalimat: " . $request->text;
                break;
        }

        if (!$prompt) return redirect('/')->with('message', 'Gagal membuat prompt');

        $client = new Client(['base_uri' => $baseUrl]);

        $req = $client->post('/v1/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token
            ],
            'json' => [
                "model" => "text-davinci-003",
                "prompt" => $prompt,
                "max_tokens" => 2048,
                "temperature" => 0,
                "top_p" => 1.0,
                "frequency_penalty" => 0.0,
                "presence_penalty" => 0.0
            ]
        ]);
        $res = $req->getBody()->getContents();

        return Inertia::render('Home', [
            'result' => $res
        ]);
    }
}