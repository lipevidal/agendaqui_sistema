<?php

namespace App\Http\Controllers;

use App\Models\Negocio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $data = date('Y/m/d');
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
            'entrou' => $data,
            'excluir'=> date('Y/m/d', strtotime("+30 days",strtotime($data))),
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
        $negocio = $this->negocio->find($id);

        if($negocio === null) {
            return response()->json(['erro' => 'O usuário não existe'], 400);
        }

        if($request->method() === 'PATCH') {
            
            $regrasDinamicas = array();

            foreach($negocio->rules() as $input => $regra) {
                if(array_key_exists($input, $request->all())) {
                    $regrasDinamicas[$input] = $regra;
                }
            } 

            $request->validate($regrasDinamicas, $negocio->feedback());

            if($request->file('logo')) {

                Storage::disk('public')->delete($negocio->logo);

                $imagem = $request->file('logo');
                $imagem_urn = $imagem->store('imagens/logo', 'public');
                $negocio->update([
                    'logo' => $imagem_urn
                ]);

                if($request->nome) {
                    $negocio->update([
                        'nome' => $request->nome
                    ]);
                }

                if($request->categoria) {
                    $negocio->update([
                        'categoria' => $request->categoria
                    ]);
                }

                if($request->nome_da_pagina) {
                    $negocio->update([
                        'nome_da_pagina' => $request->nome_da_pagina
                    ]);
                }


                return $negocio;

            } else {
                $negocio->update($request->all());
                return $negocio;
            }
            

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $negocio = $this->negocio->find($id);
        $negocio->delete();
        return response()->json(['sucesso' => 'O negócio foi removido com sucesso']);
    }
}
