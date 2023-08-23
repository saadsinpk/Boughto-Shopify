@extends('shopify-app::layouts.default')

@section('content')
    <!-- You are: (shop domain name) -->
   Search wheel by vehicle dropdowns
@endsection

@section('styles')
    @parent

    @vite('resources/css/app.css')
    @livewireStyles

@endsection
@section('scripts')
    @parent
    <livewire:scripts/>
@endsection
