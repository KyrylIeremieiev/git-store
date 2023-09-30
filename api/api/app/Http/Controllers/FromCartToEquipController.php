<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class FromCartToEquipController extends Controller
{
    public function transfer(Request $request){
        $validatedData = $request->validate([
            'cookie' => 'required|int',
            'item' => 'required|string',
            // Add more validation rules as needed
        ]);

        $results = DB::table('Cart')
            ->where('cookie', $validatedData['cookie'])
            ->where('item', $validatedData["item"])
            ->get();

        foreach ($results as $item) {
            DB::table('Cart')->where('cookie', $item->cookie)->delete();
        }

        DB::table('Equipable')->insert([
            'cookie' => $validatedData["cookie"],
            'item' => $validatedData['item'],
            'equiped' => 0
            // Add more columns and values as needed
        ]);

        return response()->json(['message' => 'Data transfered successfully']);
    }
}
