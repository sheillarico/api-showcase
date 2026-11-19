<?php

return [

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'open_meteo' => [
        'geocode_url'  => 'https://geocoding-api.open-meteo.com/v1/search',
        'forecast_url' => 'https://api.open-meteo.com/v1/forecast',
    ],
    'frankfurter' => ['url' => 'https://api.frankfurter.dev/v1'],
    'mymemory'    => ['url' => 'https://api.mymemory.translated.net/get'],
    'ipwho'       => ['url' => 'https://ipwho.is'],
    'nager'       => ['url' => 'https://date.nager.at/api/v3'],

];
