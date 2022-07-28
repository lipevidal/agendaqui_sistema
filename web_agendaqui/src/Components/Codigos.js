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
    p.chamada {
      margin-bottom: 15px;
    }
    p::first-letter {
      text-transform: capitalize;
    }
    .erro-texto {
      margin-top: -10px;
      margin-left: 0;
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
        <p className='chamada'>Olá {props.nomeUsuario}, <br /><br /> Digite o código enviado para: <br />{props.numeroTelefoneEmail}</p>
        <InputMask mask="999999" value={props.valorCodigo} onChange={props.verificacaoCodigo} autoComplete="none"/>
        <p className="erro-texto">{props.mensagemErro}</p>
        <button onClick={props.atualizarSenha} className="sucesso">Enviar</button>
    </BoxCodigo> 
  );
}
