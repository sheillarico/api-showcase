<?php

namespace App\Services\Weather;

use App\Contracts\WeatherProvider;
use App\Exceptions\UpstreamException;
use App\Support\Upstream;
use Illuminate\Support\Facades\Cache;

class OpenMeteoService implements WeatherProvider
{
    public function forecast(string $city): array
    {
        $key = 'forecast:' . sha1(mb_strtolower($city));

        return Cache::remember($key, now()->addMinutes(30), function () use ($city) {
            $geo = Upstream::get(config('services.open_meteo.geocode_url'), ['name' => $city, 'count' => 1])['results'][0] ?? null;
            if (! $geo) {
                throw new UpstreamException('City not found.', 404);
            }

            $w = Upstream::get(config('services.open_meteo.forecast_url'), [
                'latitude'  => $geo['latitude'],
                'longitude' => $geo['longitude'],
                'current'   => 'temperature_2m,weather_code,wind_speed_10m',
                'daily'     => 'temperature_2m_max,temperature_2m_min,weather_code',
                'timezone'  => 'auto',
            ]);

            return [
                'location' => [
                    'name' => $geo['name'],
                    'country' => $geo['country'] ?? null,
                    'latitude' => $geo['latitude'],
                    'longitude' => $geo['longitude'],
                ],
                'current' => $w['current'],
                'daily'   => $w['daily'],
            ];
        });
    }
}