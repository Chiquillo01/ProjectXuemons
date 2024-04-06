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
            '1', '1', '2', '2',
            '3', '3', '4',
            '4', '5', '5'
        ];
        $precio = [
            '50', '100', '150', '200',
            '250', '300', '350',
            '400', '450', '500'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('chuches')->insert([
                'id' => 0,
                'nombre' => $nombres[$i],
                'modificador' => $modificador[$i],
                'dinero' => $precio[$i],
                'archivo' => strtolower($nombres[$i]) . '.png',
            ]);
        }
    }
}
