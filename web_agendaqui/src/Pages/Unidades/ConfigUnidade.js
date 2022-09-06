import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import IconeEdit from '../../imagens/icones/edit.png'
import IconePlano from '../../imagens/icones/list-check.png'
import IconeEndereco from '../../imagens/icones/map-marker.png'
import InputMask from "react-input-mask";
import api from '../../services/api';
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades } from '../../store/Unidades/Unidades.fetch.actions'

const ContainerConfigUnidade = styled.div`
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

const Links = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  a {
    display: flex;
    padding: 10px;
    align-items: center;
    margin: 10px;
    text-decoration: none;
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    max-width: 300px;
    width: 100%;
    height: 80px;
    background-color: #141f36;
    .img {
      width: 60px;
      height: 60px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      img {
        width: 70%;
        height: 70%;
      }
    }
    p {
      margin: 10px;
    }
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
export default function ConfigUnidade() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const { nome_negocio } = useParams()
    const { unidade } = useParams()
    const [erros, setErros] = useState({})
    const [erroCep, setErroCep] = useState('')
    const [erro, setErro] = useState('')
    const [endereco, setEndereco] = useState({})
    let history = useHistory()
    const [unidadee, setUnidade] = useState({
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
    <ContainerConfigUnidade>
      <App>
        {negocioUser.length > 0 &&
        <div className='center'>
            <Link to={`/negocio/${nome_negocio}/${unidade}`} className='seta'>
              <img src={IconeSetaEsquerda} />
            </Link>
            
            <Links>
              <Link to={`/negocio/${nome_negocio}/${unidade}/editar`} className='box'>
                <div className='img'>
                  <img src={IconeEdit}/>
                </div>
                <p>Editar Dados da Unidade</p>
              </Link>

              <Link to={`/negocio/${nome_negocio}/${unidade}/endereco`} className='box'>
                <div className='img'>
                  <img src={IconeEndereco}/>
                </div>
                <p>Editar Endereço da Unidade</p>
              </Link>

              <Link className='box'>
                <div className='img'>
                  <img src={IconePlano}/>
                </div>
                <p>Plano da Unidade</p>
              </Link>
            </Links>
        </div>}
      </App>
    </ContainerConfigUnidade>
  );
}
