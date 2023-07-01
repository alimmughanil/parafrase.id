<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Prompt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PromptsController extends Controller
{
    public function index(Request $request)
    {
        if ($request->show) {
            $data = collect(Prompt::all());
            $prompt = ['data' => $data];
        } else {
            $prompt = collect(Prompt::paginate(10));
        }

        $data = [
            'title' => 'Prompts',
            'prompt' => $prompt
        ];
        return Inertia::render('Admin/Prompts/Index', $data);
    }

    public function create()
    {
        $data = ['title' => 'Tambah Prompt'];
        return Inertia::render('Admin/Prompts/Create', $data);
    }
    public function edit(Prompt $prompt)
    {
        $data = [
            'title' => 'Edit Prompt',
            'prompt' => $prompt
        ];
        return Inertia::render('Admin/Prompts/Edit', $data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required',
            'instruction' => 'required',
            'lang' => 'required',
        ]);

        $store = Prompt::create($validatedData);
        if (!$store) return redirect()->back()->with('message', 'Kesalahan Server. Tambah prompt gagal');

        return redirect('/prompts')->with('message', 'Tambah prompt berhasil');
    }

    public function update($id, Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required',
            'instruction' => 'required',
            'lang' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $prompt = Prompt::where('id', $id)->first();
            $prompt->update($validatedData);

            DB::commit();
            return redirect('/prompts')->with('message', 'Update prompt berhasil');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', 'Kesalahan Server. Update prompt gagal');
        }
    }

    public function destroy(Prompt $prompt)
    {
        $delete = $prompt->delete();
        if (!$delete) return redirect()->back()->with('message', 'Kesalahan Server. Hapus prompt gagal');

        return Inertia::location('/prompts');
    }
}