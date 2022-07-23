import React, { useState, useEffect } from 'react';
import App from '../layouts/App';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/Users/Users.fetch.actions';
import store from '../store/store';
import IconeSetaDireita from '../imagens/icones/seta-direita.png'
import IconeSetaEsquerda from '../imagens/icones/seta-esquerda.png'
import IconeConfig from '../imagens/icones/config.png'
import api from '../services/api';

const ContainerMeuNegocio = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    padding-bottom: 20px;
    .center {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    button.seta {
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: none;
      padding: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    @media (max-width: 600px) {
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
    .alterar-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%)
    }
    button {
      cursor: pointer;
    }
    #inputImg {
      display: none;
    }
    .titulo-config {
      position: absolute;
      top: 0;
      padding: 0 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
      h1 {
        z-index: 20;
        width: 100%;
        color: white;
        text-shadow: 0 0 5px black;
        text-align: center;
      }
    }
`

const BoxLista = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    max-width: 450px;
    width: 100%;
    h2 {
      text-transform: capitalize;
    }
    .titulo-botao {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        width: 35px;
        height: 35px;
      }
    }
    .img-config {
      width: 30px;
      height: 30px;
      display: flex;
      background-color: transparent;
      border: none;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    @media (max-width: 600px) {
      width: 100%;
      border: none;
      border-radius: 70px 70px 0 0;
      min-height: calc(100vh - 250px - var(--altura-header));
    }
`
const ListUnidades = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: red;
  }
  .link {
    text-decoration: none;
    text-align: center;
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: #141f3687;
    border: none;
    border-bottom: 3px solid red;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .status {
      display: flex;
      justify-content: center;
    }
    h1 {
      margin: 5px;
      text-transform: uppercase;
      font-size: 1.6em;
    }
  }
`
const NaoUnidade = styled.div`
  margin: 30px 0;
  text-align: center;
  button {
    margin: 15px 0;
  }
`

const EditarNegocio = styled.div`

`
const CriarUnidade = styled.div`
  max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
  .topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  h5 {
    border-bottom: 1px solid red;
    font-size: 1em;
    margin: 15px;
  }
  .botao-salvar {
    display: flex;
    justify-content: center;
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
      color: white;
    }
  }
  .gerar-link {
    margin-left: 15px;
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

export default function MeuNegocio() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const { nome_negocio } = useParams()
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [telaEditarNegocio, setTelaEditarNegocio] = useState(false)
    const [telaCriarUnidade, setTelaCriarUnidade] = useState(false)
    const [imagem, setImagem] = useState('')
    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState({})
    const [erro, setErro] = useState('')

      const negocios = useSelector((state) => {
        return state.negocios
      })

      const negocioUser = negocios.filter((negocio) => {
        return negocio.nome_da_pagina === nome_negocio
      })

      const unidades = useSelector((state) => {
        return state.unidades
      })

      const unidadeNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
      })

      const buscarCep = () => {
        api.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
          setEndereco(res.data)
        }).catch((err) => {
          console.log(err)
          setErro('Cep inválido')
        })
      }

      const clicarImg = () => {
        let file = document.getElementById('inputImg')
        file.click();
      }

      const voltarTela = () => {
        setTelaEditarNegocio(false)
        setTelaCriarUnidade(false)
        setImagem('')
      }

      const listUnidades = unidadeNegocio.map((unidade) => {
        return (
        <Link to={`/negocio/${nome_negocio}/${unidade.nome}`} className='link'>
          <div></div>
          <div>
            <h1>{unidade.nome}</h1>
            <div className='status'>
              <p className={unidade.status === 'teste' ? 'teste' : unidade.status === 'ativo' ? 'ativo' : unidade.status === 'atrasado' ? 'atrasado' : unidade.status === 'inativo' ? 'inativo' : unidade.negocio === 'a_vencer' ? 'a-vencer' : '' }>{unidade.status}</p>
            </div>
          </div>
          <img src={IconeSetaDireita}/>
        </Link>
        )
      })
    
  return (
    <ContainerMeuNegocio>
      <App>
        {negocioUser.length > 0&&
        <div className='center'>
            <Capa>
              {telaEditarNegocio ? 
                !imagem ? 
                <div>
                  <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/> 
                  <button onClick={clicarImg} className='alterar-logo'>Alterar Logo</button>
                </div>
                : 
                <div>
                  <img src={URL.createObjectURL(imagem)}/> 
                  <div className='alterar-logo'>
                    <button onClick={() => setImagem('')}>Cancelar</button>
                    <button>Salvar</button>
                  </div>
                </div>
                :
                <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/>
              }
              <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setImagem(e.target.files[0])}/>
            </Capa>
            {telaEditarNegocio ?
              <EditarNegocio>
                <button onClick={voltarTela} className='seta'>
                    <img src={IconeSetaEsquerda} />
                </button>
              </EditarNegocio>
              : telaCriarUnidade ?
              <CriarUnidade>
                <div className='topo'>
                  <button onClick={voltarTela} className='seta'>
                    <img src={IconeSetaEsquerda} />
                  </button>
                  <h2>Nova Unidade</h2>
                  <div></div>
                </div>
                <div className='form'>

                  <div className='campo-input'>
                    <label>Nome:</label>
                    <input placeholder='Nome da unidade'/>
                  </div>

                  <div className='campo-input'>
                    <label>Link do WhatsApp:</label>
                    <input placeholder='https://linkdowhatsapp.com'/>
                  </div>

                  <div className='gerar-link'>
                    <a href='https://a.umbler.com/gerador-de-link-whatsapp?gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2KCAz7D_STsAvDcrh97KDPtJkDrChsPuZk9EZWa7sCHIAfmZl7L-UaAt9gEALw_wcB' target='_blank'>Gerar link aqui</a>
                  </div>

                  <div className='campo-input contato'>
                    <label>Contato:</label>
                    <input placeholder='(00)0000-00000'/>
                  </div>
                  <h5>Endereço</h5>
                  <div className='cep'>
                    <div className='campo-input'>
                      <label>Cep:</label>
                      <input placeholder='00000-000' value={cep} onChange={e => setCep(e.target.value)} onBlur={buscarCep}/>
                    </div>
                  </div>

                  <div className='rua-numero'>
                    <div className='campo-input rua'>
                      <label>Rua:</label>
                      <input placeholder='Av. Brasil' value={endereco.logradouro} disabled/>
                    </div>

                    <div className='campo-input numero'>
                      <label>N°:</label>
                      <input placeholder='25'/>
                    </div>
                  </div>

                  <div className='complemento-bairro'>
                    <div className='campo-input complemento'>
                      <label>Complemento:</label>
                      <input placeholder='Ap 315'/>
                    </div>

                    <div className='campo-input bairro'>
                      <label>Bairro:</label>
                      <input placeholder='Centro' value={endereco.bairro} disabled/>
                    </div>
                  </div>

                  <div className='cidade-estado'>
                    <div className='campo-input cidade'>
                      <label>Cidade:</label>
                      <input placeholder='Belo Horizonte' value={endereco.localidade} disabled/>
                    </div>

                    <div className='campo-input estado'>
                      <label>UF:</label>
                      <input placeholder='MG' value={endereco.uf} disabled/>
                    </div>
                  </div>
                </div>
                <div className='botao-salvar'>
                  <button className='botao-sucesso'>Salvar</button>
                </div>
              </CriarUnidade>
              :
              <BoxLista>
              <div className='titulo-botao'>
                <button onClick={() => setTelaEditarNegocio(true)} className='img-config'>
                  <img src={IconeConfig}/>
                </button>
                <h2>Unidades</h2>
                <button onClick={() => setTelaCriarUnidade(true)} className='botao-sucesso'>+</button>
              </div>
              {unidadeNegocio.length !== 0 ?
                <ListUnidades>
                  {listUnidades}
                </ListUnidades> 
                : 
                <NaoUnidade>
                  <p>Este negócio não possui unidades</p> 
                  <button onClick={() => setTelaCriarUnidade(true)} className='botao-sucesso'>+ Nova Unidade</button>
                </NaoUnidade>
              }
          </BoxLista> 
            }
        </div>}
      </App>
    </ContainerMeuNegocio>
  );
}
