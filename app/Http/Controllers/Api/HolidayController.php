<?php

namespace App\Http\Controllers\Api;

use App\Contracts\HolidayProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function index(Request $request, string $code, HolidayProvider $holidays)
    {
        $v = validator(
            ['code' => $code, 'year' => $request->query('year', now()->year)],
            ['code' => 'required|alpha|size:2', 'year' => 'required|integer|between:1975,2075']
        )->validate();

        return response()->json(['data' => $holidays->holidays(strtoupper($v['code']), (int) $v['year'])]);
    }
}