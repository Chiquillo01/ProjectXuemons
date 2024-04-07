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
        // Schema::create('chuches_users', function (Blueprint $table) {
        //     $table->bigIncrements('id');
        //     $table->string('nombre', 15);
        //     $table->integer('dinero');
        //     $table->integer('modificador');
        //     $table->string('archivo');
        //     $table->string('stack')->default(1);
        //     $table->unsignedBigInteger('idUser');
        //     $table->timestamps();

        //     $table->foreign('idUser')->references('id')->on('users');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chuches_users');
    }
};
