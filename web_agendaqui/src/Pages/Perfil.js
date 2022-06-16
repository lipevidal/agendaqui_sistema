import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import App from '../layouts/App';
import { Link } from 'react-router-dom';
import ImagemPadrao from '../imagens/perfilneutra.jpg'
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Codigos from '../Components/Codigos';
import NovaSenha from '../Components/NovaSenha';

const iconeLapis = <FontAwesomeIcon icon={faPencil} className='icone-lapis'/>
const iconeSeta = <FontAwesomeIcon icon={faArrowLeftLong} className='icone-seta'/>

const ContainerPerfil = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    .botao-icone-seta {
        background-color: transparent;
        border: none;
        outline: none;
        .icone-seta {
            font-size: 2em;
            margin: 5px;
            color: white;
        }
    }
    .box-perfil {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-bottom: 60px;
        .box-imagem {
            margin: 20px;
            width: 120px;
            height: 120px;
            background-color: #eee;
            border-radius: 50%;
            box-shadow: 0 0 5px #000;
            background-image: url(ImagemPadrao);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                cursor: pointer;
            }
        }
        input#inputImg {
            display:none;
        }
        button.del {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            margin-top: -10px;
            cursor: pointer;
        }
        .box-inputs {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          padding-bottom: 25px;
          position: relative;
          .box-input-nome {
            position: relative;
            margin-top: 15px;
            input#nomeDesabilitado, input#nomeHabilitado {
                font-size: 2em;
                text-align: center;
                border: none;
                color: white;
                outline: none;
                max-width: 250px;
                width: 100%;
            }
            input#nomeHabilitado {
                color: black;
            }
            button {
                position: absolute;
                top: 8px;
                right: 5px;
                background-color: transparent;
                border: none;
                outline: none;
                cursor: pointer;
            }
          }
          .box-telefone {
            display: flex;
            align-items: center;
            margin: 10px;
            p.tel {
                margin: 0 15px;
                font-size: 1.3em;
            }
            button {
                background-color: transparent;
                border-radius: 50%;
                padding: 8px;
                border: 1px solid white;
                color: white;
                cursor: pointer;
            }
          }
          .box-input-email {
            margin: 10px;
            display: flex;
            align-items: center;
            input {
                background-color: transparent;
                border: none;
                border-bottom: 1px solid orange;
                text-align: center;
                margin: 0 15px;
                color: white;
                font-size: 1.2em;
                outline: none;
            }
            button {
                background-color: transparent;
                border-radius: 50%;
                padding: 8px;
                border: 1px solid white;
                color: white;
                cursor: pointer;
            }
          }
          /* input {
            font-size: 1.1em;
            width: 250px;
            padding: 10px 15px;
            letter-spacing: 2px;
            background-color: #ffffff;
            border-radius: 10px;
            outline: none;
            color: #000;
            border: none;
          } */
          button.rec {
            color: #ececf6;
            margin:10px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
                color: white;
                text-decoration: none;
            }
          }
          button.sal, button.sair {
            background-color: #369a5d;
            padding: 10px;
            margin: 10px;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button.sair {
            background-color: #1b5cdc;
          }
        }
    }
    .box-definir-novo-telefone, .box-confirmar-codigo, .box-nova-senha {
        min-height: calc(100vh - 50px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input {
            width: 150px;
            font-size: 1.1em;
            text-align: center;
            padding: 10px 15px;
            margin: 15px;
            letter-spacing: 2px;
            background-color: white;
            border-radius: 10px;
            outline: none;
            color: #000;
            border: none;
        }
        button {
            background-color: #369a5d;
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
    .box-nova-senha {
        input {
            width: 250px;
        }
    }
    p.erro-nome {
        font-size: .8em;
        color: red;
        text-align: center;
    }
    p.erro {
        font-size: .8em;
        color: red;
        margin-top: -10px;
    }
`

export default function Perfil() {
    const [user, setUser] = useState('')
    const [id, setId] = useState('')
    const [imagem, setImagem] = useState('')
    const [imagemBE, setImagemBE] = useState('')
    const [imagemPadrao, setImagemPadrao] = useState(ImagemPadrao)
    const [nome, setNome] = useState(''.trim())
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaRepetida, setSenhaRepetida] = useState('')
    const [repitaSenha, setRepitaSenha] = useState('')
    const [codigo, setCodigo] = useState(0)
    const [erro, setErro] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [paginaCodigo, setPaginaCodigo] = useState(false)
    const [verificaCodigo, setVerificaCodigo] = useState('')
    const [erroEmail, setErroEmail] = useState('')
    const [erroNome, setErroNome] = useState('')
    const [erroTelefone, setErroTelefone] = useState('')
    const [erroSenha, setErroSenha] = useState('')
    const [novoTelefone, setNovoTelefone] = useState('')
    const [confirmacaoCodigo, setConfirmacaoCodigo] = useState()
    const [mudarNome, setMudarNome] = useState(false)
    const [telaDefinirNovaSenha, setTelaDefinirNovaSenha] = useState(false)
    const [telaAlterarTelefone, setTelaAlterarTelefone] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
          const tkn = localStorage.getItem('token-agendaqui')
          setToken(tkn)
          console.log(token)
          const body = {}
          axios.post('http://localhost:8000/api/v1/me', body, {
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tkn}`
            }
          }).then((response) => {
            console.log(response)
            setUser(response.data)
            setNome(response.data.nome)
            setEmail(response.data.email)
            setTelefone(response.data.telefone)
            if(response.data.foto_do_perfil) {
                setImagem(`http://localhost:8000/storage/${response.data.foto_do_perfil}`)
                setImagemBE(`http://localhost:8000/storage/${response.data.foto_do_perfil}`)
            } else {
                setImagem('')
                setImagemBE('')
            }
            setId(response.data.id)
          }).catch((err) => {
            console.log(err)
          })
          console.log(imagem)
    }, [telaAlterarTelefone])

    const gerarCodigo = () => {
         
        const body = {
            nome: 'fthfhvhjffjhvjhusiawgdwjxjsopucxsfxcshxask',
            email: 'fthfhvhjffjhvjhusiawgdwjxjsopucxsfxcshxask@agendaqui.com',
            telefone: novoTelefone,
            password: 'fghfjh',
            codigo: codigo,
        }
    
        axios.post('http://localhost:8000/api/user', body, {
            headers: {
            'Accept': 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            setCodigo(response.data)
        }).catch((err) => {
            console.log(err.response.data.errors.telefone)
            setErro(err.response.data.errors.telefone)
        })
        
    }

    const atualizarTelefone = () => {
        setErro('')
        if(codigo != confirmacaoCodigo) {
          setErro('Código incorreto')
        } else {
          const body = {
            nome: nome,
            email: email,
            telefone: novoTelefone,
            imagem_do_perfil: imagem
          }
          axios.patch(`http://localhost:8000/api/user/${id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((response) => {
            console.log(response.data)
            setTelaAlterarTelefone(false)
            //let tel = telefone.replace(/[^0-9]/g,'')
          }).catch((err) => {
            console.log(err.response)
            setErro(err.response.data.errors.password)
          })
        }
    }

    const atualizarDadosUsuario = () => {
        setErro('')
        let formData = new FormData();
        formData.append('_method', 'patch')
        formData.append('nome', nome)
        formData.append('email', email)
        formData.append('telefone', telefone)
        if(imagem && imagem !== imagemBE) {
            formData.append('foto_do_perfil', imagem)
        }
        
        axios.post(`http://localhost:8000/api/user/${id}`, formData, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
            console.log(response.data)
            document.location.reload(true);
        }).catch((err) => {
            console.log(err.response)
            setErroNome(err.response.data.errors.nome)
            setErroEmail(err.response.data.errors.email)
        })
    }

    const excluirPhoto = () => {
        if(imagem === imagemBE) {
            //Excluir do banco de dados
            setErro('')
            let formData = new FormData();
            formData.append('_method', 'patch')
            formData.append('foto_do_perfil', '')
            formData.append('excluir', true)
            
            axios.post(`http://localhost:8000/api/user/${id}`, formData, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            }).then((response) => {
                console.log(response.data)
                document.location.reload(true);
            }).catch((err) => {
                console.log(err.response)
            })
            } else {
                document.location.reload(true);
            }
    }

    const logout = () => {
        localStorage.removeItem('token-agendaqui')
        const body = {}
          axios.post('http://localhost:8000/api/v1/logout', body, {
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((response) => {
            console.log(response)
            window.location.href = 'http://localhost:3000/login'
          }).catch((err) => {
            window.location.href = 'http://localhost:3000/login'
            console.log(err)
          })
    }

    const novaSenha = () => {
        setErro('')
        if(senha !== senhaRepetida) {
          setErro('As senhas não correspondem')
        } else {
          const body = {
            nome: nome,
            email: email,
            telefone: telefone,
            password: senha,
          }
          axios.put(`http://localhost:8000/api/user/${id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((response) => {
            console.log(response.data)
            window.location.href = 'http://localhost:3000/perfil'
          }).catch((err) => {
            console.log(err.response.data.errors)
            setErro(err.response.data.errors.password)
          })
        }
      
    }

    const clicarImg = () => {
        let file = document.getElementById('inputImg')
        file.click();
    }

    const editarNome = () => {
        if(mudarNome) {
            setMudarNome(false)
        } else {
            setMudarNome(true)
        }
    }

    const voltarTela = () => {
        setTelaAlterarTelefone(false)
        setTelaDefinirNovaSenha(false)
    }

    const irTelaTelefone = () => {
        setTelaAlterarTelefone(true)
    }

    const irTelaDefinirNovaSenha = () => {
        setTelaDefinirNovaSenha(true)
    }

    const pegarNome = (event) => {
        setNome(event.target.value)
        setErroNome('')
    }

    const pegarEmail = (event) => {
        setEmail(event.target.value)
        setErroEmail('')
    }

    const pegarSenha = (event) => {
        setSenha(event.target.value)
        setErroSenha('')
    }

    const pegarRepitaSenha = (event) => {
        setSenhaRepetida(event.target.value)
        setMensagemErro('')
    }

    const pegarConfirmacaoCodigo = (event) => {
        setConfirmacaoCodigo(event.target.value)
        setMensagemErro('')
    }

    const pegarNovoTelefone = (event) => {
        setErro('')
        setNovoTelefone(event.target.value)
    } 

  return (
    <ContainerPerfil>
        <App>
            <div className='center'>
                {telaAlterarTelefone || telaDefinirNovaSenha ? 
                    <button onClick={voltarTela} className='botao-icone-seta'>
                        {iconeSeta}
                    </button>
                : ''}
                {telaAlterarTelefone || telaDefinirNovaSenha ? telaAlterarTelefone ?
                codigo ? 
                <div className='box-confirmar-codigo'>
                    <Codigos 
                        numeroTelefoneEmail={novoTelefone}
                        mensagemErro={erro}
                        atualizarSenha={() => atualizarTelefone()}
                        verificacaoCodigo={pegarConfirmacaoCodigo}
                        valorCodigo={confirmacaoCodigo}
                        nomeUsuario={nome}
                    /> 
                </div>
                :
                <div className='box-definir-novo-telefone'>
                    <p>Defina um novo número de telefone</p>
                    <InputMask mask="(99)99999-9999" value={novoTelefone} onChange={pegarNovoTelefone} placeholder='Novo telefone'/>
                    <p className='erro'>{erro}</p>
                    <button onClick={gerarCodigo}>Enviar</button>
                </div> 
                : 
                telaDefinirNovaSenha ? 
                <div className='box-nova-senha'>
                    <NovaSenha 
                        nomeUsuario={nome}
                        valorSenha={senha}
                        mensagemErro={erro}
                        valorRepitaSenha={senhaRepetida}
                        onchangePegarSenha={pegarSenha}
                        onchangePegarSenhaRepetida={pegarRepitaSenha}
                        atualizarSenha={() => novaSenha()}
                    />
                </div>
                : 
                ''
                : 
                <div className='box-perfil'>
                    <div className='box-imagem'>
                        { imagem ? imagemBE === imagem ? 
                            <img src={imagem} alt="ImagemAb" onClick={clicarImg}/> 
                            : 
                            <img src={URL.createObjectURL(imagem)} alt="Imagem" onClick={clicarImg}/> 
                            : 
                            <img src={imagemPadrao} alt="Selecione uma imagem" onClick={clicarImg} />
                        }
                    </div>
                    <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setImagem(e.target.files[0])}/>
                    { imagem ? <button onClick={excluirPhoto} className='del'>Excluir</button> : '' }
                    <div className='box-inputs'>
                        <div className='box-input-nome'>
                            {mudarNome ? <input id='nomeHabilitado' value={nome} onChange={pegarNome} placeholder='Nome' autoComplete='none' onBlur={editarNome} /> : <input id='nomeDesabilitado' value={nome} onChange={pegarNome} placeholder='Nome' autoComplete='none' disabled />}
                            <button onClick={editarNome}>{iconeLapis}</button>
                        </div>
                        <p className='erro-nome'>{erroNome}</p>
                        <div className='box-telefone'>
                            <p>Telefone:</p>
                            <p className='tel'>{telefone}</p>
                            <button onClick={irTelaTelefone}>{iconeLapis}</button>
                        </div> 
                        <div className='box-input-email'>
                            <p>Email:</p>
                            <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete='none'/>
                        </div>
                        <p className='erro'>{erroEmail}</p>
                        <button onClick={irTelaDefinirNovaSenha} className='rec'>Alterar a Senha</button> 
                        <button onClick={atualizarDadosUsuario} className='sal'>Salvar</button>
                        <button onClick={logout} className='sair'>Sair</button>  
                    </div>
                </div>
                }
            </div>
      </App>
    </ContainerPerfil>
  );
}
