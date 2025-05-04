<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Movie extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'content';

    protected $fillable = [
        "#TITLE",
        "#YEAR",
        "#IMDB_ID",
        "#ACTORS",
        "#IMDB_URL",
        "#IMDB_POSTER",
        "photo_widht",
        "photo_height"
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class, 'movie_id', '#IMDB_ID');
    }
}
