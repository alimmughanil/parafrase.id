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
        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('rahasia123'),
            'remember_token' => Hash::make('secret123'),
            'role' => "admin",
        ]);

        \App\Models\User::create([
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
    }
}