<?php

namespace App\Http\Livewire;

use App\Helpers\BoughtoApi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class Register extends Component
{
    public $hasRegister = false;
    public $user;
    public $api_key = null;

    public function mount()
    {
        $this->user = Auth::id();
        $this->hasRegister = Auth::user()->api_key != null;
    }

    public function submit()
    {
        if ($this->hasRegister) {
            $this->api_key = null;
            User::find($this->user)->update(['api_key' => $this->api_key]);
            $this->hasRegister = false;
        }

        $this->validate([
            'api_key' => 'required',
        ]);

        $boughto = BoughtoApi::get($this->api_key)->getEnabledManufactures();
        if ($boughto['message'] ?? '' == 'Unauthenticated.') {
            $this->api_key = null;
        } else {
            User::find($this->user)->update(['api_key' => $this->api_key]);
            $this->api_key = null;
            $this->hasRegister = true;
        }
    }

    public function render()
    {
        return view('livewire.register');
    }
}
