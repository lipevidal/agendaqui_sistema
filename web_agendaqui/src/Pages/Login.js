import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo_agendaqui_laranja from '../imagens/logo_agendaqui/logo-agendaqui-laranja.png'
import { Link } from 'react-router-dom';

const ContainerLogin = styled.div`
    background-color: #141f36;
    height: 100vh;
    color: #ececf6;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imagem-logo {
        width:280px;
        img {
            width: 100%;
        }
    }
    .box-inputs {
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;
        input {
            margin: 10px 0;
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
        p {
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
    .link-cadastro {
        color: #ececf6;
        margin: 30px;
        text-decoration: none;
        border: 1px solid #ececf6;
        border-radius: 10px;
        padding: 10px;
        &:hover {
            color: #FF5D00;
            border: 1px solid #FF5D00;
        }
    }
    .link-recuperer-senha {
        color: #ececf6;
        &:hover {
            color: white;
            text-decoration: none;
        }
    }
`

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('')
    //const [token, setToken] = useState('')

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
          console.log(response.data.token)
          //setToken(response.data.token)
          const dados = response.data.token
          localStorage.setItem('token-agendaqui', dados)
          window.location.href = `http://localhost:3000`
        }).catch((err) => {
          console.log(err.response.data.erro)
          setErro(err.response.data.erro)
        })
      
    }

    const pegarEmail = (event) => {
        setEmail(event.target.value)
        setErro('')
    }

    const pegarSenha = (event) => {
        setSenha(event.target.value)
        setErro('')
    }

  return (
    <ContainerLogin>
        <div className='box-inputs'>
            <div className='imagem-logo'>
                <img src={Logo_agendaqui_laranja} />
            </div>
            <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete='none'/>
            <input type="password" value={senha} onChange={pegarSenha} placeholder='Senha' autoComplete='none'/>
            <p>{erro}</p>
        </div>
        <button onClick={Entrar}>Entrar</button>
        <Link to="/cadastro" className='link-cadastro'>Cadastrar</Link>
        <Link to="/recuperar-senha" className='link-recuperer-senha'>Recuperar senha</Link>
    </ContainerLogin>
  );
}
