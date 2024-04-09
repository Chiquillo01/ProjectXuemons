<?php

namespace Database\Seeders;

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
            'Apleki', 'Avecrem', 'Bambino', 'Beeboo', 'Boo-hoot', 'Cabrales', 'Catua', 'Catyuska', 'Chapapá',
            'Chopper', 'Cuellilargui', 'Deskangoo', 'Doflamingo', 'Dolly', 'Elconchudo', 'Eldientes', 'Elgominas',
            'Flipper', 'Floppi', 'Horseluis', 'Krokolisko', 'Kurama', 'Ladybug', 'Lengualargui', 'Medusation',  'Meekmeek',
            'Megalo', 'Mocha', 'Murcimurci', 'Nemo', 'Oinkcelot', 'Oreo', 'Otto', 'Pinchimott', 'Pollis', 'Posón', 'Quakko',
            'Rajoy', 'Rawlion', 'Rexxo', 'Ron', 'Sesssi', 'Shelly', 'Sirucco', 'Torcas', 'Trompeta', 'Trompi', 'Tux'
        ];


        $tipo = [
            'Tierra', 'Aire', 'Tierra', 'Aire', 'Aire', 'Tierra', 'Aire', 'Aire', 'Agua', 'Tierra', 'Tierra',
            'Tierra', 'Aire', 'Tierra', 'Agua', 'Agua', 'Tierra', 'Agua', 'Tierra', 'Agua', 'Agua', 'Tierra', 'Aire',
            'Tierra', 'Agua', 'Tierra', 'Agua', 'Agua', 'Aire', 'Agua', 'Tierra', 'Tierra', 'Tierra', 'Agua', 'Aire',
            'Aire', 'Agua', 'Aire', 'Tierra', 'Tierra', 'Tierra', 'Tierra', 'Agua', 'Aire', 'Agua', 'Aire', 'Tierra',
            'Agua', 'Agua', 'Aire'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('xuxemons')->insert([
                'nombre' => $nombres[$i],
                'tipo' => $tipo[$i],
                'archivo' => strtolower($nombres[$i]) . '.png',
            ]);
        }
    }
}
