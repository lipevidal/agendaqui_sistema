import React from 'react';
import styled from 'styled-components';
import GifTempo from '../imagens/gif/time.gif'

const Carregar = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 10000000;
width: 100%;
height: 100vh;
background-color: rgba(0, 0, 0, 0.9);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
img {
  width: 250px;
  height: 250px;
  object-fit: cover;
  background-color: transparent;
}
p {
  color: white;
  margin-top: -60px;
}
`

export default function Loading() {
  return (
    <Carregar>
        <img src={GifTempo} />
        <p>Carregando...</p>
    </Carregar> 
  );
}
