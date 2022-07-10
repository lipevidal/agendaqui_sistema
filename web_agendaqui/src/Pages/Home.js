import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import App from '../layouts/App';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';

const ContainerHome = styled.div`
  background-color: #2d3d54;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
`

export default function Home() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState({nome: '', email: ''})

  const dispatch = useDispatch()
  const token = localStorage.getItem('token-agendaqui')

  const pegarForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const unidades = useSelector((state) => {
    return state.todasUnidades
  })

  const listUnidades = unidades.map((unidade, index) => {
    return <p key={index}>{unidade.nome}</p>
  })

  return (
    <ContainerHome>
      <App>
        {listUnidades}
      </App>
    </ContainerHome>
  );
}
