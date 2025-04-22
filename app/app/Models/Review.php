<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'is_positive',
        'user_id',
        'movie_id'
    ];

    public function users()
    {
        return $this->belongsToOne(User::class);
    }

    public function lists()
    {
        return $this->belongsToMany(MediaList::class);
    }
}
