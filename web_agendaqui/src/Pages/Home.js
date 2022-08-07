import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import App from '../layouts/App';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import IconeEstrela from '../imagens/icones/star-free-icon-font-cinza.png'
import IconeEstrelaColorida from '../imagens/icones/star-free-icon-font-color.png'

const ContainerHome = styled.div`
  background-color: #F1F1F1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 650px) {
    margin-top: calc(var(--altura-header) - 10px);
    min-height: calc(100vh - var(--altura-header));
    padding-bottom: var(--altura-header);
  }
`

const ListUnidades = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 10px;
.logo-info {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 2px;
}
.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .horarios {
      font-size: 1em;
      margin: 5px 0;
      span {
        color: green;
      }
  }
  .servicos {
    display: flex;
    overflow: auto;
    .box-servico {
      color: #2d6cea;
      background-color: #a4bceb;
      padding: 5px 10px;
      border-radius: 30px;
      font-size: 0.6em;
      margin-right: 5px;
      white-space: nowrap;
    }
  }
  .servicos::-webkit-scrollbar {
      display: none;
  }
}
.link-unidades {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  max-width: 350px;
  min-width: 280px;
  width: 100%;
  text-decoration: none;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0.2px #ccc;
  background-color: #FFFFFF;
  overflow: hidden;
  &:hover {
    background-color: #ececf6;
  }
  .logo {
    background-color: white;
    max-width: 60px;
    min-width: 60px;
    width: 100%;
    height: 60px;
    border-radius: 15px;
    padding: 2px;
    margin-right: 10px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .box-titulo-unidade {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
    .titulo {
      display: flex;
      align-items: center;
      h2 {
        text-transform: capitalize;
        color: black;
        display: flex;
        align-items: center;
      }
      span.unidade {
        font-size: 0.7em;
        text-transform: capitalize;
        border: 2px solid red;
        border-radius: 8px;
        color: red;
        padding: 5px;
        margin: 0 5px;
      }
    }
    .icone-favorito {
      max-width: 30px;
      min-width: 30px;
      width: 100%;
      height: 30px;
      z-index: 300;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  p {
    font-size: 0.6em;
    color: #ccc;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .negrito {
    font-weight: 800;
    font-size: 1.4em;
  }
}
`

export default function Home() {
  const [urlBase, setUrlBase] = useState('http://localhost:8000')
  const [user, setUser] = useState({})
  const [form, setForm] = useState({nome: '', email: ''})
  const [favorito, setFavorito] = useState(false)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token-agendaqui')

  const favoritar = () => {
    if(favorito) {
      setFavorito(false)
    } else {
      setFavorito(true)
    }
  }

  const pegarForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  //Todas as unidades do store
  const unidades = useSelector((state) => {
    return state.todasUnidades
  })

  const listUnidades = unidades.map((unidade, index) => {
    return (
      <Link className='link-unidades' key={index}>
        <div className='logo-info'>
          <div className='logo'>
            <img src={`${urlBase}/storage/${unidade.negocio.logo}`}/>
          </div>
          <div className='info'>
            <div className='box-titulo-unidade'>
              <div className='titulo'>
                <h2>{unidade.negocio.nome}</h2>
                <span className='unidade'>{unidade.nome}</span>
              </div>
              {token ?
              <button className='icone-favorito' onClick={favoritar}>
                <img src={favorito ? IconeEstrelaColorida : IconeEstrela}/>
              </button>: ''}
            </div>
            <p className='horarios'>Horários disponíveis: <span>Hoje</span></p>
            <div className='servicos'>
                <div className='box-servico'>Salão de beleza</div>
                <div className='box-servico'>Centro de estética</div>
            </div>
            {/* <p><strong className='negrito'>4♦</strong> • {unidade.rua}, {unidade.numero} {unidade.complemento} <br/> {unidade.bairro}, {unidade.cidade} {unidade.estado}</p> */}
          </div>
        </div>
        
      </Link>
    )
  })

  return (
    <ContainerHome>
      <div className='center-home'>
      <App>
        
          {unidades.length > 0 &&
          <ListUnidades>
            {listUnidades}
            <i className="fi fi-rr-envelope"></i>
          </ListUnidades>}
        
      </App>
      </div>
    </ContainerHome>
  );
}
