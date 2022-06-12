import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InputMask from "react-input-mask";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faArrowLeftLong} className='i-seta'/>


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
    }
    .form {
        text-align: center;
        .icone {
          position: absolute;
          top: 10px;
          left: 10px;
          text-align: left;
          .i-seta {
            color: #ececf6;
            font-size: 2em;
          }
        }
        .box-inputs {
        display: flex;
        flex-direction: column;
        padding-bottom: 25px;
        position: relative;
        input {
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
        p{
          margin-top: 1px;
          margin-left: 5px;
          font-size: 0.8em;
          text-align: left;
          color: red;
          height: 15px;
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
    const [erroEmail, setErroEmail] = useState('')
    const [erroNome, setErroNome] = useState('')
    const [erroTelefone, setErroTelefone] = useState('')
    const [erroSenha, setErroSenha] = useState('')

    const EnviarCodigo = () => {
      setMensagemErro('')
      if(senha !== repitaSenha) {
        setMensagemErro('As senhas não correspondem')
      } else {
        const body = {
          nome: nome,
          email: email,
          telefone: telefone,
          password: senha,
          codigo: codigo
        }
        axios.post('http://localhost:8000/api/user', body, {
          headers: {
            Accept : 'application/json'
          }
        }).then((response) => {
          console.log(response.data)
          setCodigo(response.data)
          //let tel = telefone.replace(/[^0-9]/g,'')
          setPaginaCodigo(true)
          
        }).catch((err) => {
          console.log(err.response.data.errors)
          setErroEmail(err.response.data.errors.email)
          setErroNome(err.response.data.errors.nome)
          setErroTelefone(err.response.data.errors.telefone)
          setErroSenha(err.response.data.errors.password)
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
        setErroNome('')
    }

    const pegarTelefone = (event) => {
        setTelefone(event.target.value)
        setErroTelefone('')
    }

    const pegarEmail = (event) => {
        setEmail(event.target.value)
        setErroEmail('')
    }

    const pegarSenha = (event) => {
        setSenha(event.target.value)
        setErroSenha('')
    }

    const pegarRepitaSenha = (event) => {
        setRepitaSenha(event.target.value)
        setMensagemErro('')
    }

    const pegarVerificacaoCodigo = (event) => {
        setVerificaCodigo(event.target.value)
        setMensagemErro('')
    }

  return (
    <ContainerCadastro>
        {paginaCodigo ? 
            <div className="boxCodigo">
                <p>Digite o código enviado para o número: <br />{telefone}</p>
                <InputMask mask="999999" value={verificaCodigo} onChange={pegarVerificacaoCodigo} autoComplete="none"/>
                <p className="codigo-incorreto">{mensagemErro}</p>
                <button onClick={cadastrarUsuario}>Enviar</button>
            </div> 
            : 
            <div className='form'>
                <Link to='/login' className='icone'>
                  {element}
                </Link>
                <h1>CADASTRE-SE</h1>
                <div className='box-inputs'>
                    <input value={nome} onChange={pegarNome} placeholder='Nome' autoComplete='none'/>
                    <p>{erroNome}</p>
                    <InputMask mask="(99)99999-9999" value={telefone} onChange={pegarTelefone} placeholder='Telefone' autoComplete='none'/>
                    <p>{erroTelefone}</p>
                    <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete='none'/>
                    <p>{erroEmail}</p>
                    <input type="password" value={senha} onChange={pegarSenha} placeholder='Senha' autoComplete='none'/>
                    <p>{erroSenha}</p>
                    <input type="password" value={repitaSenha} onChange={pegarRepitaSenha} placeholder='Repita sua senha' autoComplete='none'/>
                    <p>{mensagemErro}</p>
                </div>
                <button onClick={EnviarCodigo}>Enviar</button>
            </div>
        }
    </ContainerCadastro>
  );
}
