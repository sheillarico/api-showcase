<?php

namespace App\Contracts;

interface TranslationProvider
{
    public function translate(string $text, string $source, string $target): array;
}