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
        Schema::create('maintenance_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tenant_id')->nullable();
            $table->string('tenant_name');
            $table->string('room_number');
            $table->string('maintenance_type'); // e.g., Light Bulb, Sink, Door, etc.
            $table->text('note')->nullable();
            $table->date('start_date');
            $table->decimal('price', 10, 2)->default(0);
            $table->enum('status', ['Ongoing', 'Done'])->default('Ongoing');
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('tenant_id')
                  ->references('id')
                  ->on('tenants')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_reports');
    }
};
