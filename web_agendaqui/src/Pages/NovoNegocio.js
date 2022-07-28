import React, { useState } from 'react';
import api from "../services/api";
import App from '../layouts/App';
import styled from 'styled-components';
import ImagemPadrao from '../imagens/perfilneutra.jpg'
import IconeSetaEsquerda from '../imagens/icones/seta-esquerda.png'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addNegocios, addNegocio } from "../store/Negocios/Negocios.actions";
import { Link } from 'react-router-dom';
import { postNegocios } from '../store/Negocios/Negocios.fetch.actions';

const ContainerNovoNegocio = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    padding-top: 10px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    .voltar-titulo {
        width: 100%;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img, .vazio {
            width: 30px;
            height: 30px;
        }
    }
    .form {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .nome-pagina {
            text-transform: lowercase;
        }
        h2 {
            color: white;
            margin: 10px;
        }
        .box-imagem {
            margin-top: 10px;
            width: 120px;
            height: 120px;
            background-color: #eee;
            border-radius: 10%;
            box-shadow: 0 0 5px #000;
            background-image: url(ImagemPadrao);
            img {
                width: 100%;
                height: 100%;
                border-radius: 10%;
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
          position: relative;
          input {
            font-size: 1.1em;
            text-align: left;
            width: 280px;
            letter-spacing: 2px;
            background-color: #141f3687;
            outline: none;
            color: #ececf6;
            box-shadow: 0 0 5px #000; 
          }
        }
        p, .erro{
          margin-top: 1px;
          margin-left: 5px;
          margin-bottom: 15px;
          font-size: 0.8em;
          text-align: center;
          color: red;
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
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
    }

`

export default function NovoNegocio(props) {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const [erro, setErro] = useState('')
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

    //retorna somente o id do usuário logado que esta na store
    const userId = useSelector((state) => {
        return state.user.id
    })

    //retorna todos os negocios do usuário logado que esta na store
    const negocios = useSelector((state) => {
    return state.negocios
    })

    const criarNegocio = () => {
        setErro('')
        let salvar = true
        for (let neg of negocios) {
            if (neg.nome.toLocaleLowerCase()  === nomeNegocio.toLocaleLowerCase()) {
                salvar = false
            }
        }

        if (salvar) {
            buscarDados()
            let formData = new FormData();
            formData.append('user_id', userId)
            formData.append('nome', nomeNegocio.toLowerCase())
            formData.append('categoria', categoria.toLowerCase())
            formData.append('nome_da_pagina', nomePagina.toLowerCase())
            formData.append('logo', logo)

            api.post('/api/v1/negocio', formData, {
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data)
                dispatch(addNegocio(res.data))
                props.history.push('/negocios')
            }).catch((err) => {
                console.log(err.response)
                setErroCategoria(err.response.data.errors.categoria)
                setErroNomeNegocio(err.response.data.errors.nome)
                setErroNomePagina(err.response.data.errors.nome_da_pagina)
                setErroLogo(err.response.data.errors.logo)
            })

        } else {
            setErro('Este negocio já existe')
        }
        
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

    const pegarLogo = (e) => {
        setErroLogo('')
        setLogo(e.target.files[0])
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
                    <div className='voltar-titulo'>
                        <Link to={`/negocios`} className='seta'>
                            <img src={IconeSetaEsquerda} />
                        </Link>
                        <h2>NOVO NEGÓCIO</h2>
                        <div className='vazio'></div>
                    </div>
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
                    <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={pegarLogo}/>
                    {/* { logo ? <button onClick={excluirPhoto} className='del'>Excluir</button> : '' } */}
                    <div className='box-inputs'>
                        <div className="label-float">
                            <input className='primeira-maiuscula' value={nomeNegocio} onChange={pegarNomeNegocio} placeholder=" " autoComplete='none' required/>
                            <label>Nome do negócio</label>
                        </div>
                        <p className='erro-texto'>{erroNomeNegocio}</p>

                        <div className="label-float">
                            <input className='primeira-maiuscula' value={categoria} onChange={pegarCategoria} placeholder=" " autoComplete='none' required/>
                            <label>Categoria.. Ex: Barbearia</label>
                        </div>
                        <p className='erro-texto'>{erroCategoria}</p>

                        <div className="label-float">
                            <input value={nomePagina.trim()} onChange={pegarNomePagina} placeholder=" " autoComplete='none' className='nome-pagina' required/>
                            <label>Nome da página</label>
                        </div>
                        <p className='erro-texto'>{erroNomePagina}</p>

                        <div className="label-float">
                            <input placeholder=" " autoComplete='none' required/>
                            <label>Cupom de desconto</label>
                        </div>
                        <p className='erro-texto'>{erroNomePagina}</p>
                        <p className='erro-texto'>{erro}</p>
                    
                    </div>
                    <button onClick={criarNegocio}>Enviar</button>
                </div>
            </div>
      </App>
    </ContainerNovoNegocio>
  );
}
