import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import InputMask from "react-input-mask";
import Loading from '../../Components/Loading';
import api from '../../services/api';
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades, getUnidades } from '../../store/Unidades/Unidades.fetch.actions'

const ContainerEditarUnidade = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      position: relative;
    }
    .seta {
      position: absolute;
      top: 15px;
      left: 10px;
      z-index: 100;
      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
    }
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
      padding-bottom: var(--altura-header);
    }
`

const BoxEditarUnidade = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .topo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 50px;
    button {
      cursor: pointer;
    }
  }
  .form {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;
    max-width: 400px;
    width: 100%;
  }
  .erro {
    color: red;
    font-size: 0.8em;
    margin: -10px 0 0 15px;
  }
  .erro-final{
    color: red;
    text-align: center;
    font-size: 0.8em;
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
    margin: 20px;

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
    /* input::placeholder {
      color: #ddd;
    } */
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
  .cep {
    width: 100%;
    .campo-input {
      width: 40%;
    }
  }
  .rua-numero, .cidade-estado {
    display: flex;
    .rua, .cidade {
      width: 70%;
    }
    .numero, .estado {
      width: 30%;
    }
  }
  .complemento-bairro {
    display: flex;
    .complemento, .bairro {
      width: 50%;
    }
  }
`
export default function EditarUnidade() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()
    const [erros, setErros] = useState({})
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState('')
    let history = useHistory()
    const [unidadee, setUnidadee] = useState({
        nome: '',
        link_whatsapp: '',
        contato: ''
    })

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

    //retornar somente a unidade da página atual
    const unidadeNegocio = unidadesNegocio.filter((uni) => {
      return uni.nome === unidade
    })

    console.log(unidadeNegocio)

    const salvarUnidade = (nomeUnidade) => {
      setLoading(true)
      let salvar = true
      for (let uni of unidadesNegocio) {
        if (uni.nome.toLowerCase()  === nomeUnidade.toLowerCase()) {
          salvar = false
        }
      }

      if (salvar) {
        console.log(unidade)
        const body = {
          _method: 'patch',
        }
        if (unidadee.nome) {
          body.nome = unidadee.nome.toLowerCase()
        }
        if (unidadee.link_whatsapp) {
          body.link_whatsapp = unidadee.link_whatsapp.toLowerCase()
        }
        if (unidadee.contato) {
          body.contato = unidadee.contato
        }
        console.log(body)
        api.post(`/api/v1/unidade/${unidadeNegocio[0].id}`, body, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          dispatch(getUnidades(negocios, token))
          dispatch(getTodasUnidades())
          if (unidadee.nome) {
            history.push(`/negocio/${nome_negocio}/${res.data.nome}/editar`)
            document.location.reload(true);
          }
          setUnidadee({nome: '', link_whatsapp: '', contato: '', cep: '', numero: '', complemento: ''})
          // history.push(`/negocio/${nome_negocio}`)
        }).catch((err) => {
          console.log(err.response.data)
          setErros(err.response.data.errors)
        }).finally(() => {
          setLoading(false)
        })
      } else {
        setErro('Esta unidade já existe')
      }
          
      }

    const pegarDados = (e) => {
        e.preventDefault();
        setErro('')
        setErros({...erros, [e.target.name]: ''})
        setUnidadee({...unidadee, [e.target.name]: e.target.value})
      }
    
  return (
    <ContainerEditarUnidade>
      <App>
        {loading && <Loading />}
        {unidadeNegocio.length > 0 &&
        <div className='center'>
            <Link to={`/negocio/${nome_negocio}/${unidade}/config`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>
            <BoxEditarUnidade>
                <div className='topo'>
                  <h2>Editar Unidade</h2>
                </div>

                <div className='form'>
                  <div className={erros.nome ? 'campo-input contorno-erro': 'campo-input'}>
                    <label>Nome*</label>
                    <input placeholder={unidadeNegocio[0].nome} value={unidadee.nome} name='nome' onChange={pegarDados} autoComplete="none" className='nome'/>
                  </div>

                  <div className='campo-input'>
                    <label>Link do WhatsApp:</label>
                    <input placeholder={unidadeNegocio[0].link_whatsapp} value={unidadee.link_whatsapp.trim()} name='link_whatsapp' onChange={pegarDados} autoComplete="none" className='link-whatsapp'/>
                  </div>

                  <div className='gerar-link'>
                    <a href='https://a.umbler.com/gerador-de-link-whatsapp?gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2KCAz7D_STsAvDcrh97KDPtJkDrChsPuZk9EZWa7sCHIAfmZl7L-UaAt9gEALw_wcB' target='_blank'>Gerar link aqui</a>
                  </div>

                  <div className={erros.contato ? 'campo-input contato contorno-erro': 'campo-input contato'}>
                    <label>Contato*:</label>
                    <InputMask mask="(99)9999-99999" placeholder={unidadeNegocio[0].contato} value={unidadee.contato} name='contato' onChange={pegarDados} autoComplete="none"/>
                  </div>

                </div>

                <p className='erro-final'>{erro}</p>
                <p className='erro-final'>{erros.nome}</p>
                <p className='erro-final'>{erros.link_whatsapp}</p>
                <p className='erro-final'>{erros.contato}</p>

                <div className='botao-salvar'>
                  <button className='botao-sucesso' onClick={() => salvarUnidade(unidadee.nome)}>Salvar</button>
                </div>
            </BoxEditarUnidade>
        </div>}
      </App>
    </ContainerEditarUnidade>
  );
}
