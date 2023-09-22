<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function login(Request $request){
        $jsonData = $request->json()->all();

        //make query
        $results = DB::table('user')
            ->where('username', $jsonData['username'])
            ->where('pass', $jsonData['pass'])
            ->get();

        //return the query results as JSON response
        return response()->json($results);
    }
}
