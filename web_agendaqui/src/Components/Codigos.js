import React from 'react';
import InputMask from "react-input-mask";
import styled from 'styled-components';

const BoxCodigo = styled.div`
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
        width: 100px;
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

export default function Codigos(props) {
  return (
    <BoxCodigo>
        <p>Olá {props.nomeUsuario}, <br /><br /> Digite o código enviado para: <br />{props.numeroTelefone}</p>
        <InputMask mask="999999" value={props.valorCodigo} onChange={props.verificacaoCodigo} autoComplete="none"/>
        <p className="codigo-incorreto">{props.mensagemErro}</p>
        <button onClick={props.atualizarSenha}>Enviar</button>
    </BoxCodigo> 
  );
}
