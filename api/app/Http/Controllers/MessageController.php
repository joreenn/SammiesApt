<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of messages (recent messages).
     */
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')
            ->take(50) // Get last 50 messages
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    /**
     * Store a newly created message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'nullable|exists:tenants,id',
            'tenant_name' => 'nullable|string|max:255',
            'message' => 'required|string',
            'is_broadcast' => 'boolean'
        ]);

        $message = Message::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified message.
     */
    public function show(string $id)
    {
        $message = Message::find($id);
        
        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    /**
     * Remove the specified message.
     */
    public function destroy(string $id)
    {
        $message = Message::find($id);
        
        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found'
            ], 404);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully'
        ]);
    }
}
