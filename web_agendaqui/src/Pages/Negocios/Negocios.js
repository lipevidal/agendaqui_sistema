import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import IconeSetaDireita from '../../imagens/icones/seta-direita.png'

const ContainerNegocios = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .botao-acessar, .botao-editar {
      padding: 2px 5px;
      margin: 3px;
      background-color: #2d6cea;
      color: white;
      border-radius: 3px;
      text-decoration: none;
    }
    .botao-editar {
      background-color: #ffa83f;
    }
    .list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .lista-negocios {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        h2 {
          padding-bottom: 20px;
        }
        .botao {
          margin-top: 20px;
        }
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
        .titulo-link {
          padding: 30px 15px 10px 15px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        button {
          padding: 2px 5px;
          margin: 0 3px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
        }
        table {
          margin: 30px;
          border-left: 1px solid red;
          border-right: 1px solid red;
        }
        th, td {
          width: 160px;
        }
        th {
          color: red;
          border-bottom: 2px solid red;
          border-top: 2px solid red;
        }
        td {
          height: 60px;
          color: white;
          text-align: center;
          text-transform: capitalize;
          border-bottom: 1px solid red;
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
            text-transform: capitalize;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      padding: 50px;
      font-size: 1.2em;
      text-align: center;
    }

    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
    }
`

export default function Negocios(props) {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [negociosUser, setNegociosUser] = useState([])

    // const user = useSelector((state) => {
    //   return state.user
    // })

    //retorna todos os negocios do usuário logado que esta na store
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
          {negocios.length ? 
            <div className='lista-negocios'>
              
                <h2>MEUS NEGÓCIOS</h2>
                <div className='list'>
                  {listNegocios}
                </div>
                <Link className='botao' to="/novo-negocio">+ Novo negócio</Link>

            </div> 
            : 
            <div className='nao-cadastrado'>
              <p>
                Você não possui negócios cadastrados
              </p>
              <Link className='botao' to="/novo-negocio">+ Novo negócio</Link>
            </div>
          }
        </div>
      </App>
    </ContainerNegocios>
  );
}
