<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipableController extends Controller
{
    public function show($id)
    {
        // Retrieve the item from the database based on the provided id
        $results = DB::table('Equipable')
            ->where('cookie', $id)
            ->get();

        //return the query results as JSON response
        return response()->json($results);
    }
}

