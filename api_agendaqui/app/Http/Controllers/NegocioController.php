<?php

namespace App\Http\Controllers;

use App\Models\Negocio;
use Illuminate\Http\Request;

class NegocioController extends Controller
{
    /**
     * Undocumented function
     *
     * @param Negocio $negocio
     */
    public function __construct(Negocio $negocio)
    {
        $this->negocio = $negocio;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $negocios = $this->negocio->with('user')->get();
        if($request->has('filtroUsuario')) {
            $condicao = explode(':', $request->filtroUsuario);
            $negocios = $negocios->where($condicao[0], $condicao[1], $condicao[2]);
            return $negocios;
        }
        return $negocios;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate($this->negocio->rules(), $this->negocio->feedback());
        $imagem = $request->file('logo');
        $imagem_urn = $imagem->store('imagens/logo', 'public');
        $negocio = $this->negocio->create([
            'user_id' => $request->user_id,
            'nome' => $request->nome,
            'logo' => $imagem_urn,
            'categoria' => $request->categoria,
            'nome_da_pagina' => $request->nome_da_pagina,
            'codigo_afiliado'=> rand(11111111, 99999999),
            'dias_inativos' => 0
        ]);

        return $negocio;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
