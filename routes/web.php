<?php
use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;

// Home page route
Route::get('/', function () {
    return view('tenants.dashboard');
});

//tenant dashboard view
Route::get('/tenants/dashboard', function () {
    return view('tenants.dashboard'); 
});
Route::get('/tenants', [TenantController::class, 'index']); // Add this to list tenants
Route::post('/tenants', [TenantController::class, 'store']);
Route::get('/tenants/{id}', [TenantController::class, 'show']);
Route::put('/tenants/{id}', [TenantController::class, 'update']);
Route::delete('/tenants/{id}', [TenantController::class, 'destroy']);

// Other web routes...

