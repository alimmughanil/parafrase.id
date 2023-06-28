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
        Schema::create('prompts', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('instruction');
            $table->string('model')->default('text-davinci-003');
            $table->string('max_tokens')->default('2048');
            $table->string('temperature')->default('0');
            $table->string('top_p')->default('1.0');
            $table->string('frequency_penalty')->default('0.0');
            $table->string('presence_penalty')->default('0.0');
            $table->string('lang')->default('id');
            $table->enum('level', ['low', 'medium', 'high'])->default('low');
            $table->json('additional')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paraphrases');
    }
};
