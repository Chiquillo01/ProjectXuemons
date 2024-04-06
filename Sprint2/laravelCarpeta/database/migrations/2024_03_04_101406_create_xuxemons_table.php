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
        Schema::create('xuxemons', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 20);
            $table->string('tipo', 50);
            $table->integer('tamano')->nullable()->default(1);
            $table->integer('evo1')->nullable()->default(3);
            $table->integer('evo2')->nullable()->default(5);
            $table->integer('vida')->default(100);
            $table->string('archivo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xuxemons');
    }
};
