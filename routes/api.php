<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:30,1')->group(function () {
    Route::get('/ping', fn () => ['status' => 'ok']);
});