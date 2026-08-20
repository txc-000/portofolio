<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Portfolio::query()->orderBy('order')->get()
        );
    }

    public function show(Portfolio $portfolio): JsonResponse
    {
        return response()->json($portfolio);
    }
}
