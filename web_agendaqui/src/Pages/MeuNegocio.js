import React, { useState, useEffect } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/Users/Users.fetch.actions';
import axios from 'axios';
import store from '../store/store';
import IconeSetaDireita from '../imagens/icones/seta-direita.png'

const ContainerMeuNegocio = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    .center {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 600px) {
      margin-top: var(--altura-header);
      min-height: calc(100vh - var(--altura-header));
    }
`

const BoxImagem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: -30px;
    z-index: 100;
    height: 250px;
    .img {
      border-radius: 10px;
      width: 200px;
      height: 200px;
      background-color: white;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }
    }
    h1 {
      text-transform: capitalize;
    }
`

const BoxLista = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 600px;
    background-color: #ececf61e;
    border-radius: 70px;
    padding: 20px;
    padding-top: 80px;
    margin-top: -20px;
    h2 {
      text-transform: capitalize;
      color: black;
      
    }
    @media (max-width: 600px) {
      width: 100%;
      border: none;
      border-radius: 70px 70px 0 0;
      min-height: calc(100vh - 250px - var(--altura-header));
    }
`
const ListUnidades = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: red;
  }
  button {
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: #141f3687;
    border: none;
    border-bottom: 3px solid red;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    h1 {
      margin: 5px;
      text-transform: uppercase;
    }
  }
`

export default function MeuNegocio() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const { nome_negocio } = useParams()
    const [urlBase, setUrlBase] = useState('http://localhost:8000')

      const negocios = useSelector((state) => {
        return state.negocios
      })

      const negocioUser = negocios.filter((negocio) => {
        return negocio.nome_da_pagina === nome_negocio
      })

      console.log('negocio user:')
      console.log(negocioUser)

      const unidades = useSelector((state) => {
        return state.unidades
      })

      const unidadeNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
      })

      const listUnidades = unidadeNegocio.map((unidade) => {
        return (
        <button>
          <div></div>
          <div>
            <h1>{unidade.nome}</h1>
            <h3>Endereço</h3>
            <div>
              <p>{unidade.rua}, {unidade.numero}</p>
              <p>{unidade.complemento}</p>
              <p>{unidade.bairro}, {unidade.cidade} {unidade.estado}</p>
            </div>
          </div>
          <img src={IconeSetaDireita}/>
        </button>
        )
      })
    
  return (
    <ContainerMeuNegocio>
      <App>
        {negocioUser.length > 0&&<div className='center'>
            <BoxImagem>
              <h1>{negocioUser[0].nome}</h1>
              <div className='img'>
                <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
              </div>
            </BoxImagem>
            <BoxLista>
                <h2>Unidades</h2>
                <ListUnidades>
                  {listUnidades}
                </ListUnidades>
            </BoxLista>
        </div>}
      </App>
    </ContainerMeuNegocio>
  );
}
