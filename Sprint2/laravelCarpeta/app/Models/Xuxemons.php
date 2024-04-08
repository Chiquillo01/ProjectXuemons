<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Xuxemons extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'tipo',
        'archivo',
        'tamano',
        'evo1',
        'evo2',
    ];

    /**
     * Los usuarios que poseen este Xuxemon.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'xuxemons_users');
    }
}
