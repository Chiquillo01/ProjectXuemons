<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class XuxemonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nombres = [
            'Apleki', 'Avecrem', 'Bambino', 'Beeboo', 'Boo-hoot'
        ];


        $tipos = [
            'Tierra', 'Aire', 'Tierra', 'Aire', 'Aire'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('pc')->insert([
                'id' => 0,
                'nombre' => $nombres[$i],
                'tipo' => $tipos[$i],
                'tamano' => 1,
                'vida' => 100,
                'archivo' => strtolower($nombres[$i]) . '.png',
            ]);
        }
    }
}
