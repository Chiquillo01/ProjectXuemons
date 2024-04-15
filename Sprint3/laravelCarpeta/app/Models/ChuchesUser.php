<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuchesUser extends Model
{
    use HasFactory;

    protected $primaryKey = 'chuche_id';
    protected $fillable = [
        'chuche_id',
        'user_id',
        'stack'
    ];
}
