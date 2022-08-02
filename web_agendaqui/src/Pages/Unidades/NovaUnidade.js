import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import InputMask from "react-input-mask";
import api from '../../services/api';
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades } from '../../store/Unidades/Unidades.fetch.actions'

const ContainerNovaUnidade = styled.div`
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

const Capa = styled.div`
    max-width: 450px;
    width: 100%;
    height: 250px;
    position: relative;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        opacity: 0.4;
    }
    h1 {
        width: 100%;
        position: absolute;
        top: 0;
        text-align: center;
        color: white;
        text-shadow: 0 0 5px black;
    }
`

const CriarUnidade = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .topo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 10px;
    h2 {
      margin-left: -30px;
    }
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
export default function NovaUnidade() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const [erros, setErros] = useState({})
    const [erroCep, setErroCep] = useState('')
    const [erro, setErro] = useState('')
    const [endereco, setEndereco] = useState({})
    let history = useHistory()
    const [unidade, setUnidade] = useState({
        nome: '',
        link_whatsapp: '',
        contato: '',
        cep: '',
        numero: '',
        complemento: ''
    })

    // const user = useSelector((state) => {
    //   return state.user
    // })

    const negocios = useSelector((state) => {
        return state.negocios
      })

    const negocioUser = negocios.filter((negocio) => {
    return negocio.nome_da_pagina === nome_negocio
    })

    const unidades = useSelector((state) => {
        return state.unidades
    })

    const unidadesNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
    })

    const unidadeNegocio = unidadesNegocio.filter((unidad) => {
        return unidad.nome === unidade
    })

    console.log(unidadesNegocio)

//    const list = negocioUser.map((unidade, index) => {
//     return <p key={index}>{unidade}</p>
//    })

    const buscarCep = () => {
        api.get(`https://viacep.com.br/ws/${unidade.cep}/json/`)
        .then((res) => {
        console.log(res.data)
        if(res.data.erro) {
            setErroCep('Cep inválido')
        } else {
            setEndereco(res.data)
        }
        }).catch((err) => {
        console.log(err)
        setErroCep('Cep inválido')
        })
    }

    const salvarUnidade = (nomeUnidade) => {
        if(erroCep) {
          setErro('Digite um cep válido')
        } else {
          let salvar = true
          for (let uni of unidadesNegocio) {
            if (uni.nome.toLowerCase()  === nomeUnidade.toLowerCase()) {
              salvar = false
              console.log('salvar é false')
            }
            console.log('salvar é true')
          }

          if (salvar) {
            console.log(unidade)
            const body = {
              negocio_id: negocioUser[0].id,
              nome: unidade.nome.toLowerCase(),
              link_whatsapp: unidade.link_whatsapp.toLowerCase(),
              contato: unidade.contato,
              cep: endereco.cep,
              rua: endereco.logradouro,
              numero: unidade.numero,
              complemento: unidade.complemento.toLowerCase(),
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf,
            }
            console.log(body)
            api.post('/api/v1/unidade', body, {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            .then((res) => {
              console.log(res.data)
              dispatch(addUnidade(res.data))
              dispatch(getTodasUnidades())
              setUnidade({nome: '', link_whatsapp: '', contato: '', cep: '', numero: '', complemento: ''})
              history.push(`/negocio/${nome_negocio}`)
            }).catch((err) => {
              console.log(err.response.data.errors)
              setErros(err.response.data.errors)
              setErro('Preencha todos os campos obrigatórios')
            })
          } else {
            setErro('Esta unidade já existe')
          }
        }
          
      }

    const voltarTela = () => {
        history.push(`/negocio/${nome_negocio}`)
    }

    const pegarDados = (e) => {
        e.preventDefault();
        setErroCep('')
        setErro('')
        setErros({...erros, [e.target.name]: ''})
        setUnidade({...unidade, [e.target.name]: e.target.value})
      }
    
  return (
    <ContainerNovaUnidade>
      <App>
        {negocioUser.length > 0 &&
        <div className='center'>
            <Link to={`/negocio/${nome_negocio}`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>
            <Capa>
                <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
            </Capa>
            <CriarUnidade>
                <div className='topo'>
                  <h2>Nova Unidade</h2>
                </div>

                <div className='form'>
                  <div className={erros.nome ? 'campo-input contorno-erro': 'campo-input'}>
                    <label>Nome*:</label>
                    <input placeholder='Nome da unidade' value={unidade.nome} name='nome' onChange={pegarDados} autoComplete="none" className='nome'/>
                  </div>

                  <div className='campo-input'>
                    <label>Link do WhatsApp:</label>
                    <input placeholder='https://linkdowhatsapp.com' value={unidade.link_whatsapp.trim()} name='link_whatsapp' onChange={pegarDados} autoComplete="none" className='link-whatsapp'/>
                  </div>

                  <div className='gerar-link'>
                    <a href='https://a.umbler.com/gerador-de-link-whatsapp?gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2KCAz7D_STsAvDcrh97KDPtJkDrChsPuZk9EZWa7sCHIAfmZl7L-UaAt9gEALw_wcB' target='_blank'>Gerar link aqui</a>
                  </div>

                  <div className={erros.contato ? 'campo-input contato contorno-erro': 'campo-input contato'}>
                    <label>Contato*:</label>
                    <InputMask mask="(99)9999-99999" placeholder='(00)0000-00000' value={unidade.contato} name='contato' onChange={pegarDados} autoComplete="none"/>
                  </div>

                  <h5>Endereço</h5>

                  <div className='cep'>

                    <div className={erros.cep ? 'campo-input contorno-erro': 'campo-input'}>
                      <label>Cep*:</label>
                      <InputMask mask="99999-999" placeholder='00000-000' value={unidade.cep} name='cep' onChange={pegarDados} onBlur={buscarCep} autoComplete="none"/>
                    </div>
                    <p className='erro'>{erroCep}</p>

                  </div>

                  <div className='rua-numero'>
                    <div className='campo-input rua'>
                      <label>Rua*:</label>
                      <input placeholder='Av. Brasil' value={endereco.logradouro} autoComplete="none" disabled/>
                    </div>

                    <div className={erros.numero ? 'campo-input numero contorno-erro': 'campo-input numero'}>
                      <label>N°*:</label>
                      <input placeholder='25' value={unidade.numero} name='numero' onChange={pegarDados} autoComplete="none"/>
                    </div>
                  </div>

                  <div className='complemento-bairro'>
                    <div className='campo-input complemento'>
                      <label>Complemento:</label>
                      <input placeholder='Ap 315' name='complemento' onChange={pegarDados} value={unidade.complemento} autoComplete="none"/>
                    </div>

                    <div className='campo-input bairro'>
                      <label>Bairro*:</label>
                      <input placeholder='Centro' value={endereco.bairro} autoComplete="none" disabled/>
                    </div>
                  </div>

                  <div className='cidade-estado'>
                    <div className='campo-input cidade'>
                      <label>Cidade*:</label>
                      <input placeholder='Belo Horizonte' value={endereco.localidade} autoComplete="none" disabled/>
                    </div>

                    <div className='campo-input estado'>
                      <label>UF*:</label>
                      <input placeholder='MG' value={endereco.uf} autoComplete="none" disabled/>
                    </div>
                  </div>
                </div>

                <p className='erro-final'>{erro}</p>

                <div className='botao-salvar'>
                  <button className='botao-sucesso' onClick={() => salvarUnidade(unidade.nome)}>Salvar</button>
                </div>
            </CriarUnidade>
        </div>}
      </App>
    </ContainerNovaUnidade>
  );
}
