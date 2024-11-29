<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIChatController extends Controller
{
    public function index()
    {
        // Fetch the chat messages
        $messages = ChatMessage::all();

        // Return messages with the 'id' field
        return response()->json($messages);
    }
    public function getResponse(Request $request)
    {
        // Save user's message to the database
        ChatMessage::create([
            'user_id' => auth()->id(), // Optional: null for guests
            'sender' => 'user',
            'message' => $request->input('userInput'),
        ]);
    
        // Send user's message to the Rasa server
        $rasaEndpoint = env('RASA_SERVER_URL', 'http://localhost:5005/webhooks/rest/webhook');
        $response = Http::post($rasaEndpoint, [
            'sender' => auth()->id() ?? 'guest', // Unique sender ID
            'message' => $request->input('userInput'),
        ]);
    
        // Parse the response
        $responseMessage = $response->json()[0]['text'] ?? 'Sorry, something went wrong.';
    
        // Save bot's response to the database
        ChatMessage::create([
            'user_id' => auth()->id(), // Optional: null for guests
            'sender' => 'bot',
            'message' => $responseMessage,
        ]);
    
        // Return the bot's response to the frontend
        return response()->json(['response' => $responseMessage]);
    }
    

    public function getConversationHistory(Request $request)
    {
        $messages = ChatMessage::where('user_id', auth()->id())
            ->orderBy('created_at', 'asc')
            ->get(['id', 'sender', 'message']); // Ensure 'id' is included
    
        return response()->json($messages);
    }
    

    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'text' => 'required|string|max:1000',
        ]);
    
        // Find the message by its ID
        $message = ChatMessage::find($id);
    
        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }
    
        // Update the message with the validated data
        $message->update(['message' => $validatedData['text']]);
    
        // Return a success response with the updated message
        return response()->json(['message' => 'Message updated successfully', 'data' => $message], 200);
    }
    

    // Delete the message
    public function destroy($id)
    {
        $message = ChatMessage::find($id);
        
        if ($message) {
            $message->delete();
            return response()->json(['message' => 'Message deleted successfully']);
        }
        
        return response()->json(['error' => 'Message not found'], 404);
    }
}
