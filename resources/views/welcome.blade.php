@extends('shopify-app::layouts.default')

@section('content')
    <!-- You are: (shop domain name) -->
    <livewire:register/>
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
