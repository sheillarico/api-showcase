<?php

namespace App\Contracts;

interface WeatherProvider
{
    public function forecast(string $city): array;
}