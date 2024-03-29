<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class XuxemonsUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nombres = [
            'Apleki', 'Avecrem', 'Bambino', 'Beeboo', 'Boo-hoot', 'Cabrales'
        ];

        $tipo = [
            'Tierra', 'Aire', 'Tierra', 'Aire', 'Aire', 'Tierra'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('xuxemons_users')->insert([
                'id' => 0,
                'nombre' => $nombres[$i],
                'tipo' => $tipo[$i],
                'tamano' => 1,
                'comida' => 0,
                'vida' => 100,
                'archivo' => strtolower($nombres[$i]) . '.png',
                'idUser' => 1
            ]);
        }
    }
}
