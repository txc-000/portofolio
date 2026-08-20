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
        'location',
        'phone',
        'cv_url',
        'social_links',
        'skills',
        'tools',
    ];

    protected $casts = [
        'social_links' => 'array',
        'skills' => 'array',
        'tools' => 'array',
    ];
}
