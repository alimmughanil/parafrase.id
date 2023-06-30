<?php

namespace App\Http\Services;

interface ServiceInterface
{
   public function getAll();
   public function getPaginate(int $number);
   public function getFirst($id);
   public function create(array $atributes);
   public function update($id, array $atributes);
   public function delete($id);
}
