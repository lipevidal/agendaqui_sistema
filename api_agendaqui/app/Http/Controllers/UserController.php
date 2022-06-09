<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Comtele\Services\TextMessageService;

class UserController extends Controller
{
    /**
     * Undocumented function
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /** 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!$request->codigo) {
            $request->validate($this->user->rules(), $this->user->feedback());
            $numeroAleatorio = rand(111111, 999999);
            $numeroTelefone = preg_replace('/[^0-9]/', '', $request->telefone);

            $API_KEY = "bb816887-0e8e-4086-8e3f-f16cfac9e813";
            $textMessageService = new TextMessageService($API_KEY);
            $result = $textMessageService->send(
                "",          // Sender: Id de requisicao da sua aplicacao para ser retornado no relatorio, pode ser passado em branco.
                "Código de verificação AGENDAQUI: " .$numeroAleatorio,      // Content: Conteudo da mensagem a ser enviada.
                [$numeroTelefone],  // Receivers: Numero de telefone que vai ser enviado o SMS.
            );
            return $numeroAleatorio;
        }
        
        $this->user->create([
            'nome' => $request->nome,
            'email' => $request->email,
            'telefone' => $request->telefone,
            'password' => bcrypt($request->password)

        return response()->json(['sucesso' => 'Usuário criado com sucesso'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
