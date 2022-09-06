import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import InputMask from "react-input-mask";
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades } from '../../store/Unidades/Unidades.fetch.actions'
import { getNegocios } from '../../store/Negocios/Negocios.fetch.actions'
import { getUser } from '../../store/Users/Users.fetch.actions';
import store from '../../store/store';
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import IconeConfig from '../../imagens/icones/settings-sliders.png'
import api from '../../services/api';

const ContainerMeuNegocio = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    padding-bottom: 20px;
    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    a.seta {
      position: absolute;
      top: 15px;
      left: 10px;
      z-index: 100;
      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
    }
    .box-config {
      position: absolute;
      top: 15px;
      right: 10px;
      z-index: 100;
    }
    
    button.seta {
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: none;
      padding: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
    }
`
const Capa = styled.div`
    max-width: 450px;
    width: 100%;
    height: 250px;
    position: relative;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        opacity: 0.4;
    }
    .alterar-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%)
    }
    button {
      cursor: pointer;
    }
    #inputImg {
      display: none;
    }
    .titulo-config {
      position: absolute;
      top: 0;
      padding: 0 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
      h1 {
        z-index: 20;
        width: 100%;
        color: white;
        text-shadow: 0 0 5px black;
        text-align: center;
      }
    }
`
const BoxLista = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    max-width: 450px;
    width: 100%;
    .titulo-lista {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .nome-negocio {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 80px;
    }
    a.config {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      box-shadow: 0 0 5px 1px black;
      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
    }
    h1 {
      margin: 5px;
      text-transform: uppercase;
    }
    h2 {
      text-transform: capitalize;
    }
    .titulo-botao {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      button.img-config {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        width: 35px;
        height: 35px;
      }
      button.botao-sucesso {
        font-size:0.8em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .img-config {
      width: 30px;
      height: 30px;
      display: flex;
      background-color: transparent;
      border: none;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    @media (max-width: 650px) {
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
  .botoes {
    white-space: nowrap;
    button {
      margin: 0 5px;
      border: none;
      padding: 5px;
      border-radius: 3px;
      cursor: pointer;
      color: white;
    }
    button.acessar {
      background-color: #2d6cea;
    }
    button.editar {
      background-color: #ff895f;
    }
  }
  h2 {
    color: red;
  }
  .link {
    text-decoration: none;
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: #141f3687;
    border: none;
    border-bottom: 3px solid red;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .unidade-status {
      display: flex;
      justify-content: start;
    }
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .status {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 15px 0 5px;
      font-size: 0.5em;
    }
    h1 {
      text-transform: uppercase;
      font-size: 1.2em;
    }
  }
`
const NaoUnidade = styled.div`
  width: 100%;
  text-align: center;
  border-top: 2px solid #ccc;
  padding-top: 20px;
  button {
    margin: 15px 0;
  }
`

export default function MeuNegocio() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const { nome_negocio } = useParams()
    const [urlBase, setUrlBase] = useState('http://localhost:8000')

    let history = useHistory()

      //retorna os dados do usuario logado da store
      const user = useSelector((state) => {
        return state.user
      })

      //retorna todos os negocios do usuário logado que esta na store
      const negocios = useSelector((state) => {
        return state.negocios
      })

      //retorna somente o negocio da página atual
      let negocioUser = negocios.filter((negocio) => {
        return negocio.nome_da_pagina === nome_negocio
      })

      //retorna todos as unidades do usuario que esta na store
      const unidades = useSelector((state) => {
        return state.unidades
      })

      //retorna somente as unidades do negocio da página atual
      const unidadeNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
      })
  

      // to={`/negocio/${nome_negocio}/${unidade.nome}`}

      const listUnidades = unidadeNegocio.map((unidade) => {
        return (
        <div key={unidade.id} className='link'>
          <div className='unidade-status'>
            <h1>{unidade.nome}</h1>
            <div className='status'>
              <p className={unidade.status === 'teste' ? 'teste' : unidade.status === 'ativo' ? 'ativo' : unidade.status === 'atrasado' ? 'atrasado' : unidade.status === 'inativo' ? 'inativo' : unidade.negocio === 'a_vencer' ? 'a-vencer' : '' }>{unidade.status}</p>
            </div>
          </div>
          <div className='botoes'>
            <button className='editar'>Editar</button>
            <button className='acessar' onClick={() => history.push(`/negocio/${nome_negocio}/${unidade.nome}`)}>Acessar</button>
          </div>
        </div>
        )
      })
    
  return (
    <ContainerMeuNegocio>
      <App>
        {negocioUser.length > 0&&
        <div className='center'>
            <Link to={`/negocios`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>

            <Capa>
              <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
            </Capa>

            <BoxLista>

              <div className='nome-negocio'>
                <div className='box-config'>
                  <Link to={`/negocio/${nome_negocio}/config`} className='config'>
                    <img src={IconeConfig} />
                  </Link>
                  <p>Config</p>
                </div>
                <h1>{negocioUser[0].nome}</h1>
                {/* <Link to={`/negocio/editar/${nome_negocio}`}>Editar Negócio</Link> */}
              </div>


              {unidadeNegocio.length !== 0 ?

              <div className='titulo-lista'>

                <div className='titulo-botao'>
                  <h2>Unidades</h2>
                  <button onClick={() => history.push(`/negocio/${nome_negocio}/nova-unidade`)} className='botao-sucesso'>+ Criar unidade</button>
                </div>

              

                <ListUnidades>
                  {listUnidades}
                </ListUnidades> 

              </div>
              : 

                <NaoUnidade>
                  <p>Este negócio não possui unidades</p> 
                  <button onClick={() => history.push(`/negocio/${nome_negocio}/nova-unidade`)} className='botao-sucesso'>+ Criar Unidade</button>
                </NaoUnidade>
              }

            </BoxLista> 

            
        </div>}

      </App>
    </ContainerMeuNegocio>
  );
}
