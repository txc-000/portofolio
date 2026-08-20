<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'role',
        'organization',
        'type',
        'period',
        'description',
        'link',
        'order',
    ];
}
