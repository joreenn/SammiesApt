<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('room_number');
            $table->string('full_name');
            $table->string('email');
            $table->string('contact_number');
            $table->decimal('down_payment', 10, 2);
            $table->enum('mode_of_payment', ['Cash', 'Gcash']);
            $table->enum('reservation_status', ['Available', 'Occupied'])->default('Available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
