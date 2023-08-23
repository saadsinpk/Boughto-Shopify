<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ShopifyController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Razak Code here Start
Route::get('custom_css', [ShopifyController::class, 'custom_css']);
Route::get('vehicles/manufacturers', [ShopifyController::class, 'index']);
Route::get('vehicles/manufacturers/{id}', [ShopifyController::class,'search']);
Route::get('vehicles/manufacturers/{id}/models', [ShopifyController::class,'models']);
Route::get('vehicles/models/{id}', [ShopifyController::class,'models_search']);
Route::get('vehicles/models/{id}/generations', [ShopifyController::class,'generations']);
Route::get('vehicles/generations/{id}', [ShopifyController::class,'generation_search']);
Route::get('vehicles/manufacturers/{id}/chassis', [ShopifyController::class,'chassis']);
Route::get('vehicles/generations/{id}/chassis', [ShopifyController::class,'generations_serach']);
Route::get('vehicles/chassis/{id}', [ShopifyController::class,'vehicles']);
Route::get('brands/enabled', [ShopifyController::class,'enabled']);
Route::get('wheels/brand/{name}', [ShopifyController::class,'brand_name']);
Route::get('wheels/range/{id}', [ShopifyController::class,'range']);
Route::get('search/wheels', [ShopifyController::class,'search_wheels']);
Route::get('search/wheels/{id}', [ShopifyController::class,'search_wheelsid']);
Route::get('wheels/id/{id}', [ShopifyController::class,'wheels_wheels']);
Route::get('wheels/product_code/{code}', [ShopifyController::class,'product_code']);
Route::get('search/tyres', [ShopifyController::class,'search_tyres']);
Route::get('tyres/id/{tyre_id}', [ShopifyController::class,'search_id']);
Route::get('tyres/product_code/{product_code}', [ShopifyController::class,'product_id']);
Route::get('vehicles/chassis/{chass_id}/tyre-sizes', [ShopifyController::class,'chassis_id']);
Route::get('search/wheels/{chassis_id}/tyres', [ShopifyController::class,'chassis_search']);
Route::post('chech_out',[ShopifyController::class,'check_out']);
Route::get('/api/search/wheels/{chassis_id}/tyres', 'Api\TyreController@search');
Route::get('input-file',[ShopifyController::class,'input']);
Route::post('createDraftOrder',[ShopifyController::class,'createDraftOrder']);
Route::post('cartitems',[ShopifyController::class,'add_to_cart']);
Route::post('product_filter',[ShopifyController::class,'fillter']);