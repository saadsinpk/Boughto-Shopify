<div>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="/img/logo.png" alt="Boughto">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $hasRegister ? 'Unlink' : 'Link' }} your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" wire:submit.prevent="submit()">
               @if(!$hasRegister)
                    <div>
                        <label for="api_key" class="block text-sm font-medium leading-6 text-gray-900">API Key</label>
                        <div class="mt-2">
                            <input id="api_key" name="api_key" type="text" wire:model="api_key" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
               @endif

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        {{$hasRegister ? 'Unlink' : 'Link'}}
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a user?
                <a target="_blank" href="https://boughto.net/contact/" class="font-semibold leading-6 text-red-600 hover:text-red-500">Request more information</a>
            </p>
        </div>
    </div>
</div>
