import React, { useState } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContainerErro = styled.div`
  background-color: #2d3d54;
  width: 100%;
  .box-erro {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    h3 {
      text-align: center;
    }
    .botao {
      background-color: #369a5d;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 10px;
      border: none; 
      color: #ececf6;
      cursor: pointer;
      &:hover {
        background-color: #4eca7a;
      }
    }
  }
`

export default function Erro() {
    
  return (
    <ContainerErro>
        <App>
            <div className='center'>
              <div className='box-erro'>
                <h3>Faça o login para acessar esta página</h3>
                <Link className='botao' to="/login">Login</Link>
              </div>
            </div>
      </App>
    </ContainerErro>
  );
}
