<?php

use App\Http\Controllers\Api\{ConversionController, ExchangeRateController, ForecastController, HolidayController, LocationController, TranslationController};
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:30,1')->group(function () {
    Route::get('/ping', fn () => ['status' => 'ok']);

    Route::get('/forecasts', [ForecastController::class, 'index']);
    Route::get('/exchange-rates', [ExchangeRateController::class, 'index']);
    Route::get('/conversions', [ConversionController::class, 'index']);
    Route::post('/translations', [TranslationController::class, 'store']);
    Route::get('/locations/current', [LocationController::class, 'current']);
    Route::get('/countries/{code}/holidays', [HolidayController::class, 'index']);
});