<?php

use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/portfolios', [PortfolioController::class, 'index']);
Route::get('/portfolios/{portfolio}', [PortfolioController::class, 'show']);
Route::get('/experiences', [ExperienceController::class, 'index']);
