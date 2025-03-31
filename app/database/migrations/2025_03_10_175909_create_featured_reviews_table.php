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
        Schema::create('featured_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('review_id');
            $table->timestamps();

            $table->foreign('review_id')
            ->references('id')
            ->on('reviews')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('featured_reviews');
    }
};
