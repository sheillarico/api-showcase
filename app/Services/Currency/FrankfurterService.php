<?php

namespace App\Services\Currency;

use App\Contracts\ExchangeRateProvider;
use App\Support\Upstream;
use Illuminate\Support\Facades\Cache;

class FrankfurterService implements ExchangeRateProvider
{
    public function rates(string $base, array $symbols = []): array
    {
        $symbols = array_values(array_unique($symbols));
        sort($symbols);

        return Cache::remember('rates:' . $base . ':' . implode(',', $symbols), now()->addHour(), function () use ($base, $symbols) {
            $d = Upstream::get(config('services.frankfurter.url') . '/latest', array_filter([
                'base'    => $base,
                'symbols' => implode(',', $symbols),
            ]));

            return ['base' => $d['base'], 'date' => $d['date'], 'rates' => $d['rates']];
        });
    }
}