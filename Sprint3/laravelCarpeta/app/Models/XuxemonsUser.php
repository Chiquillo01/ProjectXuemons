<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XuxemonsUser extends Model
{
    use HasFactory;

    protected $primaryKey = 'xuxemon_id';
    protected $fillable = [
        'xuxemon_id',
        'user_id',
        'comida',
        'activo',
        'favorito',
    ];
    
    /**
     * Obtener el Xuxemon asociado a este registro pivot.
     */
    public function xuxemon()
    {
        return $this->belongsTo(Xuxemons::class, 'xuxemon_id');
    }

    /**
     * Obtener el usuario asociado a este registro pivot.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

