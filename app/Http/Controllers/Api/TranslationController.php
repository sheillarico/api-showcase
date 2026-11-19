<?php

namespace App\Http\Controllers\Api;

use App\Contracts\TranslationProvider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function store(Request $request, TranslationProvider $translator)
    {
        $lang = ['required', 'string', 'regex:/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/'];

        $v = $request->validate([
            'text' => 'required|string|max:250',
            'source' => $lang,
            'target' => $lang,
        ]);

        return response()->json(
            ['data' => $translator->translate($v['text'], $v['source'], $v['target'])],
            201
        );
    }
}