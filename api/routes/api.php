<?php

use App\Http\Controllers\TenantController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tenants', TenantController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('payments', PaymentController::class);
Route::apiResource('messages', MessageController::class);
