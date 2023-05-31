<?php

namespace App\Models;

use App\Models\Event;
use App\Models\PhysicalTicket;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DigitalTicket extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function Event()
    {
        return $this->hasOne(Event::class, 'event_id', 'id');
    }
    public function PhysicalTicket()
    {
        return $this->hasOne(PhysicalTicket::class, 'physical_ticket_id', 'id');
    }
}