<?php

namespace App\Http\Controllers\Api;

use App\Contracts\GeolocationProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function current(Request $request, GeolocationProvider $geo)
    {
        return response()->json(['data' => $geo->lookup($request->ip())]);
    }
}