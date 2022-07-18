<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
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
        'password',
        'ceo',
        'adm',
        'atualizar',
        'afiliado'
    ];

    public function rules() {
        return [
            'nome' => 'required|min:5',
            'foto_do_perfil' => 'file|mimes:png,jpeg,jpg',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'telefone' => 'required|size:14|unique:users,telefone,'.$this->id,
            'password' => 'required|min:4',
        ];
    }

    public function feedback() {
        return [
            'required' => 'O campo :attribute é obrigatório',
            'password.required' => 'A senha é obrigatória',
            'nome.min' => 'O nome deve ter no mínimo 5 caractere',
            'telefone.size' => 'Digite um número válido',
            'email' => 'Email incorreto',
            'password.min' => 'A senha deve ter no mínimo 4 caracteres',
            'mimes' => 'O campo :attribute deve ser do tipo png, jpeg ou jpg',
            'email.unique' => 'O email digitado já existe',
            'telefone.unique' => 'O telefone digitado já existe',
        ];
    }

    public function negocios() {
        return $this->hasMany('App\Models\Negocio');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
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

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
