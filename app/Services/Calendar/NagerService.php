<?php

namespace App\Services\Calendar;

use App\Contracts\HolidayProvider;
use App\Support\Upstream;
use Illuminate\Support\Facades\Cache;

class NagerService implements HolidayProvider
{
    public function holidays(string $country, int $year): array
    {
        return Cache::remember("holidays:$country:$year", now()->addDay(), function () use ($country, $year) {
            $list = Upstream::get(config('services.nager.url') . "/PublicHolidays/$year/$country");

            return array_map(fn ($h) => [
                'date' => $h['date'],
                'name' => $h['name'],
                'local_name' => $h['localName'],
                'global' => $h['global'] ?? true,
                'types' => $h['types'] ?? [],
            ], $list);
        });
    }
}