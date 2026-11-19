<?php

namespace Tests\Feature\Api;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ShowcaseApiTest extends TestCase
{
    public function test_forecast(): void
    {
        Http::fake([
            '*geocoding-api.open-meteo.com*' => Http::response(['results' => [
                ['name' => 'Manila', 'country' => 'Philippines', 'latitude' => 14.6, 'longitude' => 121.0],
            ]]),
            '*://api.open-meteo.com/*' => Http::response([
                'current' => ['temperature_2m' => 30],
                'daily' => ['time' => ['2026-11-19']],
            ]),
        ]);

        $this->getJson('/api/v1/forecasts?city=Manila')
            ->assertOk()
            ->assertJsonPath('data.location.name', 'Manila')
            ->assertJsonPath('data.current.temperature_2m', 30);
    }

    public function test_forecast_requires_city(): void
    {
        $this->getJson('/api/v1/forecasts')->assertStatus(422)->assertJsonValidationErrors('city');
    }

    public function test_city_not_found(): void
    {
        Http::fake(['*geocoding-api.open-meteo.com*' => Http::response([])]);

        $this->getJson('/api/v1/forecasts?city=Nowhereville')->assertNotFound();
    }

    public function test_conversion(): void
    {
        Http::fake(['*frankfurter.dev*' => Http::response(['base' => 'USD', 'date' => '2026-11-19', 'rates' => ['PHP' => 58.0]])]);

        $this->getJson('/api/v1/conversions?from=usd&to=php&amount=100')
            ->assertOk()
            ->assertJsonPath('data.result', 5800)
            ->assertJsonPath('data.to', 'PHP');
    }

    public function test_exchange_rates(): void
    {
        Http::fake(['*frankfurter.dev*' => Http::response(['base' => 'USD', 'date' => '2026-11-19', 'rates' => ['PHP' => 58.0, 'EUR' => 0.9]])]);

        $this->getJson('/api/v1/exchange-rates?base=USD&symbols=PHP,EUR')
            ->assertOk()
            ->assertJsonPath('data.rates.EUR', 0.9);
    }

    public function test_translation_returns_201(): void
    {
        Http::fake(['*mymemory.translated.net*' => Http::response([
            'responseStatus' => 200,
            'responseData' => ['translatedText' => 'Kumusta'],
        ])]);

        $this->postJson('/api/v1/translations', ['text' => 'Hello', 'source' => 'en', 'target' => 'tl'])
            ->assertCreated()
            ->assertJsonPath('data.translation', 'Kumusta');
    }

    public function test_translation_quota_maps_to_429(): void
    {
        Http::fake(['*mymemory.translated.net*' => Http::response([
            'responseStatus' => 429,
            'responseDetails' => 'Quota exceeded',
        ])]);

        $this->postJson('/api/v1/translations', ['text' => 'Hi', 'source' => 'en', 'target' => 'tl'])
            ->assertStatus(429);
    }

    public function test_translation_validates_input(): void
    {
        $this->postJson('/api/v1/translations', ['text' => '', 'source' => 'en'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['text', 'target']);
    }

    public function test_current_location(): void
    {
        Http::fake(['*ipwho.is*' => Http::response([
            'success' => true, 'ip' => '203.0.113.5', 'city' => 'Quezon City',
            'country' => 'Philippines', 'country_code' => 'PH',
            'latitude' => 14.67, 'longitude' => 121.04, 'timezone' => ['id' => 'Asia/Manila'],
        ])]);

        $this->getJson('/api/v1/locations/current')
            ->assertOk()
            ->assertJsonPath('data.country_code', 'PH');
    }

    public function test_holidays(): void
    {
        Http::fake(['*date.nager.at*' => Http::response([
            ['date' => '2026-12-25', 'name' => 'Christmas Day', 'localName' => 'Pasko', 'global' => true, 'types' => ['Public']],
        ])]);

        $this->getJson('/api/v1/countries/ph/holidays?year=2026')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Christmas Day');
    }

    public function test_upstream_timeout_maps_to_504(): void
    {
        Http::fake(fn () => throw new ConnectionException('timeout'));

        $this->getJson('/api/v1/exchange-rates?base=USD')->assertStatus(504);
    }

    public function test_upstream_error_maps_to_502(): void
    {
        Http::fake(['*date.nager.at*' => Http::response('boom', 500)]);

        $this->getJson('/api/v1/countries/PH/holidays?year=2026')->assertStatus(502);
    }
}