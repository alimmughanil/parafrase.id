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
            'instruction' => 'Tulis ulang dan buatkan parafrase dari kalimat:'
        ]);
        \App\Models\Prompt::create([
            'type' => 'correction',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Jika kamu adalah ahli bahasa indonesia, perbaiki tata tulis sesuai dengan PUEBI pada kalimat: '
        ]);
        \App\Models\Prompt::create([
            'type' => 'summerize',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Buatkan ringkasan kalimat pada paragraf:'
        ]);
        \App\Models\Prompt::create([
            'type' => 'translate',
            'lang' => 'id',
            'level' => 'low',
            'instruction' => 'Terjemahkan kalimat berikut ',
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
    }
}