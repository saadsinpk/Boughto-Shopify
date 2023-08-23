<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');


Route::get('/search-wheel-by-vehicle', function () {
    return view('search_wheel_by_vehicle');
})->middleware(['verify.shopify'])->name('home');

Route::get('/product', function () {
    return view('boughto.product'); // Replace 'your-view-file-name' with the actual name of your view file, without the ".blade.php" extension
});

Route::get('/link', function () {
    return view('boughto.newfile'); // Replace 'your-view-file-name' with the actual name of your view file, without the ".blade.php" extension
});


Route::get('/serachinput', function () {
    return view('boughto.serachinput'); // Replace 'your-view-file-name' with the actual name of your view file, without the ".blade.php" extension
});

