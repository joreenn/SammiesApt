<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'tenant_id',
        'tenant_name',
        'message',
        'is_broadcast'
    ];

    protected $casts = [
        'is_broadcast' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relationship with tenant
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
