<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceReport;
use Illuminate\Http\Request;

class MaintenanceReportController extends Controller
{
    /**
     * Display a listing of maintenance reports.
     */
    public function index()
    {
        $reports = MaintenanceReport::orderBy('start_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    /**
     * Store a newly created maintenance report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'nullable|exists:tenants,id',
            'tenant_name' => 'required|string|max:255|regex:/^[a-zA-Z\s\.\-\']+$/',
            'room_number' => 'required|string|max:50|regex:/^[A-Z0-9]+$/i',
            'maintenance_type' => 'required|string|max:255',
            'note' => 'nullable|string',
            'start_date' => 'required|date',
            'price' => 'nullable|numeric|min:0',
            'status' => 'nullable|in:Ongoing,Done'
        ]);

        // Set default values
        $validated['price'] = $validated['price'] ?? 0;
        $validated['status'] = $validated['status'] ?? 'Ongoing';

        $report = MaintenanceReport::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Maintenance report added successfully',
            'data' => $report
        ], 201);
    }

    /**
     * Display the specified maintenance report.
     */
    public function show(string $id)
    {
        $report = MaintenanceReport::find($id);
        
        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance report not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $report
        ]);
    }

    /**
     * Update the specified maintenance report.
     */
    public function update(Request $request, string $id)
    {
        $report = MaintenanceReport::find($id);
        
        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance report not found'
            ], 404);
        }

        $validated = $request->validate([
            'tenant_id' => 'nullable|exists:tenants,id',
            'tenant_name' => 'sometimes|string|max:255|regex:/^[a-zA-Z\s\.\-\']+$/',
            'room_number' => 'sometimes|string|max:50|regex:/^[A-Z0-9]+$/i',
            'maintenance_type' => 'sometimes|string|max:255',
            'note' => 'nullable|string',
            'start_date' => 'sometimes|date',
            'price' => 'nullable|numeric|min:0',
            'status' => 'sometimes|in:Ongoing,Done'
        ]);

        $report->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Maintenance report updated successfully',
            'data' => $report
        ]);
    }

    /**
     * Remove the specified maintenance report.
     */
    public function destroy(string $id)
    {
        $report = MaintenanceReport::find($id);
        
        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance report not found'
            ], 404);
        }

        $report->delete();

        return response()->json([
            'success' => true,
            'message' => 'Maintenance report deleted successfully'
        ]);
    }
}
