<?php
namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    // List tenants
    public function index()
    {
        return response()->json(Tenant::all());
    }

    // Show tenant
    public function show($id)
    {
        $tenant = Tenant::findOrFail($id);
        return response()->json($tenant);
    }

    // Add a new tenant
    public function store(Request $request)
    {
        // Collect data from request
        $data = $request->only(['name', 'room', 'contact', 'email', 'gender']);

        // Handle avatar upload
        if($request->hasFile('avatar')){
            $avatarName = time() . '_' . $request->avatar->getClientOriginalName();
            $request->avatar->move(public_path('avatars'), $avatarName);
            $data['avatar'] = $avatarName;
        } else {
            $data['avatar'] = null; // or default image
        }

        // Create tenant
        $tenant = Tenant::create($data);

        // Return JSON response
        return response()->json([
            'message' => 'Tenant added successfully',
            'tenant' => $tenant
        ]);
    }

    // Update tenant
    public function update(Request $request, $id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->update($request->all());
        return response()->json($tenant);
    }

    // Delete tenant
    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();
        return response()->json(['message' => 'Tenant deleted successfully']);
    }
}
