<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Movie extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'content';

    protected $fillable = [
        'adult',
        'backdrop_path',
        'genre_ids',
        'id',
        'original_language',
        'original_title',
        'overview',
        'popularity',
        'poster_path',
        'release_date',
        'title',
        'video',
        'vote_average',
        'vote_count',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class, 'movie_id', 'id');
    }
}
