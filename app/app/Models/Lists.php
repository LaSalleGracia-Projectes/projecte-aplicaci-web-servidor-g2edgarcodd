<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lists extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'list_type'
    ];

    public function users()
    {
        return $this->belongsToOne(User::class);
    }
}
