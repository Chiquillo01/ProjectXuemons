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
        Schema::create('chuches_users', function (Blueprint $table) {
            $table->unsignedBigInteger('chuche_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('chuche_id')->references('id')->on('chuches')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chuches_users');
    }
};
