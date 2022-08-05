import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import InputMask from "react-input-mask";
import api from '../../services/api';
import Loading from '../../Components/Loading';
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades, getUnidades } from '../../store/Unidades/Unidades.fetch.actions'

const ContainerEndereco = styled.div`
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

const BoxEndereco = styled.div`
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
export default function EnderecoUnidade() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()
    const [erros, setErros] = useState({})
    const [erroCep, setErroCep] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const [endereco, setEndereco] = useState({})
    let history = useHistory()
    const [unidadee, setUnidadee] = useState({
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

    //retornar somente a unidade da página atual
    const unidadeNegocio = unidadesNegocio.filter((uni) => {
      return uni.nome === unidade
    })

    console.log(unidadesNegocio)

//    const list = negocioUser.map((unidade, index) => {
//     return <p key={index}>{unidade}</p>
//    })

    const buscarCep = () => {
        api.get(`https://viacep.com.br/ws/${unidadee.cep}/json/`)
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

    const salvarUnidade = () => {
      setLoading(true)
        if(erroCep) {
          setErro('Digite um cep válido')
        } else {
          console.log(unidade)
          let body = {}
          if (endereco.cep) {
            body = {
              _method: 'patch',
              cep: endereco.cep,
              rua: endereco.logradouro,
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf,
            }
            if (unidadee.numero) {
              body.numero = unidadee.numero
            }
            if (unidadee.complemento) {
              body.complemento = unidadee.complemento.toLowerCase()
            }
          } else {
            body = {
              _method: 'patch'
            }
            if (unidadee.numero) {
              body.numero = unidadee.numero
            }
            if (unidadee.complemento) {
              body.complemento = unidadee.complemento.toLowerCase()
            }
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
            setUnidadee({cep: '', numero: '', complemento: ''})
            setEndereco({logradouro: '', bairro: '', localidade: '', uf: ''})
          }).catch((err) => {
            console.log(err.response.data.errors)
            setErros(err.response.data.errors)
            setErro('Preencha todos os campos obrigatórios')
          }).finally(() => {
            setLoading(false)
          })
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
        setUnidadee({...unidade, [e.target.name]: e.target.value})
      }
    
  return (
    <ContainerEndereco>
      <App>
        {loading && <Loading />}
        {unidadeNegocio.length > 0 &&
        <div className='center'>
            <Link to={`/negocio/${nome_negocio}/${unidade}/config`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>
            <BoxEndereco>
                <div className='topo'>
                  <h2>Endereço da Unidade</h2>
                </div>

                <div className='form'>

                  <div className='cep'>

                    <div className={erros.cep ? 'campo-input contorno-erro': 'campo-input'}>
                      <label>Cep*:</label>
                      <InputMask mask="99999-999" placeholder={unidadeNegocio[0].cep} value={unidadee.cep} name='cep' onChange={pegarDados} onBlur={buscarCep} autoComplete="none"/>
                    </div>
                    <p className='erro'>{erroCep}</p>

                  </div>

                  <div className='rua-numero'>
                    <div className='campo-input rua'>
                      <label>Rua*:</label>
                      <input placeholder={unidadeNegocio[0].rua} value={endereco.logradouro} autoComplete="none" disabled/>
                    </div>

                    <div className={erros.numero ? 'campo-input numero contorno-erro': 'campo-input numero'}>
                      <label>N°*:</label>
                      <input placeholder={unidadeNegocio[0].numero} value={unidadee.numero} name='numero' onChange={pegarDados} autoComplete="none"/>
                    </div>
                  </div>

                  <div className='complemento-bairro'>
                    <div className='campo-input complemento'>
                      <label>Complemento:</label>
                      <input placeholder={unidadeNegocio[0].complemento} name='complemento' onChange={pegarDados} value={unidadee.complemento} autoComplete="none"/>
                    </div>

                    <div className='campo-input bairro'>
                      <label>Bairro*:</label>
                      <input placeholder={unidadeNegocio[0].bairro} value={endereco.bairro} autoComplete="none" disabled/>
                    </div>
                  </div>

                  <div className='cidade-estado'>
                    <div className='campo-input cidade'>
                      <label>Cidade*:</label>
                      <input placeholder={unidadeNegocio[0].cidade} value={endereco.localidade} autoComplete="none" disabled/>
                    </div>

                    <div className='campo-input estado'>
                      <label>UF*:</label>
                      <input placeholder={unidadeNegocio[0].estado} value={endereco.uf} autoComplete="none" disabled/>
                    </div>
                  </div>
                </div>

                <p className='erro-final'>{erro}</p>

                <div className='botao-salvar'>
                  <button className='botao-sucesso' onClick={() => salvarUnidade()}>Salvar</button>
                </div>
            </BoxEndereco>
        </div>}
      </App>
    </ContainerEndereco>
  );
}
