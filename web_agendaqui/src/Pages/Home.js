import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../Components/Header';
import styled from 'styled-components';
import Perfil from '../Components/Perfil';

const ContainerHome = styled.div`
  background-color: #2d3d54;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  const { token } = useParams()
  const [pagina, setPagina] = useState('listaNegocios')

  // useEffect(() => {

  // }, [perfil])

  let mostrar;
  // eslint-disable-next-line default-case
  switch (pagina) {
    case 'perfil':
      mostrar = <Perfil />
      break;
  }

  const mostarPerfil = () => {
    if(pagina === 'perfil') {
        setPagina('listaNegocios')
    } else {
        setPagina('perfil')
    }
  }

  return (
    <ContainerHome>
      <Header token={token ? token : null}
        onclickMostarPerfil={mostarPerfil}
      />
      {mostrar}
    </ContainerHome>
  );
}
