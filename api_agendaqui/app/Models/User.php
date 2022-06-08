<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome',
        'foto_do_perfil',
        'email',
        'telefone',
        'senha',
    ];

    public function rules() {
        return [
            'nome' => 'required|min:2',
            'foto_do_perfil' => 'file|mimes:png,jpeg,jpg',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'telefone' => 'required|size:14|unique:users,telefone,'.$this->id,
            'senha' => 'required|min:4'
        ];
    }

    public function feedback() {
        return [
            'required' => 'O campo :attribute é obrigatório',
            'nome.min' => 'O campo nome deve ter no mínimo 2 caractere',
            'telefone.size' => 'Digite um número válido',
            'email' => 'Email incorreto',
            'senha.min' => 'A senha deve ter no mínimo 4 caracteres',
            'mimes' => 'O campo :attribute deve ser do tipo png, jpeg ou jpg',
            'email.unique' => 'O email digitado já existe',
            'telefone.unique' => 'O telefone digitado já existe'
        ];
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'senha',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
