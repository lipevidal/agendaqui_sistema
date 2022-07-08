import React from 'react';
import styled from 'styled-components';

const Carregar = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 10000;
width: 100%;
height: 100vh;
background-color: white;
`

export default function Loading() {
  return (
    <Carregar>
        Carregando...
    </Carregar> 
  );
}
