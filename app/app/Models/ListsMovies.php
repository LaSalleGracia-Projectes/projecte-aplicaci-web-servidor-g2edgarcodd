<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ListsMovies extends Model
{
    use HasFactory;

    protected $fillable = [
        'list_id',
        'movie_id'
    ];

    public function lists()
    {
        return $this->belongsToOne(Lists::class);
    }
}
