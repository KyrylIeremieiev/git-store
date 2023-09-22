<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CreateAccountModel;

class CreateAccountController extends Controller
{
    public function insertData(Request $request)
    {
            // Validate the incoming JSON data if needed
            $validatedData = $request->validate([
                'cookie' => 'required|int',
                'username' => 'required|string',
                'pass' => 'required|string',
                // Add more validation rules as needed
            ]);
    
            // Create a new model instance and set its attributes
            $model = new createAccountModel();
            $model->cookie = $validatedData['cookie'];
            $model->username = $validatedData['username'];
            $model->pass = $validatedData['pass'];
            // Set other attributes as needed
    
            // Save the model to the database
            $model->save();
    
            // Optionally, return a response indicating success
            return response()->json(['message' => 'Data inserted successfully']);
        }
    }

