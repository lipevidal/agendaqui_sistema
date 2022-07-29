<?php

namespace App\Http\Controllers;

use App\Models\Unidade;
use App\Http\Requests\StoreUnidadeRequest;
use App\Http\Requests\UpdateUnidadeRequest;
use Illuminate\Http\Request;

class UnidadeController extends Controller
{

    /**
     * Undocumented function
     *
     * @param Unidade $unidade
     */
    public function __construct(Unidade $unidade)
    {
        $this->unidade = $unidade;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $unidades = $this->unidade->with('negocio')->get();
        
        return $unidades;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUnidadeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = date('Y/m/d');
        $request->validate($this->unidade->rules(), $this->unidade->feedback());
        $unidade = $this->unidade->create([
            'negocio_id' => $request->negocio_id,
            'nome' => $request->nome,
            'link_whatsapp' => $request->link_whatsapp,
            'contato' => $request->contato,
            'cep' => $request->cep,
            'rua'=> $request->rua,
            'numero'=> $request->numero,
            'complemento'=> $request->complemento,
            'bairro'=> $request->bairro,
            'cidade'=> $request->cidade,
            'estado'=> $request->estado,
            'status'=> 'teste',
            'atualizar' => date('Y/m/d', strtotime("+7 days",strtotime($data))),
            'vencimento'=> date('Y/m/d', strtotime("+7 days",strtotime($data))),
        ]);

        return $unidade;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unidade  $unidade
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUnidadeRequest  $request
     * @param  \App\Models\Unidade  $unidade
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $unidade = $this->unidade->find($id);
        if($unidade === null) {
            return response()->json(['erro' => 'O usuário não existe'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unidade  $unidade
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
