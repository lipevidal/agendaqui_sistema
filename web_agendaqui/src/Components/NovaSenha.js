import React from 'react';
import styled from 'styled-components';

const BoxNovaSenha = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
    }
    p.codigo-incorreto {
      margin-top: 2px;
      margin-left: 5px;
      margin-bottom: 18px;
      font-size: 0.8em;
      text-align: left;
      color: red;
      height: 15px;
    }
    input {
        width: 250px;
        margin: 10px;
        font-size: 1.1em;
        text-align: center;
        padding: 10px 15px;
        letter-spacing: 2px;
        background-color: #2d3d547e;
        border-radius: 10px;
        outline: none;
        color: #ececf6;
        border: none;
    }
`

export default function NovaSenha(props) {
  return (
    <BoxNovaSenha>
        <p>{props.nomeUsuario}, <br /><br /> Crie uma nova senha</p><br />
        <input type="password" value={props.valorSenha} onChange={props.onchangePegarSenha} placeholder='Senha' autoComplete='none'/>
        <input type="password" value={props.valorRepitaSenha} onChange={props.onchangePegarSenhaRepetida} placeholder='Repita sua senha' autoComplete='none'/>
        <p className="codigo-incorreto">{props.mensagemErro}</p>
        <button onClick={props.atualizarSenha}>Enviar</button>
    </BoxNovaSenha> 
  );
}
