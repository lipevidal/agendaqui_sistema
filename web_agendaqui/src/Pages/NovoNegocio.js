import React, { useState } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import ImagemPadrao from '../imagens/perfilneutra.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContainerNovoNegocio = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .form {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
            color: white;
            margin: 30px;
        }
        .box-imagem {
            margin: 20px;
            width: 120px;
            height: 120px;
            background-color: #eee;
            border-radius: 50%;
            box-shadow: 0 0 5px #000;
            background-image: url(ImagemPadrao);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                cursor: pointer;
            }
        }
        input#inputImg {
            display:none;
        }
        .box-inputs {
          display: flex;
          flex-direction: column;
          padding-bottom: 25px;
          position: relative;
          input {
            font-size: 1.1em;
            text-align: center;
            width: 250px;
            padding: 10px 15px;
            letter-spacing: 2px;
            background-color: transparent;
            outline: none;
            color: #ececf6;
            border: none;
            border-bottom: 1px solid orange;
          }
        }
        p, .erro{
          margin-top: 1px;
          margin-left: 5px;
          font-size: 0.8em;
          text-align: center;
          color: red;
          height: 15px;
        }
        button {
            background-color: #369a5d;
            text-decoration: none;
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
`

export default function NovoNegocio() {
    const token = localStorage.getItem('token-agendaqui')
    const [nomeNegocio, setNomeNegocio] = useState('')
    const [erroNomeNegocio, setErroNomeNegocio] = useState('')
    const [categoria, setCategoria] = useState('')
    const [erroCategoria, setErroCategoria] = useState('')
    const [nomePagina, setNomePagina] = useState('')
    const [erroNomePagina, setErroNomePagina] = useState('')
    const [logo, setLogo] = useState('')
    const [logoDB, setLogoDB] = useState('')
    const [erroLogo, setErroLogo] = useState('')
    const [imagemPadrao, setImagemPadrao] = useState(ImagemPadrao)
    const [user, setUser] = useState({})

    const criarNegocio = () => {
        buscarDados()
        let formData = new FormData();
        formData.append('user_id', user.id)
        formData.append('nome', nomeNegocio)
        formData.append('categoria', categoria)
        formData.append('nome_da_pagina', nomePagina)
        formData.append('logo', logo)
        
        axios.post('http://localhost:8000/api/v1/negocio', formData, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        }).then((response) => {
            console.log(response.data)
            window.location.href = 'http://localhost:3000'
        }).catch((err) => {
            console.log(err.response)
            setErroNomeNegocio(err.response.data.errors.nome)
            setErroCategoria(err.response.data.errors.categoria)
            setErroNomePagina(err.response.data.errors.nome_da_pagina)
            setErroLogo(err.response.data.errors.logo)
        })
    }

    const buscarDados = () => {
        const body = {}
        axios.post('http://localhost:8000/api/v1/me', body, {
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response.data)
          setUser(response.data)
        }).catch((err) => {
          console.log(err)
        })
    }

    const pegarNomeNegocio = (event) => {
        setErroNomeNegocio('')
        setNomeNegocio(event.target.value)
    }

    const pegarCategoria = (event) => {
        setErroCategoria('')
        setCategoria(event.target.value)
    }

    const pegarNomePagina = (event) => {
        setErroNomePagina('')
        setNomePagina(event.target.value)
    }

    const clicarImg = () => {
        let file = document.getElementById('inputImg')
        file.click();
    }
    
  return (
    <ContainerNovoNegocio>
        <App>
            <div className='center'>
                <div className='form'>
                    <h2>NOVO NEGÓCIO</h2>
                    <div className='box-imagem'>
                        { logo ? logoDB === logo ? 
                            <img src={logo} alt="ImagemAb" onClick={clicarImg}/> 
                            : 
                            <img src={URL.createObjectURL(logo)} alt="Imagem" onClick={clicarImg}/> 
                            : 
                            <img src={imagemPadrao} alt="Selecione uma imagem" onClick={clicarImg} />
                        }
                    </div>
                    <p className='erro'>{erroLogo}</p>
                    <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setLogo(e.target.files[0])}/>
                    {/* { logo ? <button onClick={excluirPhoto} className='del'>Excluir</button> : '' } */}
                    <div className='box-inputs'>
                        <input value={nomeNegocio} onChange={pegarNomeNegocio} placeholder='Nome do negócio' autoComplete='none'/>
                        <p>{erroNomeNegocio}</p>
                        <input value={categoria} onChange={pegarCategoria} placeholder='Categoria.. Ex: Barbearia' autoComplete='none'/>
                        <p>{erroCategoria}</p>
                        <input value={nomePagina.trim()} onChange={pegarNomePagina} placeholder='Nome da página' autoComplete='none'/>
                        <p>{erroNomePagina}</p>
                    </div>
                    <button onClick={criarNegocio}>Enviar</button>
                </div>
            </div>
      </App>
    </ContainerNovoNegocio>
  );
}
