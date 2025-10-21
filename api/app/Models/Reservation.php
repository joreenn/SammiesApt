<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'room_number',
        'full_name',
        'email',
        'contact_number',
        'down_payment',
        'mode_of_payment',
        'reservation_status'
    ];

    protected $casts = [
        'down_payment' => 'decimal:2'
    ];
}
