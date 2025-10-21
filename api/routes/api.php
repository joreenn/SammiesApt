<?php

use App\Http\Controllers\TenantController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tenants', TenantController::class);
Route::apiResource('reservations', ReservationController::class);
