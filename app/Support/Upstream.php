<?php

namespace App\Support;

use App\Exceptions\UpstreamException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

final class Upstream
{
    public static function get(string $url, array $query = [], int $timeout = 8): array
    {
        try {
            $res = Http::timeout($timeout)->acceptJson()->get($url, $query);
        } catch (ConnectionException) {
            throw new UpstreamException('The upstream service did not respond in time.', 504);
        }

        if ($res->status() === 404) {
            throw new UpstreamException('Resource not found.', 404);
        }
        if ($res->failed()) {
            throw new UpstreamException('The upstream service returned an error.', 502);
        }

        return $res->json() ?? throw new UpstreamException('Invalid response from upstream.', 502);
    }
}