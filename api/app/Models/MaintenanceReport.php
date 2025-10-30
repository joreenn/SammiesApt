<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceReport extends Model
{
    protected $fillable = [
        'tenant_id',
        'tenant_name',
        'room_number',
        'maintenance_type',
        'note',
        'start_date',
        'price',
        'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relationship with tenant
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
