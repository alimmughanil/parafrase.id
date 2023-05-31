<?php

namespace App\Models;

use App\Models\DigitalTicket;
use App\Models\PhysicalTicket;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function DigitalTicket()
    {
        return $this->hasMany(DigitalTicket::class, 'event_id', 'id');
    }
    public function PhysicalTicket()
    {
        return $this->hasMany(PhysicalTicket::class, 'event_id', 'id');
    }
}