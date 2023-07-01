<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('rahasia123'),
            'remember_token' => Hash::make('secret123'),
            'role' => "admin",
            'type' => 'administrator'
        ]);

        $user = \App\Models\User::create([
            'name' => 'Alim Mughanil',
            'email' => 'alim@gmail.com',
            'password' => Hash::make('rahasia123'),
            'remember_token' => Hash::make('secret123'),
        ]);
        \App\Models\Prompt::create([
            'type' => 'paraphrase',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Parafrase ini untuk siswa kelas dua'
        ]);
        \App\Models\Prompt::create([
            'type' => 'correction',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Perbaiki ini ke bahasa Indonesia standar berdasarkan PUEBI'
        ]);
        \App\Models\Prompt::create([
            'type' => 'summerize',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Ringkaslah ini untuk siswa kelas dua'
        ]);
        \App\Models\Prompt::create([
            'type' => 'translate',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Terjemahkan ini ',
            'additional' => json_encode([
                'translate' => [
                    'from' => 'bahasa indonesia',
                    'to' => 'bahasa inggris',
                ],
                'conjunction' => [
                    'from' => 'dari',
                    'to' => 'ke'
                ]
            ])
        ]);

        \App\Models\Prompt::create([
            'type' => 'paraphrase',
            'lang' => 'en',
            'level' => 'low',
            'instruction' => 'Paraphrase this for a second-grade student'
        ]);
        \App\Models\Prompt::create([
            'type' => 'correction',
            'lang' => 'en',
            'level' => 'low',
            'instruction' => 'Correct this to standard English'
        ]);
        \App\Models\Prompt::create([
            'type' => 'summerize',
            'lang' => 'en',
            'level' => 'low',
            'instruction' => 'Summarize this for a second-grade student'
        ]);
        \App\Models\Prompt::create([
            'type' => 'translate',
            'lang' => 'en',
            'level' => 'low',
            'instruction' => 'Translate this',
            'additional' => json_encode([
                'translate' => [
                    'from' => 'english',
                    'to' => 'indonesia',
                ],
                'conjunction' => [
                    'from' => 'from',
                    'to' => 'into'
                ]
            ])
        ]);

        \App\Models\Configuration::create([
            'type' => 'CHATGPT_SECRET_KEY',
            'value' => env('CHATGPT_SECRET_KEY')
        ]);
        \App\Models\Configuration::create([
            'type' => 'CHATGPT_SECRET_KEY',
            'value' => env('CHATGPT_SECRET_KEY')
        ]);
        \App\Models\PromptHistory::create([
            'user_id' => $user->id,
            'ip_address' => '103.140.10.100',
            'user_agent' => 'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36',
            'prompt_text' => 'Terjemahkan ini dari bahasa indonesia ke bahasa inggris: Bahasa pemrograman adalah cara untuk menuliskan instruksi yang akan diberikan kepada komputer. Banyak bahasa pemrograman berbasis teks, tetapi ada juga yang berbasis grafis. Deskripsi dari bahasa pemrograman biasanya dibagi menjadi dua bagian, yaitu sintaks dan semantik. Sintaks dan semantik didefinisikan dengan bahasa yang formal.',
            'result_text' => 'Programming language is a way to write instructions to be given to the computer. Many programming languages are text-based, but some are graphical-based. The description of a programming language is usually divided into two parts, namely syntax and semantics. Syntax and semantics are defined in a formal language.',
        ]);
    }
}