import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import InputMask from "react-input-mask";
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import IconeAnimadoConfig from '../../imagens/icones/gif/settings.gif'
import IconeAnimadoServices from '../../imagens/icones/gif/cashback.gif'
import IconeAnimadoProfissional from '../../imagens/icones/gif/id.gif'
import IconeAnimadoAgenda from '../../imagens/icones/gif/calendar.gif'
import IconeAnimadoCliente from '../../imagens/icones/gif/customer.gif'
import IconeAnimadoPagina from '../../imagens/icones/gif/worldwide.gif'
import IconeSetaDireita from '../../imagens/icones/seta-direita-branca.png'

const ContainerNovoServico = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .btn-voltar {
        margin: 20px;
    }
    h1 {
        color: red;
    }
    .box-titulo {
        width: 100%;
        text-align: center;
        padding: 0 10px;
    }
    .riscado {
        text-decoration: line-through;
    }
    table {
        width: 100%;
        text-align: center;
        color: white;
    }
    th {
        border: 1px solid #ccc;
        padding: 10px;
    }
    td {
        padding: 8px;
        border-bottom: 1px solid #ccc;
    }
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
    }
`
const Form = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;
    max-width: 350px;
    width: 100%;
  .erro {
    color: red;
    font-size: 0.8em;
    margin: -10px 0 0 15px;
  }
  .erro-final{
    color: red;
    text-align: center;
    font-size: 0.8em;
    margin: 20px;
  }
  .contorno-erro {
    border: 1px solid red;
  }
  h5 {
    border-bottom: 1px solid red;
    font-size: 1em;
    margin: 15px;
  }
  .botao-salvar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .campo-input {
    display: flex;
    width: 100%;
    background-color: var(--cor-bg-escura);
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    label {
      position: absolute;
      top: 8px;
      left: 10px;
      color: #ccc;
    }
    input {
      width: 100%;
      margin-top: 25px;
      background-color: transparent;
      border: none;
      color: #ececf6;
      margin-left: 8px;
    }
    input.nome {
      text-transform: capitalize;
    }
    input.link-whatsapp{
      text-transform: lowercase;
    }
  }
  .gerar-link {
    margin-left: 20px;
    margin-top: -10px;
    margin-bottom: 10px;
    width: 100%;
    a {
      color: #ccc;
    }
  }
  .tempo, .valor {
    width: 150px;
  }
  .precisao-valor {
    height: 70px;
    select {
        width: 100%;
        margin-top: 20px;
        color: white;
        background-color: transparent;
    }
    option {
        color: black;
        width: 80%;
    }
  }
  input.range {
    width: 25px;
  }
`

export default function NovoServico() {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()
    const [promocao, setPromocao] = useState(0)

    const alterarPromocao = () => {
        if (promocao) {
            setPromocao(0)
        } else {
            setPromocao(1)
        }
    }

    // const user = useSelector((state) => {
    //   return state.user
    // })

    //retorna todos os negocios do usuário logado que esta na store
    const negocios = useSelector((state) => {
        return state.negocios
      })

    //retorna somente o negocio da página atual
    const negocioUser = negocios.filter((negocio) => {
    return negocio.nome_da_pagina === nome_negocio
    })

    //retorna todos as unidades do usuario que esta na store
    const unidades = useSelector((state) => {
        return state.unidades
    })

    //retorna somente as unidades do negocio da página atual
    const unidadesNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
    })

    //retorna somente a unidade da página atual
    const unidadeNegocio = unidadesNegocio.filter((unidad) => {
        return unidad.nome === unidade
    })

    //retorna todos os serviços do usuário logado
    const servicos = useSelector((state) => {
        return state.servicos
    })

    //retorna somente os serviços da unidade da página atual
    const servicosUnidade = servicos.filter((servico) => {
        return servico.unidade_id === unidadeNegocio[0].id
    })

    console.log(unidadesNegocio)

//    const list = negocioUser.map((unidade, index) => {
//     return <p key={index}>{unidade}</p>
//    })
    
  return (
    <ContainerNovoServico>
      <App>
        <div className='center'>
            <button className='btn-voltar'>Voltar</button>
            <div className='box-titulo'>
                <h1>Novo Serviço</h1>
            </div>
            <Form>
                <div className='campo-input'>
                    <label>Nome*</label>
                    <input placeholder='Nome do serviço' value={unidade.nome} name='nome' autoComplete="none" className='nome'/>
                </div>

                <div className='campo-input tempo'>
                    <label>Tempo*</label>
                    <InputMask mask="99:99" placeholder='00:00' value={unidade.nome} name='nome' autoComplete="none" className='nome'/>
                </div>

                <div className='campo-input valor'>
                    <label>Valor*</label>
                    <input placeholder='00,00' value={unidade.nome} name='nome' autoComplete="none" className='nome'/>
                </div>

                <div className='campo-input precisao-valor'>
                    <label>Precisão do valor*</label>
                    <select name='nome' autoComplete="none" className='nome'>
                        <option>A partir de</option>
                        <option>Valor exato</option>
                    </select>
                </div>

                <input className='range' type="range" min='0' max='1' value={promocao} onClick={alterarPromocao}/>


                {promocao && 
                    <div>

                    </div>
                }
            </Form>
        </div>
      </App>
    </ContainerNovoServico>
  );
}
