import React from 'react';
import InputMask from "react-input-mask";
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import styled from 'styled-components';

const BoxPopUp = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    .caixa-popUp {
        background-color: white;
        padding: 10px;
        padding-bottom: 20px;
        border-radius: 10px;
        max-width: 300px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        input {
          color: black;
        }
        .fechar {
          text-align: right;
          width: 100%;
          margin-bottom: 20px;
          button {
            background-color: transparent;
            border: none;
            outline: none;
            font-size: 2em;
            font-weight: bold;
            cursor: pointer;
          }
        }
    }
`


export default function PopUp(props) {
  return (
    <BoxPopUp>
      <div className='caixa-popUp'>
          <div className='fechar'><button onClick={props.onclickFecharPopUp}>X</button></div>
          <div className="label-float">
              <input className='primeira-maiuscula' value={props.value} onChange={props.onchange} placeholder=" " autoComplete='none' required/>
              <label>{props.label}</label>
          </div>
          <p className='erro-texto'>{props.erro}</p>
          <button className='botao-sucesso'>Salvar</button>
        </div>
    </BoxPopUp> 
  );
}
