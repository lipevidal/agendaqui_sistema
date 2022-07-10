import React, { useState, useEffect } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import store from '../store/store';
import IconeSetaDireita from '../imagens/icones/seta-direita.png'

const ContainerNegocios = styled.div`
    background-color: #2d3d54;
    min-height: calc(100vh - var(--altura-header));
    margin-top: var(--altura-header);
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
    }
    .lista-negocios {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
        }
        img.logo {
          width: 40px;
          height: 40px;
          border-radius: 10%;
        }
        h2 {
          color: white;
          padding: 20px;
        }
        .box-negocio {
            margin: 10px;
            background-color: #ccc;
            border: none;
            border-bottom: 3px solid red;
            width: 280px;
            padding: 15px;
            text-decoration: none;
            text-align: center;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: black;
            border-radius: 5px;
            &:hover {
              background-color: #aaa;
            }
            h4 {
              font-size: 1.2em;
            }
            p {
              font-size: 0.8em;
            }
        }
    }
    .botao {
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
    .nao-cadastrado {
      color: white;
      padding: 50px;
      font-size: 1.2em;
      text-align: center;
    }
`

export default function Negocios(props) {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [negociosUser, setNegociosUser] = useState([])

    // const user = useSelector((state) => {
    //   return state.user
    // })

    const negocios = useSelector((state) => {
      return state.negocios
    })
    
    console.log('Dados do store de negocios')
    console.log(negocios)

    // const todosNegocios = negociosUser.filter((negocio) => {
    //     return negocio.user_id === user.id
    // })

    const listNegocios = negocios.map((negocio, indice) => {
        return (
            <Link to={`/negocio/${negocio.nome_da_pagina}`} className='box-negocio' key={indice}>
              <img className='logo' src={`${urlBase}/storage/${negocio.logo}`}/>
              <div className='box'>
                <h4>{negocio.nome}</h4>
                <p>{negocio.categoria}</p>
              </div>
              <img src={IconeSetaDireita}/>
            </Link>
        )
    })
    
  return (
    <ContainerNegocios>
      <App>
        <div className='center'>
          {listNegocios.length ? 
            <div className='lista-negocios'>
              <h2>MEUS NEGÓCIOS</h2>
              {listNegocios}
            </div> : <div className='nao-cadastrado'>Você não possui negócios cadastrados</div>
          }
          <Link className='botao' onClick={props.onclickfecharAbaNegocios} to="/novo-negocio">+ Novo negócio</Link>
        </div>
      </App>
    </ContainerNegocios>
  );
}
