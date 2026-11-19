<?php

namespace App\Contracts;

interface HolidayProvider
{
    public function holidays(string $country, int $year): array;
}