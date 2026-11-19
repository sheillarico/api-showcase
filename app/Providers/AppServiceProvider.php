
<?php

namespace App\Providers;

use App\Contracts\ExchangeRateProvider;
use App\Contracts\GeolocationProvider;
use App\Contracts\HolidayProvider;
use App\Contracts\TranslationProvider;
use App\Contracts\WeatherProvider;
use App\Services\Calendar\NagerService;
use App\Services\Currency\FrankfurterService;
use App\Services\Geolocation\IpWhoService;
use App\Services\Translation\MyMemoryService;
use App\Services\Weather\OpenMeteoService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public array $bindings = [
        WeatherProvider::class      => OpenMeteoService::class,
        ExchangeRateProvider::class => FrankfurterService::class,
        TranslationProvider::class  => MyMemoryService::class,
        GeolocationProvider::class  => IpWhoService::class,
        HolidayProvider::class      => NagerService::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}