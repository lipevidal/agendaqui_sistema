import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import IconeAnimadoConfig from '../../imagens/icones/gif/settings.gif'
import IconeAnimadoServices from '../../imagens/icones/gif/cashback.gif'
import IconeAnimadoProfissional from '../../imagens/icones/gif/id.gif'
import IconeAnimadoAgenda from '../../imagens/icones/gif/calendar.gif'
import IconeAnimadoCliente from '../../imagens/icones/gif/customer.gif'
import IconeAnimadoPagina from '../../imagens/icones/gif/worldwide.gif'
import IconeSetaDireita from '../../imagens/icones/seta-direita-branca.png'

const ContainerServicos = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .btn-voltar {
        margin: 20px;
    }
    h1 {
        color: red;
    }
    .box-titulo {
        display: flex;
        justify-content: space-between;
        align-items: center;
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

export default function Servicos() {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()

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

    const listUnidades = servicosUnidade.map((unidade) => {
        return (
            <tr>
                <td>{unidade.nome}</td>
                <td>{unidade.tempo}</td>
                <td className={unidade.valor_promocional ? 'riscado' : ''}>
                    {unidade.precisao_do_valor}: {unidade.valor.toFixed(2).replace('.', ',')}
                </td>
                <td>
                    {unidade.valor_promocional ? <span>{unidade.precisao_do_valor}: {unidade.valor_promocional.toFixed(2).replace('.', ',')}</span> : 'Não' }
                </td>
                <td>
                    <button>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        )
    })
    
  return (
    <ContainerServicos>
      <App>
        <div className='center'>
            <button className='btn-voltar'>Voltar</button>
            <div className='box-titulo'>
                <h1>Serviços</h1>
                <Link to={`/negocio/${nome_negocio}/${unidade}/novo-servico`}>+ Novo Serviço</Link>
            </div>
            {servicosUnidade.length ? 
                <div>
                    <table>
                        <tr>
                            <th>Nome do serviço</th>
                            <th>Tempo de execução</th>
                            <th>Valor</th>
                            <th>Promoção</th>
                            <th></th>
                        </tr>
                        {listUnidades}
                    </table>
                </div>
                : 
                <div>Esta unidade não possui serviços</div>
            }
        </div>
      </App>
    </ContainerServicos>
  );
}
