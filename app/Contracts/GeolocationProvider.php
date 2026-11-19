<?php

namespace App\Contracts;

interface GeolocationProvider
{
    public function lookup(?string $ip): array;
}