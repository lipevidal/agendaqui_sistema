import React, { useState } from 'react';
import styled from 'styled-components';
import InputMask from "react-input-mask";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Codigos from '../Components/Codigos';
import NovaSenha from '../Components/NovaSenha';

const iconeSetaVoltar = <FontAwesomeIcon icon={faArrowLeftLong} className='i-seta'/>

const ContainerRecuperarSenha = styled.div`
    background-color: var(--cor-bg-escura);
    height: 100vh;
    color: var(--cor-texto-branca);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    .btns {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            color: #ececf6;
            margin:10px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
                color: white;
                text-decoration: none;
            }
        }
    }
    .box-telefone, .box-email {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .conteudo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            input {
                font-size: 1.1em;
                margin: 15px;
                text-align:center;
                width: 200px;
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
            margin-top: 15px;
            padding: 10px 20px;
            border-radius: 10px;
            border: none; 
            color: #ececf6;
            cursor: pointer;
            &:hover {
                background-color: #4eca7a;
            }
        }
    }
    .box-email {
        .conteudo {
            input {
                width: 250px;
            }
        }
    }
    .erro-texto{
        margin-top: -5px;
    }
`

export default function RecuperarSenha() {
    const [telaTelefone, setTelaTelefone] = useState(false)
    const [telaEmail, setTelaEmail] = useState(false)
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [erro, setErro] = useState('')
    const [usuario, setUsuario] = useState({})
    const [template, setTemplate] = useState(true)
    const [confirmacaoCodigo, setConfirmacaoCodigo] = useState('')
    const [codigo, setCodigo] = useState(0)
    const [paginaNovaSenha, setPaginaNovaSenha] = useState(false)
    const [senha, setSenha] = useState('')
    const [senhaRepetida, setSenhaRepetida] = useState('')
    const [numeroAleatorio, setNumeroAleatorio] = useState('')

    const buscarTelefone = () => {
        axios.get(`http://localhost:8000/api/user?filtroTelefone=telefone:=:${telefone}`, {
        }).then((response) => {
            if(response.data[0]) {
                console.log('Fiz uma requisição para buscar telefone na Api e deu certo')
                setUsuario(response.data[0])
                gerarCodigoTelefone()
            } else {
                setErro('Telefone não encontrado')
            }
        }).catch((err) => {
            console.log('Fiz uma requisição para buscar telefone na Api e deu errado')
        })
    }

    const buscarEmail = () => {
        axios.get(`http://localhost:8000/api/user?filtroEmail=email:=:${email}`, {
        }).then((response) => {
            if(response.data[0]) {
                console.log('Fiz uma requisição para buscar email na Api e deu certo')
                setUsuario(response.data[0])
                gerarCodigoEmail()
            } else {
                setErro('Email não encontrado')
            }
        }).catch((err) => {
            console.log('Fiz uma requisição para buscar telefone na Api e deu errado')
        })
    }

    const gerarCodigoTelefone = () => {
        const body = {
            template: true,
            telefone: telefone
        }

        axios.post('http://localhost:8000/api/user', body, {
          headers: {
            Accept: 'application/json'
          }
        }).then((response) => {
            console.log('Fiz uma requisição na API para enviar um codigo no telefone do usuario e deu certo')
            console.log(response.data)
            setCodigo(response.data)
            setTemplate(false)
        }).catch((err) => {
            console.log('Fiz uma requisição na API para enviar um codigo no telefone do usuario e deu errado')
        })
    }

    const gerarCodigoEmail = () => {
        let numeroAleatorio = Math.floor(Math.random() * (999999 - 111111)) + 111111
        console.log(numeroAleatorio)
        axios.get(`http://localhost:8000/api/envio-email?email=${email}&numeroAleatorio=${numeroAleatorio}`, {
          headers: {
            Accept: 'application/json'
          }
        }).then((response) => {
            console.log('Fiz uma requisição na API para enviar um codigo no email do usuario e deu certo')
            setCodigo(numeroAleatorio)
            setTemplate(false)
        }).catch((err) => {
            console.log('Fiz uma requisição na API para enviar um codigo no email do usuario e deu errado')
        })
    }

    const confirmarCodigo = () => {
        setErro('')
        if(confirmacaoCodigo != codigo) {
            setErro('Código incorreto')
        } else {
            setPaginaNovaSenha(true)
        }
    }

    const novaSenha = (usuario) => {
        setErro('')
        if(senha !== senhaRepetida) {
          setErro('As senhas não correspondem')
        } else {
          const body = {
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            password: senha,
          }
          axios.put(`http://localhost:8000/api/user/${usuario.id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((response) => {
            console.log('Fiz uma requisição na API para alterar a senha do usuario e deu certo')
            window.location.href = 'http://localhost:3000/login'
          }).catch((err) => {
            console.log('Fiz uma requisição na API para alterar a senha do usuario e deu errado')
            setErro(err.response.data.errors.password)
          })
        }
      
    }

    const mudarTelefone = ()=> {
        setTelaTelefone(true)
    }

    const mudarEmail = ()=> {
        setTelaEmail(true)
    }
    
    const pegarTelefone = (event) => {
        setErro('')
        setTelefone(event.target.value)
    }

    const pegarEmail = (event) => {
        setErro('')
        setEmail(event.target.value)
    }

    const pegarVerificacaoCodigo = (event) => {
        setErro('')
        setConfirmacaoCodigo(event.target.value)
    }

    const pegarSenha = (event) => {
        setErro('')
        setSenha(event.target.value)
    }

    const pegarSenhaRepetida = (event) => {
        setErro('')
        setSenhaRepetida(event.target.value)
    }

  return (
    <ContainerRecuperarSenha>
        <Link to='/login' className='icone'>
            {iconeSetaVoltar}
        </Link>
        {telaTelefone || telaEmail ? (telaTelefone ? (telaEmail ? 
        '' 
        : 
        <div className='box-telefone'>
            {!template || paginaNovaSenha ? (!template ? (paginaNovaSenha ?
            <div>
                <NovaSenha 
                    nomeUsuario={usuario.nome}
                    valorSenha={senha}
                    mensagemErro={erro}
                    valorRepitaSenha={senhaRepetida}
                    onchangePegarSenha={pegarSenha}
                    onchangePegarSenhaRepetida={pegarSenhaRepetida}
                    atualizarSenha={() => novaSenha(usuario)}
                />
            </div>
            :
            <Codigos 
                numeroTelefoneEmail={usuario.telefone}
                mensagemErro={erro}
                atualizarSenha={() => confirmarCodigo()}
                verificacaoCodigo={pegarVerificacaoCodigo}
                valorCodigo={confirmacaoCodigo}
                nomeUsuario={usuario.nome}
                onchangePegarSenha={pegarSenha}
            />
            ):''):
            <div class="conteudo">
                <p>Olá Digite o telefone cadastrado</p>
                <InputMask mask="(99)99999-9999" value={telefone} onChange={pegarTelefone} placeholder='Telefone' autoComplete='none'/>
                <p className='erro-texto'>{erro}</p>
                <button onClick={buscarTelefone}>Enviar</button>
            </div>
            }
        </div>
        ):
        <div className='box-email'>
            {!template || paginaNovaSenha ? (!template ? (paginaNovaSenha ?
            <div>
                <NovaSenha 
                    nomeUsuario={usuario.nome}
                    valorSenha={senha}
                    mensagemErro={erro}
                    valorRepitaSenha={senhaRepetida}
                    onchangePegarSenha={pegarSenha}
                    onchangePegarSenhaRepetida={pegarSenhaRepetida}
                    atualizarSenha={() => novaSenha(usuario)}
                />
            </div>
            :
            <Codigos 
                numeroTelefoneEmail={usuario.email}
                mensagemErro={erro}
                atualizarSenha={() => confirmarCodigo()}
                verificacaoCodigo={pegarVerificacaoCodigo}
                valorCodigo={confirmacaoCodigo}
                nomeUsuario={usuario.nome}
                onchangePegarSenha={pegarSenha}
            />
            ):''):
            <div className='conteudo'>
                <p>Digite o email cadastrado</p>
                <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete='none'/>
                <p className='erro-texto'>{erro}</p>
                <button onClick={buscarEmail}>Enviar</button>
            </div>
            }
        </div>
        ) 
        : 
        <div className='btns'>
            <button onClick={mudarEmail}>Enviar código para o email</button>
            <button onClick={mudarTelefone}>Enviar código para o telefone</button>
        </div> 
        }
    </ContainerRecuperarSenha>
  );
}
