<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopifyAccessTokenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopify_access_token', function (Blueprint $table) {
            $table->id();
            $table->string('url', 256)->index();
            $table->text('access_token');
            $table->text('boughto_wheel_page');
            $table->string('boughto_wheel_search', 256);
            $table->string('api_url', 255);
            $table->string('shopify_access_token', 255);
            $table->timestamps(); // Adds created_at and updated_at columns.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopify_access_token');
    }
}
