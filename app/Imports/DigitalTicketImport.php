<?php

namespace App\Imports;

use App\Models\DigitalTicket;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class DigitalTicketImport implements ToModel, WithStartRow, WithBatchInserts, WithChunkReading, ShouldQueue
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function __construct($eventId)
    {
        $this->eventId = $eventId;
    }

    public function model(array $row)
    {
        $existDigitalTicket = DigitalTicket::where('event_id', $this->eventId)->where('barcode', $row[2])->first();
        if (!$existDigitalTicket)
            return new DigitalTicket([
                'event_id' => $this->eventId,
                'name'     => $row[0],
                'email'    => $row[1],
                'barcode' => $row[2],
            ]);
    }

    public function startRow(): int
    {
        return 2;
    }
    public function chunkSize(): int
    {
        return 2000;
    }
    public function batchSize(): int
    {
        return 2000;
    }
}