<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class AvatarController extends Controller
{
    public function Equip(Request $request){
        // Validate the incoming JSON data if needed
        $validatedData = $request->validate([
            'cookie' => 'required|int',
            'item' => 'required|string'
            // Add more validation rules as needed
        ]);

        $results = DB::table('Equipable')
            ->where('cookie', $validatedData['cookie'])
            ->where('equiped', 1)
            ->get();

        foreach ($results as $item) {
            DB::table('Equipable')
                ->where('cookie', $item->cookie)
                ->where('equiped', 1)
                ->delete();

            DB::table('Equipable')->insert([
                'cookie' => $item->cookie,
                'item' => $item->item,
                'equiped' => 0
                // Add more columns and values as needed
            ]);
        }

        $toBeEquiped = DB::table('Equipable')
            ->where('cookie', $validatedData['cookie'])
            ->where('item', $validatedData['item'])
            ->get();

        foreach ($toBeEquiped as $item){
            
            DB::table('Equipable')
                ->where('cookie', $item->cookie)
                ->where('equiped', 1)
                ->delete();

            DB::table('Equipable')->insert([
                'cookie' => $item->cookie,
                'item' => $item->item,
                'equiped' => 1
                // Add more columns and values as needed
            ]);
        }
        

        

        
    }
}
