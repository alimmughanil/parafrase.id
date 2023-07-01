<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Services\User\UserService;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{

    public function __construct()
    {
        $this->userService = new UserService();
    }

    public function getAuthenticationPage()
    {
        return Socialite::driver('google')->redirect();
    }
    public function getCallback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
            $existUser = $this->userService->getFirst($user->email, 'email');
            if (!$existUser) {
                $existUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => now()
                ]);
            }

            auth()->login($existUser, true);
            return redirect('/');
        } catch (\Throwable $th) {
            return redirect()->route('login');
        }
    }
}