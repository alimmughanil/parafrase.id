<?php

namespace App\Http\Controllers\Admin;

use Rules\Password;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        if ($request->show) {
            $data = collect(User::all());
            $users = ['data' => $data];
        } else {
            $users = collect(User::paginate(10));
        }

        $data = [
            'title' => 'Users',
            'users' => $users
        ];
        return Inertia::render('Admin/Users/Index', $data);
    }

    public function create()
    {
        $data = ['title' => 'Tambah User'];
        return Inertia::render('Admin/Users/Create', $data);
    }
    public function edit(User $user)
    {
        $data = [
            'title' => 'Edit User',
            'user' => $user
        ];
        return Inertia::render('Admin/Users/Edit', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $store = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);
        if (!$store) return redirect()->back()->with('message', 'Kesalahan Server. Tambah user gagal');

        return redirect('/users')->with('message', 'Tambah user berhasil');
    }

    public function update($id, Request $request)
    {
        $validatedData = $request->validate([
            'status' => 'required',
            'type' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $user = User::where('id', $id)->first();
            $user->update($validatedData);

            DB::commit();
            return redirect('/users')->with('message', 'Update user berhasil');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', 'Kesalahan Server. Update user gagal');
        }
    }

    public function destroy(User $user)
    {
        $delete = $user->delete();
        if (!$delete) return redirect()->back()->with('message', 'Kesalahan Server. Hapus user gagal');

        return Inertia::location('/users');
    }
}