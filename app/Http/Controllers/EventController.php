<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Date;

class EventController extends Controller
{
    public function index(Request $request)
    {
        if ($request->show) {
            $data = collect(Event::all());
            $event = ['data' => $data];
        } else {
            $event = collect(Event::paginate(10));
        }

        $data = [
            'title' => 'Event',
            'event' => $event
        ];
        return Inertia::render('Admin/Event/Index', $data);
    }

    public function create()
    {
        $data = ['title' => 'Tambah Event'];
        return Inertia::render('Admin/Event/Create', $data);
    }
    public function edit(Event $event)
    {
        $data = [
            'title' => 'Edit Event',
            'event' => $event
        ];
        return Inertia::render('Admin/Event/Edit', $data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'date_time' => 'required|date'
        ]);
        $eventTime = Carbon::create($request->date_time);
        $currentTime = Carbon::now();

        if ($eventTime->lt($currentTime)) return redirect()->back()->with('message', 'Tambah event gagal. Waktu yang dipilih sudah terlewati');

        $store = Event::create($validatedData);
        if (!$store) return redirect()->back()->with('message', 'Kesalahan Server. Tambah event gagal');

        return redirect('/event')->with('message', 'Tambah event berhasil');
    }

    public function update($id, Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'date_time' => 'required|date',
            'status' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $event = Event::where('id', $id)->first();
            $eventTime = Carbon::create($event->date_time);
            $newEventTime = Carbon::create($request->date_time);
            $currentTime = Carbon::now();
            if ($newEventTime->lt($currentTime) && $currentTime->lt($eventTime)) return redirect()->back()->with('message', 'Update event gagal. Waktu yang dipilih sudah terlewati');

            $event->update($validatedData);

            DB::commit();
            return redirect('/event')->with('message', 'Update event berhasil');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', 'Kesalahan Server. Update event gagal');
        }
    }

    public function destroy(Event $event)
    {
        $eventTime = Carbon::create($event->date_time);
        $currentTime = Carbon::now();
        if ($currentTime->lt($eventTime)) return redirect()->back()->with('message', 'Hapus event gagal. Waktu Event belum terlewati');

        $delete = $event->delete();
        if (!$delete) return redirect()->back()->with('message', 'Kesalahan Server. Hapus event gagal');

        return Inertia::location('/event');
    }
}