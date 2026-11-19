<?php

namespace App\Services\Translation;

use App\Contracts\TranslationProvider;
use App\Exceptions\UpstreamException;
use App\Support\Upstream;
use Illuminate\Support\Facades\Cache;

class MyMemoryService implements TranslationProvider
{
    public function translate(string $text, string $source, string $target): array
    {
        $key = 'translation:' . hash('sha256', "$source|$target|$text");

        return Cache::remember($key, now()->addDay(), function () use ($text, $source, $target) {
            $d = Upstream::get(config('services.mymemory.url'), [
                'q' => $text,
                'langpair' => "$source|$target",
            ]);

            // MyMemory reports its own errors (such as quota) inside a 200 response.
            $status = (int) ($d['responseStatus'] ?? 0);
            if ($status !== 200) {
                throw new UpstreamException(
                    is_string($d['responseDetails'] ?? null) ? $d['responseDetails'] : 'Translation failed.',
                    $status === 429 ? 429 : 502
                );
            }

            return [
                'source' => $source,
                'target' => $target,
                'text' => $text,
                'translation' => $d['responseData']['translatedText'],
            ];
        });
    }
}