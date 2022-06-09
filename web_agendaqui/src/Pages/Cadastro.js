import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InputMask from "react-input-mask";

const ContainerCadastro = styled.div`
    background-color: #141f36;
    height: 100vh;
    color: #ececf6;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .boxCodigo {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            text-align: center;
        }
        input {
            margin: 10px 10px 20px 10px;
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
    }
    .containerCadastro {
        text-align: center;
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
    const [mensagemErro, setMensagemErro] = useState('')
    const [paginaCodigo, setPaginaCodigo] = useState(false)
    const [verificaCodigo, setVerificaCodigo] = useState('')

    const EnviarCodigo = () => {
        setMensagemErro('')
      if(senha !== repitaSenha) {
        setMensagemErro('As senhas não correspondem')
      } else {
        const body = {
          nome: nome,
          email: email,
          telefone: telefone,
          senha: senha,
          codigo: codigo
        }
        axios.post('http://localhost:8000/api/user', body, {
          headers: {
            Accept : 'application/json'
          }
        }).then((response) => {
          setCodigo(response.data)
          //let tel = telefone.replace(/[^0-9]/g,'')
          setPaginaCodigo(true)
          
        }).catch((err) => {
          console.log(err)
        })
      }
    }

    const cadastrarUsuario = () => {
        setMensagemErro('')
        if(verificaCodigo != codigo) {
            setMensagemErro('Código incorreto')
        } else {
            const body = {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
                codigo: codigo
            }
    
            axios.post('http://localhost:8000/api/user', body, {
              headers: {
                Accept: 'application/json'
              }
            }).then((response) => {
              console.log(response.data)
            }).catch((err) => {
              console.log(err.response.data)
            })
        }
    }

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

    const pegarVerificacaoCodigo = (event) => {
        setVerificaCodigo(event.target.value)
    }

  return (
    <ContainerCadastro>
        {paginaCodigo ? 
            <div className="boxCodigo">
                <p>Digite o código enviado para o número: <br />{telefone}</p>
                <InputMask mask="999999" value={verificaCodigo} onChange={pegarVerificacaoCodigo} autoComplete="none"/>
                <button onClick={cadastrarUsuario}>Enviar</button>
                <p className="codigo-incorreto">{mensagemErro}</p>
            </div> 
            : 
            <div className='containerCadastro'>
                <h1>CADASTRE-SE</h1>
                <div className='box-inputs'>
                    <input value={nome} onChange={pegarNome} placeholder='Nome' autoComplete='none'/>
                    <InputMask mask="(99)99999-9999" value={telefone} onChange={pegarTelefone} placeholder='Telefone' autoComplete='none'/>
                    <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete='none'/>
                    <input type="password" value={senha} onChange={pegarSenha} placeholder='Senha' autoComplete='none'/>
                    <input type="password" value={repitaSenha} onChange={pegarRepitaSenha} placeholder='Repita sua senha' autoComplete='none'/>
                </div>
                <button onClick={EnviarCodigo}>Enviar</button>
                <p>{mensagemErro}</p>
            </div>
        }
    </ContainerCadastro>
  );
}
