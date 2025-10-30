<?php

namespace App\Http\Controllers;

use App\Models\AdminProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminProfileController extends Controller
{
    /**
     * Display the admin profile (typically just one admin).
     */
    public function index()
    {
        // Get the first admin profile (or you can modify to handle multiple admins)
        $admin = AdminProfile::first();
        
        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'No admin profile found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }

    /**
     * Display the specified admin profile.
     */
    public function show(string $id)
    {
        $admin = AdminProfile::find($id);
        
        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }

    /**
     * Update the admin profile.
     */
    public function update(Request $request, string $id)
    {
        $admin = AdminProfile::find($id);
        
        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|regex:/^[a-zA-Z\s\.\-\']+$/',
            'email' => 'sometimes|email|max:255|unique:admin_profiles,email,' . $id,
            'mobile_number' => 'sometimes|string|regex:/^(09\d{9}|\+639\d{9})$/',
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|string'
        ]);

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $admin->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Admin profile updated successfully',
            'data' => $admin
        ]);
    }
}
