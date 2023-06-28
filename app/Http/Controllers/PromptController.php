<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromptController extends Controller
{
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

        $filteredText = $request->text;
        // $validated['language'] digunakan untuk bahasa prompt
        $language = $validated['language'] == 'id' ? 'indonesia' : 'inggris';

        $token = env("CHATGPT_SECRET_KEY");
        $baseUrl = "https://api.openai.com";
        $prompt = null;

        dd($request->type);

        switch ($request->type) {
            case 'paraphrase':
                $prompt = "Tulis ulang dan buatkan parafrase dari kalimat: " . $filteredText;
                break;
            case 'correction':
                $prompt = "Mari bermain peran, kamu adalah seorang ahli Bahasa Indonesia, tolong perbaiki tata tulis sesuai dengan PUEBI pada kalimat: " . $filteredText;
                break;
            case 'summerize':
                $prompt = "buatkan ringkasan kalimat pada paragraf: " . $filteredText;
                break;
            case 'translate':
                $prompt = "Tolong terjemahankan " . $request->translate['from'] . " ke " . $request->translate['to'] . " pada kalimat: " . $filteredText;
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

        return redirect('/')->with('result', $res);
    }
}