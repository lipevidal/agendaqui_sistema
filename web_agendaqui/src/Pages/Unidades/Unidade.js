import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';

const ContainerUnidade = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
    }
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
    }
`

const Capa = styled.div`
    max-width: 450px;
    width: 100%;
    position: relative;
    img {
        width: 100%;
        object-fit: cover;
        opacity: 0.4;
    }
    h1 {
        width: 100%;
        position: absolute;
        top: 0;
        text-align: center;
        color: white;
        text-shadow: 0 0 5px black;
    }
`

const Botoes = styled.div`
margin-top: -50px;
z-index: 200;
max-width: 450px;
width: 100%;
padding: 10px;
    button {
        width: 100%;
        height: 50px;
        margin: 5px 0;
        background-color: #ccc;
        border: none;
        cursor: pointer;
    }
`

export default function Unidades(props) {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()

    // const user = useSelector((state) => {
    //   return state.user
    // })

    const negocios = useSelector((state) => {
        return state.negocios
      })

    const negocioUser = negocios.filter((negocio) => {
    return negocio.nome_da_pagina === nome_negocio
    })

    const unidades = useSelector((state) => {
        return state.unidades
    })

    const unidadesNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
    })

    const unidadeNegocio = unidadesNegocio.filter((unidad) => {
        return unidad.nome === unidade
    })

    console.log(unidadesNegocio)

//    const list = negocioUser.map((unidade, index) => {
//     return <p key={index}>{unidade}</p>
//    })
    
  return (
    <ContainerUnidade>
      <App>
        {unidadeNegocio.length > 0 &&
        <div className='center'>
            <Capa>
                <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
                <h1>{unidadeNegocio[0].nome}</h1>
            </Capa>
            <Botoes>
                <button>
                    CONFIGURAÇÕES
                </button>

                <button>
                    SERVIÇOS
                </button>

                <button>
                    PROFISSIONAIS
                </button>

                <button>
                    AGENDAS
                </button>

                <button>
                    CLIENTES
                </button>

                <button>
                    PÁGINA
                </button>
            </Botoes>
        </div>}
      </App>
    </ContainerUnidade>
  );
}
