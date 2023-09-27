<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartModel;
class CartController extends Controller
{
    public function insertData(Request $request)
    {
            // Validate the incoming JSON data if needed
            $validatedData = $request->validate([
                'cookie' => 'required|int',
                'item' => 'required|string',
                // Add more validation rules as needed
            ]);
    
            // Create a new model instance and set its attributes
            $model = new CartModel();
            $model->cookie = $validatedData['cookie'];
            $model->item = $validatedData['item'];
            // Set other attributes as needed
    
            // Save the model to the database
            $model->save();
    
            // Optionally, return a response indicating success
            return response()->json(['message' => 'Data inserted successfully']);
        }
}
