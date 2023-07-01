<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ConfigurationController extends Controller
{
    public function index(Request $request)
    {
        if ($request->show) {
            $data = collect(Configuration::all());
            $configuration = ['data' => $data];
        } else {
            $configuration = collect(Configuration::paginate(10));
        }

        $data = [
            'title' => 'Configuration',
            'configuration' => $configuration
        ];
        return Inertia::render('Admin/Configuration/Index', $data);
    }

    public function create()
    {
        $data = ['title' => 'Tambah Konfigurasi'];
        return Inertia::render('Admin/Configuration/Create', $data);
    }
    public function edit(Configuration $configuration)
    {
        $data = [
            'title' => 'Edit Konfigurasi',
            'configuration' => $configuration
        ];
        return Inertia::render('Admin/Configuration/Edit', $data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required',
            'value' => 'required'
        ]);

        $store = Configuration::create($validatedData);
        if (!$store) return redirect()->back()->with('message', 'Kesalahan Server. Tambah configuration gagal');

        return redirect('/configuration')->with('message', 'Tambah configuration berhasil');
    }

    public function update($id, Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required',
            'value' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $configuration = Configuration::where('id', $id)->first();
            $configuration->update($validatedData);

            DB::commit();
            return redirect('/configuration')->with('message', 'Update configuration berhasil');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', 'Kesalahan Server. Update configuration gagal');
        }
    }

    public function destroy(Configuration $configuration)
    {
        $delete = $configuration->delete();
        if (!$delete) return redirect()->back()->with('message', 'Kesalahan Server. Hapus configuration gagal');

        return Inertia::location('/configuration');
    }
}