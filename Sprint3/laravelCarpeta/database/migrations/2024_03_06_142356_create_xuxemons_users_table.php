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
        Schema::create('xuxemons_users', function (Blueprint $table) {
            $table->unsignedBigInteger('xuxemon_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('comida')->nullable()->default(0);
            $table->integer('activo')->nullable()->default(false);
            $table->integer('favorito')->nullable()->default(false);
            $table->string('tamano')->default('pequeno');
            $table->integer('evo1')->nullable();
            $table->integer('evo2')->nullable();
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('xuxemon_id')->references('id')->on('xuxemons')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xuxemons_users');
    }
};
