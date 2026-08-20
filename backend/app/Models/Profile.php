<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name',
        'title',
        'bio',
        'photo_url',
        'email',
        'social_links',
        'skills',
    ];

    protected $casts = [
        'social_links' => 'array',
        'skills' => 'array',
    ];
}
