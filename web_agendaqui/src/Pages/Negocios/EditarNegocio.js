import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import InputMask from "react-input-mask";
import { addUnidade } from '../../store/Unidades/Unidades.actions'
import { getTodasUnidades } from '../../store/Unidades/Unidades.fetch.actions'
import { getNegocios } from '../../store/Negocios/Negocios.fetch.actions'
import { getUser } from '../../store/Users/Users.fetch.actions';
import store from '../../store/store';
import IconeSetaDireita from '../../imagens/icones/seta-direita.png'
import IconeSetaEsquerda from '../../imagens/icones/seta-esquerda.png'
import api from '../../services/api';
import { addNegocios } from '../../store/Negocios/Negocios.actions';
import Loading from '../../Components/Loading';

const ContainerEditarNegocio = styled.div`
  background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    padding-bottom: 20px;
  .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    a.seta {
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
  .erro {
    font-size: 0.8em;
    margin-bottom: 10px;
    color: red;
  }
  .botao-excluir {
    margin: 20px;
    cursor: pointer;
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
const EdicaoNegocio = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        width: 100%;
        text-align: center;
    }
`
const FormEdicao = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  .campo-input {
    background-color: white;
    background-color: var(--cor-bg-escura);
    display: flex;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    margin: 10px 0;
    .nome, .categoria {
        text-transform: capitalize;
    }
    .nome-pagina {
        text-transform: lowercase;
    }
    label {
      color: orange;
      border-radius: 10px 0 0 10px;
      padding: 10px;
      margin-right: 15px;
      white-space: nowrap;
    }
    input {
      background-color: #ccc;
      width: 100%;
      padding: 10px;
      border-radius: 0 10px 10px 0;
      border: none;
      color: black;
    }
    input::placeholder {
      color: #555;
    }
  }
`
const PopUp = styled.div`
width: 100%;
height: 100vh;
background-color: rgba(0, 0, 0, 0.8);
position: fixed;
top: 0;
left: 0;
z-index: 10000;
display: flex;
justify-content: center;
align-items: center;
.box-popup {
  width: 280px;
  background-color: white;
  border-radius: 10px;
  padding-bottom: 10px;
}
.btn {
  text-align: right;
  padding: 10px;
  button {
    color: red;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
p {
  color: black;
  padding: 10px;
  text-align: center;
}
.botoes {
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
    padding: 3px 5px;
    border-radius: 5px;
    border: none;
    color: white;
  }
  .sim {
    background-color: #369a5d;
  }
  .nao {
    background-color: #df484a;
  }
}
`

export default function EditarNegocio() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token-agendaqui')
    const { nome_negocio } = useParams()
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [telaEditarNegocio, setTelaEditarNegocio] = useState(false)
    const [telaCriarUnidade, setTelaCriarUnidade] = useState(false)
    const [imagem, setImagem] = useState('')
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState({})
    const [loading, setLoading] = useState(false)
    const [erroCep, setErroCep] = useState('')
    const [erro, setErro] = useState('')
    const [erros, setErros] = useState({})
    const [popUp, setPopUp] = useState(false)
    const [unidade, setUnidade] = useState({
      nome: '',
      link_whatsapp: '',
      contato: '',
      cep: '',
      numero: '',
      complemento: ''
    })
    const [editNegocio, setEditNegocio] = useState({
      logo: '',
      nome: '',
      categoria: '',
      nome_da_pagina: '',
    })

    let history = useHistory()

      //retorna os dados do usuario logado da store
      const user = useSelector((state) => {
        return state.user
      })

      //retorna todos os negocios do usuário logado que esta na store
      const negocios = useSelector((state) => {
        return state.negocios
      })

      //retorna somente o negocio da página atual
      let negocioUser = negocios.filter((negocio) => {
        return negocio.nome_da_pagina === nome_negocio
      })

      //retorna todos as unidades do usuario que esta na store
      const unidades = useSelector((state) => {
        return state.unidades
      })

      //retorna somente as unidades do negocio da página atual
      const unidadeNegocio = unidades.filter((unidade) => {
        return unidade.negocio_id === negocioUser[0].id
      })

      const atualizarNegocio = () => {
        setErro('')
        let salvar = true
        for (let neg of negocios) {
            if (neg.nome.toLowerCase()  === editNegocio.nome.toLowerCase()) {
                salvar = false
            }
        }
        if (salvar) {

            let formData = new FormData();
            formData.append('_method', 'patch')
            if(editNegocio.nome) {
                formData.append('nome', editNegocio.nome.toLowerCase())
            }
            if(editNegocio.categoria) {
                formData.append('categoria', editNegocio.categoria.toLowerCase())
            }
            if(editNegocio.nome_da_pagina) {
                formData.append('nome_da_pagina', editNegocio.nome_da_pagina.toLowerCase())
            }
            if(imagem) {
                formData.append('logo', imagem)
            }
            api.post(`/api/v1/negocio/${negocioUser[0].id}`, formData, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            }).then((res) => {
                console.log(res)
                dispatch(getNegocios(user.id, token))
                if (editNegocio.nome_da_pagina) {
                history.push(`/negocio/editar/${res.data.nome_da_pagina}`)
                document.location.reload(true);
                }
                setEditNegocio({logo: '', nome: '', categoria: '', nome_da_pagina: ''})
                //dispatch(putUser(res.data))
                //setNome('')
                //setAlterarNome('')
            }).catch((err) => {
                console.log(err.response.data)
                setErros(err.response.data.errors)
                //setErroNome(err.response.data.errors.nome)
            })

        } else {
            setErro('Este negocio já existe')
        }
      }

      const excluirNegocio = () => {
        setLoading(true)
        api.delete(`/api/v1/negocio/${negocioUser[0].id}`, {
          headers: {
              'Accept' : 'application/json',
              'Authorization': `Bearer ${token}`
          }
          }).then((res) => {
              const negociosAtualizados = negocios.filter((negocio) => {
                return negocio.id !== negocioUser[0].id
              })
              dispatch(addNegocios(negociosAtualizados))
              history.push('/negocios')
          }).catch((err) => {
              console.log(err.response.data)
              setErros(err.response.data.errors)
              //setErroNome(err.response.data.errors.nome)
          }).finally(() => {
            setLoading(false)
        })
      }

      const clicarImg = () => {
        let file = document.getElementById('inputImg')
        file.click();
      }

      const pegarAtualizacao = (e) => {
        setErro('')
        setErros({})
        e.preventDefault();
        setEditNegocio({...editNegocio, [e.target.name]: e.target.value})
      }

      // to={`/negocio/${nome_negocio}/${unidade.nome}`}
    
  return (
    <ContainerEditarNegocio>
      <App>
        {negocioUser.length > 0&&
        <div className='center'>
            {loading && <Loading />}
            <Link to={`/negocio/${nome_negocio}`} className='seta'>
                <img src={IconeSetaEsquerda} />
            </Link>

            <Capa>
                {!imagem ? 
                    <div>
                        <img src={`${urlBase}/storage/${negocioUser[0].logo}`}/> 
                        <button onClick={clicarImg} className='alterar-logo'>Alterar Logo</button>
                    </div>
                    : 
                    <div>
                        <img src={URL.createObjectURL(imagem)}/> 
                        <div className='alterar-logo'>
                            <button onClick={() => setImagem('')}>Cancelar</button>
                        </div>
                    </div>
                }
                <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setImagem(e.target.files[0])}/>
            </Capa>  

            <EdicaoNegocio>


                <h2>Edite seu negócio</h2>

                <FormEdicao>

                    <div className='campo-input'>
                        <label>Nome:</label>
                        <input name='nome' placeholder={negocioUser[0].nome} value={editNegocio.nome} onChange={pegarAtualizacao} className="nome"/>
                    </div>

                    <div className='campo-input'>
                        <label>Categoria:</label>
                        <input name='categoria' placeholder={negocioUser[0].categoria} value={editNegocio.categoria} onChange={pegarAtualizacao} className="categoria"/>
                    </div>

                    <div className='campo-input'>
                        <label>Nome da página:</label>
                        <input name='nome_da_pagina' placeholder={negocioUser[0].nome_da_pagina} value={editNegocio.nome_da_pagina.trim()} onChange={pegarAtualizacao} className="nome-pagina"/>
                    </div>

                </FormEdicao>
            
                <p className='erro'>{erro}</p>
                <p className='erro'>{erros.nome_da_pagina}</p>
                <p className='erro'>{erros.nome}</p>
                <p className='erro'>{erros.categoria}</p>
                <button className='botao-sucesso' onClick={atualizarNegocio}>Atualizar</button>
                <button className='botao-excluir' onClick={() => setPopUp(true)}>Excluir Negócio</button>
            
            </EdicaoNegocio>
            {popUp &&
            <PopUp>
                <div className='box-popup'>
                  <div className='btn'>
                    <button onClick={() => setPopUp(false)}>X</button>
                  </div>
                  {unidadeNegocio.length > 0 ?
                    <p>Este negócio possui unidades, por isso não é possível excluí-lo</p>
                  :
                  <div>
                    <p>Tem certeza que deseja excluir este negócio?</p>
                    <div className='botoes'>
                      <button className='sim' onClick={excluirNegocio}>Sim</button>
                      <button className='nao' onClick={() => setPopUp(false)}>Nao</button>
                    </div>
                  </div>}
                </div>
            </PopUp>}
        </div>}
      </App>
    </ContainerEditarNegocio>
  );
}
