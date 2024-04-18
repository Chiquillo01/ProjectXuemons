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
        Schema::create('horario', function (Blueprint $table) {
            $table->id();
            $table->string('chuche_maximas', 3)->default(10);
            $table->boolean('debug')->default(true);
            $table->unsignedBigInteger('id_users');
            $table->dateTime('date_debug');
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('id_users')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horario');
    }
};
