import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import App from '../layouts/App';

const ContainerHome = styled.div`
  background-color: #2d3d54;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  const { token } = useParams()

  // useEffect(() => {

  // }, [perfil])

  return (
    <ContainerHome>
      <App>
        <div className='center'>
          <div>Home</div>
        </div>
      </App>
    </ContainerHome>
  );
}
