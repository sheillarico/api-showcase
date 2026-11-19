<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ExchangeRateProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExchangeRateController extends Controller
{
    public function index(Request $request, ExchangeRateProvider $rates)
    {
        $v = $request->validate([
            'base' => 'required|alpha|size:3',
            'symbols' => ['nullable', 'regex:/^[A-Za-z]{3}(,[A-Za-z]{3})*$/'],
        ]);

        $symbols = isset($v['symbols']) ? explode(',', strtoupper($v['symbols'])) : [];

        return response()->json(['data' => $rates->rates(strtoupper($v['base']), $symbols)]);
    }
}