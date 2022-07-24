import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import App from '../layouts/App';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import IconeCoracao from '../imagens/icones/coracao.png'
import IconeCoracaoColorido from '../imagens/icones/coracao-colorido.png'

const ContainerHome = styled.div`
  background-color: #2d3d54;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
`

const ListUnidades = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 10px;
.logo-info {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 2px;
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
  border-radius: 10px;
  border: 3px solid #141f36;
  background-color: #141f3687;
  .logo {
    background-color: white;
    max-width: 40px;
    min-width: 40px;
    width: 100%;
    height: 40px;
    border-radius: 50%;
    padding: 2px;
    margin-right: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  h2 {
    text-transform: capitalize;
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
  .icone-favorito {
    max-width: 30px;
    min-width: 30px;
    width: 100%;
    height: 30px;
    z-index: 300;
    background-color: transparent;
    border: none;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
`

export default function Home() {
  const [urlBase, setUrlBase] = useState('http://localhost:8000')
  const [user, setUser] = useState({})
  const [form, setForm] = useState({nome: '', email: ''})
  const dispatch = useDispatch()
  const token = localStorage.getItem('token-agendaqui')

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
            <h2>{unidade.negocio.nome}</h2>
            <p><strong className='negrito'>{unidade.nome}</strong> • {unidade.rua}, {unidade.numero} {unidade.complemento} <br/> {unidade.bairro}, {unidade.cidade} {unidade.estado}</p>
          </div>
        </div>
        {token ?
        <button className='icone-favorito'>
          <img src={IconeCoracao}/>
        </button>: ''}
      </Link>
    )
  })

  return (
    <ContainerHome>
      <App>
        <div className='center'>
          {unidades.length > 0 &&
          <ListUnidades>
            {listUnidades}
            <i className="fi fi-rr-envelope"></i>
          </ListUnidades>}
        </div>
      </App>
    </ContainerHome>
  );
}
