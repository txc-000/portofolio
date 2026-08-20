<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortfolioFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'project_url',
        'repo_url',
        'tech_stack',
        'order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
    ];
}
