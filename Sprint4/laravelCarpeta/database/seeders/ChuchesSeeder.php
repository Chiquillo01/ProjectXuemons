<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChuchesSeeder Extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nombres = [
            'candies', 'candies1', 'candy', 'candy1',
            'candy2', 'candy-cane', 'chocolate-bar',
            'cotton-candy', 'lollipop', 'sweets'
        ];
        $modificador = [
            '1', '2', '1', '2',
            '3', '3', '5',
            '4', '4', '5'
        ];
        $precio = [
            '50', '100', '50', '100',
            '200', '200', '300',
            '250', '250', '300'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('chuches')->insert([
                'nombre' => $nombres[$i],
                'modificador' => $modificador[$i],
                'dinero' => $precio[$i],
                'archivo' => strtolower($nombres[$i]) . '.png',
            ]);
        }
    }
}
