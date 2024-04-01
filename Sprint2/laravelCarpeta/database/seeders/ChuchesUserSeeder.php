<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChuchesUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nombres = [
            'candies', 'candies1'
        ];
        $modificador = [
            '1', '1'
        ];
        $precio = [
            '50', '100'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('chuches_users')->insert([
                'id' => 0,
                'nombre' => $nombres[$i],
                'modificador' => $modificador[$i],
                'dinero' => $precio[$i],
                'archivo' => strtolower($nombres[$i]) . '.png',
                'idUser' => 1
            ]);
        }
    }
}
