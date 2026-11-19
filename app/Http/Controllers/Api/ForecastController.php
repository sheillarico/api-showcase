<?php

namespace App\Http\Controllers\Api;

use App\Contracts\WeatherProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForecastController extends Controller
{
    public function index(Request $request, WeatherProvider $weather)
    {
        $v = $request->validate(['city' => 'required|string|max:80']);

        return response()->json(['data' => $weather->forecast(trim($v['city']))]);
    }
}