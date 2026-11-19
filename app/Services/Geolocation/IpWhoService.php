<?php

namespace App\Services\Geolocation;

use App\Contracts\GeolocationProvider;
use App\Exceptions\UpstreamException;
use App\Support\Upstream;
use Illuminate\Support\Facades\Cache;

class IpWhoService implements GeolocationProvider
{
    public function lookup(?string $ip): array
    {
        // Private/loopback addresses (e.g. 127.0.0.1 in local dev) can't be looked up,
        // so ask the provider about the caller's own public IP instead.
        $public = $ip && filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
        $target = $public ? $ip : '';

        return Cache::remember('geo:' . ($public ? $ip : 'self'), now()->addHour(), function () use ($target) {
            $d = Upstream::get(rtrim(config('services.ipwho.url'), '/') . '/' . $target);

            if (! ($d['success'] ?? false)) {
                throw new UpstreamException('Could not determine location.', 502);
            }

            return [
                'ip' => $d['ip'],
                'city' => $d['city'] ?? null,
                'region' => $d['region'] ?? null,
                'country' => $d['country'] ?? null,
                'country_code' => $d['country_code'] ?? null,
                'latitude' => $d['latitude'] ?? null,
                'longitude' => $d['longitude'] ?? null,
                'timezone' => $d['timezone']['id'] ?? null,
            ];
        });
    }
}