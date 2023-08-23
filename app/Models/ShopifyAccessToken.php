<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopifyAccessToken extends Model
{
    use HasFactory;

    protected $table = 'shopify_access_token';

    protected $fillable = ['url', 'access_token'];

    // Timestamps are managed automatically, so you don't need to specify them here.
}
