<?php

namespace App\Models;

use App\Models\DigitalTicket;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PhysicalTicket extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function Event()
    {
        return $this->hasOne(Event::class, 'event_id', 'id');
    }
    public function DigitalTicket()
    {
        return $this->hasOne(DigitalTicket::class, 'id', 'digital_ticket_id');
    }
}