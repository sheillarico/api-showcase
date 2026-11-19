<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ExchangeRateProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConversionController extends Controller
{
    public function index(Request $request, ExchangeRateProvider $rates)
    {
        $v = $request->validate([
            'from' => 'required|alpha|size:3',
            'to' => 'required|alpha|size:3',
            'amount' => 'required|numeric|gt:0|max:1000000000',
        ]);

        $from = strtoupper($v['from']);
        $to = strtoupper($v['to']);
        $amount = (float) $v['amount'];

        if ($from === $to) {
            $rate = 1.0;
            $date = now()->toDateString();
        } else {
            $r = $rates->rates($from, [$to]);
            $rate = (float) $r['rates'][$to];
            $date = $r['date'];
        }

        return response()->json(['data' => [
            'from' => $from,
            'to' => $to,
            'amount' => $amount,
            'rate' => $rate,
            'result' => round($amount * $rate, 2),
            'date' => $date,
        ]]);
    }
}