import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import IconeAnimadoConfig from '../../imagens/icones/gif/settings.gif'
import IconeAnimadoServices from '../../imagens/icones/gif/cashback.gif'
import IconeAnimadoProfissional from '../../imagens/icones/gif/id.gif'
import IconeAnimadoAgenda from '../../imagens/icones/gif/calendar.gif'
import IconeAnimadoCliente from '../../imagens/icones/gif/customer.gif'
import IconeAnimadoPagina from '../../imagens/icones/gif/worldwide.gif'
import IconeSetaDireita from '../../imagens/icones/seta-direita-branca.png'

const ContainerUnidade = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      position: relative;
    }
    .seta {
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
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
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
        text-transform: capitalize;
        text-shadow: 0 0 5px black;
    }
`

const Botoes = styled.div`
    margin-top: -80px;
    z-index: 200;
    max-width: 450px;
    width: 100%;
    padding: 10px;
    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        font-size: 1.5em;
        color: white;
        width: 100%;
        height: 80px;
        margin: 10px 0;
        background-color: #141f36;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        .box-img {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px 0 0 10px;
            }
            p {
                margin: 0 10px;
            }
        }
        img.seta-direita {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 0 10px 10px 0;
        }
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
            <Link to={`/negocio/${nome_negocio}`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>
            <Capa>
                <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
                <h1>{unidadeNegocio[0].nome}</h1>
            </Capa>
            <Botoes>
                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoConfig}/>
                        <p>CONFIGURAÇÕES</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>

                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoServices}/>
                        <p>SERVIÇOS</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>

                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoProfissional}/>
                        <p>PROFISSIONAIS</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>

                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoAgenda}/>
                        <p>AGENDAS</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>

                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoCliente}/>
                        <p>CLIENTES</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>

                <Link to={`/negocio/${nome_negocio}/${unidade}/config`}>
                    <div className='box-img'>
                        <img src={IconeAnimadoPagina}/>
                        <p>PÁGINA</p>
                    </div>
                    <img src={IconeSetaDireita} className="seta-direita"/>
                </Link>
            </Botoes>
        </div>}
      </App>
    </ContainerUnidade>
  );
}
