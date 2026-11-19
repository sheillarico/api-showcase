<?php

namespace App\Contracts;

interface ExchangeRateProvider
{
    /** @param string[] $symbols empty = all currencies */
    public function rates(string $base, array $symbols = []): array;
}