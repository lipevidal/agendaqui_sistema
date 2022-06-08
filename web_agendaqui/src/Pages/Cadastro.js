import React, { useState } from 'react';
import styled from 'styled-components';

const ContainerCadastro = styled.div`
    background-color: #141f36;
    height: 100vh;
    color: #ececf6;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box-inputs {
        display: flex;
        flex-direction: column;
        padding-bottom: 25px;
        input {
            margin: 10px;
            font-size: 1.1em;
            width: 250px;
            padding: 10px 15px;
            letter-spacing: 2px;
            background-color: #2d3d547e;
            border-radius: 10px;
            outline: none;
            color: #ececf6;
            border: none;
        }
    }
    button {
        background-color: #369a5d;
        padding: 10px 20px;
        border-radius: 10px;
        border: none; 
        color: #ececf6;
        cursor: pointer;
        &:hover {
            background-color: #4eca7a;
        }
    }
`

export default function Cadastro() {
    const [nome, setNome] = useState(''.trim())
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [repitaSenha, setRepitaSenha] = useState('')
    const [codigo, setCodigo] = useState(0)

    const pegarNome = (event) => {
        setNome(event.target.value)
    }

    const pegarTelefone = (event) => {
        setTelefone(event.target.value)
    }

    const pegarEmail = (event) => {
        setEmail(event.target.value)
    }

    const pegarSenha = (event) => {
        setSenha(event.target.value)
    }

    const pegarRepitaSenha = (event) => {
        setRepitaSenha(event.target.value)
    }

  return (
    <ContainerCadastro>
      <h1>CADASTRE-SE</h1>
      <div className='box-inputs'>
        <input value={nome} onChange={pegarNome} placeholder='Nome'/>
        <input value={telefone} onChange={pegarTelefone} placeholder='Telefone'/>
        <input value={email.trim()} onChange={pegarEmail} placeholder='Email'/>
        <input value={senha} onChange={pegarSenha} placeholder='Senha'/>
        <input value={repitaSenha} onChange={pegarRepitaSenha} placeholder='Repita sua senha'/>
      </div>
      <button>Enviar</button>
    </ContainerCadastro>
  );
}
