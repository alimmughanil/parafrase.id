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
            'role' => "1",
        ]);

        \App\Models\User::create([
            'name' => 'Alim Mughanil',
            'email' => 'alim@gmail.com',
            'password' => Hash::make('rahasia123'),
            'remember_token' => Hash::make('secret123'),
        ]);
        \App\Models\Event::create([
            'name' => 'Kota Semarang Bersholawat',
            'date_time' => now(),
        ]);
    }
}