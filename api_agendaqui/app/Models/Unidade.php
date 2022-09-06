<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    use HasFactory;

    /**
     * Undocumented variable
     *
     * @var array
     */
    protected $fillable = [
        'negocio_id',
        'nome',
        'link_whatsapp',
        'contato',
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'status',
        'atualizar',
        'vencimento',
    ];

    public function rules() {
        return [
            'negocio_id' => 'exists:negocios,id',
            'nome' => 'required|min:2',
            'contato' => 'required|min:10',
            'cep' => 'required|min:8',
            'numero' => 'required'
        ];
    }

    public function feedback() {
        return [
            'required' => 'O :attribute é obrigatório',
            'nome.min' => 'O nome deve ter no mínimo 2 caractere',
            'contato.min' => 'Digite um contato válido',
            'cep.min' => 'Digite um cep válido',
        ];
    }

    public function negocio() {
        return $this->belongsTo('App\Models\Negocio');
    }
}
