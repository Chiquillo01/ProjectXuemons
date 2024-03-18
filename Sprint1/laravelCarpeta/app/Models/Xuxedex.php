<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Xuxedex extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'archive',
    ];
}
