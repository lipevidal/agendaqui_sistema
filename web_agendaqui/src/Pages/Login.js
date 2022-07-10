import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo_agendaqui_laranja from '../imagens/logo_agendaqui/logo-agendaqui-laranja.png'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import Loading from '../Components/Loading';

const ContainerLogin = styled.div`
    background-color: var(--cor-bg-escura);
    color: var(--cor-texto-branca);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Img = styled.div`
    margin-right: 50px;
    img {
      width: 350px;
    }

    @media screen and (max-width: 800px) {
        display: none;
    }
`

const Form = styled.div`
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
  button {
      margin-top: 30px;
  }
  .title {
    width: 250px;
    text-align: center;
    margin: 30px 0 5px;
    p {
      font-size: 0.9em;
      a {
        color: #F2272C;
      }
    }
  }
  .link {
    font-size: 0.9em;
  }
`

export default function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false)

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
        {loading ? <Loading /> : ''}
        <Img className='slide-in-left'>
          <img src='img/imagemAnimadaLogin.gif'/>
        </Img>

        <Form>
            <div className='imagem-logo slide-in-top'>
                <img src={Logo_agendaqui_laranja} />
            </div>
            <div className='flex-column-center slide-in-bottom'>
                <div className="label-float">
                    <input value={email.trim()} onChange={pegarEmail} placeholder=" " autoComplete='none' required/>
                    <label>Email</label>
                </div>
                <br/>
                <div className="label-float">
                    <input type="password" placeholder=" " value={senha} onChange={pegarSenha} autoComplete='none' required/>
                    <label>Senha</label>
                </div>
                <p className='erro-texto'>{erro}</p>
                
                <button className='botao-sucesso' onClick={Entrar}>Entrar</button>
                <div className='title'>
                  <p>Não tem uma conta? <Link to="/cadastro">Increver-se</Link></p>
                </div>
                
                <Link to="/recuperar-senha" className='link'>Recuperar senha</Link>
            </div>
        </Form>
    </ContainerLogin>
  );
}
