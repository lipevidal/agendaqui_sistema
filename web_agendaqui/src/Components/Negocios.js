import React, { useState, useEffect } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import store from '../store/store';

const ContainerNegocios = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .lista-negocios {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        h3 {
          color: #F2272C;
          padding: 20px;
          font-size: 1.5em;
        }
        button {
            margin: 10px;
            background-color: white;
            width: 230px;
            padding: 15px;
            border-radius: 10px;
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
`

export default function Negocios(props) {
    const token = localStorage.getItem('token-agendaqui')
    const [negociosUser, setNegociosUser] = useState([])

    // const user = useSelector((state) => {
    //   return state.user
    // })

    const negocios = useSelector((state) => {
      return state.negocios[0]
    })

    console.log(negocios)

    // const todosNegocios = negociosUser.filter((negocio) => {
    //     return negocio.user_id === user.id
    // })

    const listNegocios = negocios.map((negocio, indice) => {
        return (
            <button key={indice}>
              <h4>{negocio.nome}</h4>
              <p>{negocio.categoria}</p>
            </button>
        )
    })
    
  return (
    <ContainerNegocios>
            {listNegocios.length ? 
              <div className='lista-negocios'>
                <h3>MEUS NEGÓCIOS</h3>
                {listNegocios}
              </div> : ''
            }
            
        <Link className='botao' onClick={props.onclickfecharAbaNegocios} to="/novo-negocio">+ Novo negócio</Link>
    </ContainerNegocios>
  );
}
