<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Negocio extends Model
{
    use HasFactory;

    /**
     * Undocumented variable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'nome',
        'logo',
        'categoria',
        'nome_da_pagina',
        'codigo_afiliado',
        'dias_inativos',
    ];

    public function rules() {
        return [
            'user_id' => 'exists:users,id',
            'nome' => 'required|min:2',
            'logo' => 'required|file|mimes:png,jpeg,jpg',
            'categoria' => 'required|min:2',
            'nome_da_pagina' => 'required|min:2|unique:negocios,nome_da_pagina,'.$this->id,
        ];
    }

    public function feedback() {
        return [
            'required' => 'O :attribute é obrigatório',
            'nome.min' => 'O nome deve ter no mínimo 2 caractere',
            'categoria.min' => 'A categoria deve ter no mínimo 2 caracteres',
            'nome_da_pagina.min' => 'O nome da página deve ter no mínimo 2 caracteres',
            'mimes' => 'O campo :attribute deve ser do tipo png, jpeg ou jpg',
            'nome_da_pagina.unique' => 'Este nome da página já existe',
        ];
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function unidades() {
        return $this->hasMany('App\Models\Unidade');
    }
}
