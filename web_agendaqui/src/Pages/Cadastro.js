import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InputMask from "react-input-mask";
import { useDispatch } from 'react-redux'
import { getUser } from '../store/Users/Users.fetch.actions'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const iconeSetaVoltar = <FontAwesomeIcon icon={faArrowLeftLong} className='i-seta'/>


const ContainerCadastro = styled.div`
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
        color: var(--cor-texto-branca);
        font-size: 2em;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .boxCodigo {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            text-align: center;
        }
        input {
            width: 100px;
            margin-top: 20px;
            font-size: 1.1em;
            text-align: center;
            padding: 10px 15px;
            letter-spacing: 2px;
            background-color: var(--cor-bg-clara);
            border-radius: 10px;
            outline: none;
            color: var(--cor-texto-branca);
            border: none;
        }
    }
    .form {
        text-align: center;
    }
    .erro-texto {
      margin-bottom: 15px;
      margin-left: 8px;
    }
    .label-float {
      input {
        width: 280px;
      }
    }
`

export default function Cadastro(props) {
    const dispatch = useDispatch()
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
          console.log('Fiz uma requisição de envio de código e deu certo')
          console.log(response.data)
          setCodigo(response.data)
          setPaginaCodigo(true)
          
        }).catch((err) => {
          console.log('Fiz uma requisição de envio de código e deu errado')
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
                password: senha,
                codigo: codigo
            }
    
            axios.post('http://localhost:8000/api/user', body, {
              headers: {
                Accept: 'application/json'
              }
            }).then(() => {
              console.log('Fiz uma requisição de cadastro e deu certo')
              Entrar()
              props.history.push('/')
            }).catch((err) => {
              console.log('Fiz uma requisição de cadastro e deu errado')
            })
        }
    }

    const Entrar = () => {
      const body = {
        email: email,
        password: senha
      }
      axios.post('http://localhost:8000/api/login', body, {
        headers: {
          Accept : 'application/json'
        }
      }).then((response) => {
        localStorage.removeItem('token-agendaqui')
        console.log('Fiz uma requisição de login na Api e deu certo')
        const dados = response.data.token
        localStorage.setItem('token-agendaqui', dados)
        dispatch(getUser(dados))
        props.history.push('/')
      }).catch((err) => {
        console.log('Fiz uma requisição de login e deu errado')
      })
    
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
      <div className='center'>
        <Link to='/login' className='icone'>
          {iconeSetaVoltar}
        </Link>
        {paginaCodigo ? 
          <div className="boxCodigo slide-in-fwd-center">
            <p>Digite o código enviado para o número: <br />{telefone}</p>
            <InputMask mask="999999" value={verificaCodigo} onChange={pegarVerificacaoCodigo} autoComplete="none"/>
            <p className='erro-texto'>{mensagemErro}</p>
            <button className='botao-sucesso' onClick={cadastrarUsuario}>Enviar</button>
          </div> 
          : 
          <div className='form slide-in-fwd-center'>
            <h1>CADASTRE-SE</h1>
            <div className='box-inputs'>
              <div className="label-float">
                <input className='primeira-maiuscula' value={nome} onChange={pegarNome} placeholder=" " autoComplete='none' required/>
                <label>Nome</label>
              </div>
              <p className='erro-texto'>{erroNome}</p>

              <div className="label-float">
                <InputMask mask="(99)99999-9999" value={telefone} onChange={pegarTelefone} placeholder=" " autoComplete='none' required/>
                <label>Telefone</label>
              </div>
              <p className='erro-texto'>{erroTelefone}</p>

              <div className="label-float">
                <input className='minusculo' value={email.trim()} onChange={pegarEmail} placeholder=" " autoComplete='none' required/>
                <label>Email</label>
              </div>
              <p className='erro-texto'>{erroEmail}</p>

              <div className="label-float">
                <input type="password" value={senha} onChange={pegarSenha} placeholder=" " autoComplete='none' required/>
                <label>Senha</label>
              </div>
              <p className='erro-texto'>{erroSenha}</p>

              <div className="label-float">
                <input type="password" value={repitaSenha} onChange={pegarRepitaSenha} placeholder=" " autoComplete='none' required/>
                <label>Repita a senha</label>
              </div>
              <p className='erro-texto'>{mensagemErro}</p>
              
            </div>
            <button className='botao-sucesso' onClick={EnviarCodigo}>Enviar</button>
          </div>
        }
      </div>
    </ContainerCadastro>
  );
}
