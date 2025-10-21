<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tenants = Tenant::all();
            return response()->json(['data' => $tenants], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching tenants: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Debug: Log what we're receiving
            Log::info('Request data:', $request->all());
            Log::info('Has file avatar:', [$request->hasFile('avatar')]);
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
                Log::info('Avatar file info:', [
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                    'is_valid' => $file->isValid()
                ]);
            }

            $validator = Validator::make($request->all(), [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^[a-zA-Z\s\.\-\']+$/', // Only letters, spaces, dots, hyphens, apostrophes
                    'not_regex:/^\d+$/' // Cannot be pure numbers
                ],
                'room' => [
                    'required',
                    'string',
                    'max:50',
                    'unique:tenants,room' // Prevent duplicate room numbers
                ],
                'contact' => [
                    'required',
                    'regex:/^(09\d{9}|\+639\d{9})$/' // Philippine format: 09XXXXXXXXX (11 digits) or +639XXXXXXXXX (13 chars)
                ],
                'email' => 'required|email|unique:tenants,email',
                'gender' => 'required|in:Male,Female',
                'avatar' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,avif|max:5120'
            ], [
                // Custom error messages
                'name.regex' => 'Name must contain only letters, spaces, dots, hyphens, and apostrophes.',
                'name.not_regex' => 'Name cannot be pure numbers.',
                'room.unique' => 'This room number is already taken.',
                'contact.regex' => 'Contact must be a valid Philippine number (e.g., 09123456789 or +639123456789).',
                'contact.digits_between' => 'Contact must be 11 digits (09XXXXXXXXX) or 13 digits (+639XXXXXXXXX).'
            ]);

            if ($validator->fails()) {
                Log::error('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $request->all();

            // Handle file upload
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $filename = time() . '_' . $avatar->getClientOriginalName();
                $avatar->storeAs('avatars', $filename, 'public');
                $data['avatar'] = 'storage/avatars/' . $filename;
            }

            $tenant = Tenant::create($data);
            return response()->json([
                'data' => $tenant, 
                'message' => 'Tenant created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating tenant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $tenant = Tenant::findOrFail($id);
            return response()->json(['data' => $tenant], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Tenant not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $tenant = Tenant::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:255',
                    'regex:/^[a-zA-Z\s\.\-\']+$/',
                    'not_regex:/^\d+$/'
                ],
                'room' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:50',
                    'unique:tenants,room,' . $id // Exclude current tenant from unique check
                ],
                'contact' => [
                    'sometimes',
                    'required',
                    'regex:/^(09\d{9}|\+639\d{9})$/'
                ],
                'email' => 'sometimes|required|email|unique:tenants,email,' . $id,
                'gender' => 'sometimes|required|in:Male,Female',
                'avatar' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,avif|max:5120'
            ], [
                'name.regex' => 'Name must contain only letters, spaces, dots, hyphens, and apostrophes.',
                'name.not_regex' => 'Name cannot be pure numbers.',
                'room.unique' => 'This room number is already taken.',
                'contact.regex' => 'Contact must be a valid Philippine number (e.g., 09123456789 or +639123456789).',
                'contact.digits_between' => 'Contact must be 11 digits (09XXXXXXXXX) or 13 digits (+639XXXXXXXXX).'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $data = $request->except(['avatar']);

            // Handle file upload
            if ($request->hasFile('avatar')) {
                // Delete old avatar if exists
                if ($tenant->avatar) {
                    $oldPath = str_replace('storage/avatars/', '', $tenant->avatar);
                    Storage::disk('public')->delete('avatars/' . $oldPath);
                }

                $avatar = $request->file('avatar');
                $filename = time() . '_' . $avatar->getClientOriginalName();
                $avatar->storeAs('avatars', $filename, 'public');
                $data['avatar'] = 'storage/avatars/' . $filename;
            }

            $tenant->update($data);
            return response()->json([
                'data' => $tenant, 
                'message' => 'Tenant updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error updating tenant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $tenant = Tenant::findOrFail($id);
            
            // Delete avatar if exists
            if ($tenant->avatar) {
                $oldPath = str_replace('storage/avatars/', '', $tenant->avatar);
                Storage::disk('public')->delete('avatars/' . $oldPath);
            }

            $tenant->delete();
            return response()->json(['message' => 'Tenant deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error deleting tenant: ' . $e->getMessage()
            ], 500);
        }
    }
}
