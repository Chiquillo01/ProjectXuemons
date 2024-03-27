<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $this->call(UserSeeder::class);
        $this->call(XuxemonsSeeder::class);
        $this->call(XuxemonsUserSeeder::class);
        $this->call(ChuchesSeeder::class);
        $this->call(ChuchesUserSeeder::class);

    }
}
