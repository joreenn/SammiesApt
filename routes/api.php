<?php
use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;

Route::get('/tenants', [TenantController::class, 'index']);
