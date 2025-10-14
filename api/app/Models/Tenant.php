<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'name',
        'room',
        'contact',
        'email',
        'gender',
        'avatar'
    ];
}
