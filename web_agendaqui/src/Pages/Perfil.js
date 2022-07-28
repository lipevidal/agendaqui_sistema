import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';
import App from '../layouts/App';
import { Link } from 'react-router-dom';
import ImagemPadrao from '../imagens/perfilneutra.jpg'
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Codigos from '../Components/Codigos';
import NovaSenha from '../Components/NovaSenha';
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import { newSenha, putTelefone, putUser } from '../store/Users/Users.actions'
import { useDispatch, useSelector } from 'react-redux'
import PopUp from '../Components/PopUp';

const iconeLapis = <FontAwesomeIcon icon={faPencil} className='icone-lapis'/>
const iconeSeta = <FontAwesomeIcon icon={faArrowLeftLong} className='icone-seta'/>

const ContainerPerfil = styled.div`
    background-color: #2d3d54;
    min-height: 100vh;
    color: white;
    .box-perfil {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        .box-imagem {
            margin: 15px;
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
        .btn-del-sal {
            margin-top: -10px;
        }
        button.del, button.sal {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            margin-top: -10px;
            padding: 2px;
            margin-left: 3px;
            cursor: pointer;
        }
        button.sal {
            background-color: #369a5d;
        }
    }
    .box-definir-novo-telefone, .box-confirmar-codigo, .box-nova-senha {
        min-height: calc(100vh - var(--altura-header));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .botao-icone-seta {
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            top: 10px;
            left: 5px;
            cursor: pointer;
            .icone-seta {
                font-size: 2em;
                margin: 5px;
                color: white;
            }
        }
        input {
            width: 150px;
            font-size: 1.1em;
            text-align: center;
            padding: 10px 15px;
            margin: 15px;
            letter-spacing: 2px;
            background-color: #141f3687;
            border-radius: 10px;
            outline: none;
            color: #fff;
            border: none;
        }
        input.telefone {
            max-width: 200px;
            width: 100%;
        }
        button.sucesso {
            background-color: #369a5d;
            margin-top: 20px;
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
    @media (max-width: 650px) {
      margin-top: calc(var(--altura-header) - 10px);
      min-height: calc(100vh - var(--altura-header));
    }
`

const BoxInfos = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-bottom: 25px;
    position: relative;
    max-width: 400px;
        width: 100%;
    margin: 15px 0;
    .box-input {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 20px;
        .input-botao {
            width: 70%;
            display: flex;
            align-items: center;
            border-bottom: 2px solid orange;
            padding: 0 10px;
            position: relative;
            button {
                display: flex;
                font-size: 0.5em;
                cursor: pointer;
                background-color: #ffa83f;
                border: none;
                border-radius: 5px;
                padding: 5px;
                margin: 0 3px;
            }
            input {
                text-align: center;
                width: 100%;
                margin: 0 2px;
                font-size: 2em;
                color: white;
                border: none;
                text-transform: capitalize
            }
            input.telefone, input.email, input.nome {
                background-color: transparent;
            }
            input.telefone, input.email {
                font-size: 1.2em;
                text-transform: none;
            }
        }
    }
    button.btn-alterar-senha {
        margin-top: 45px;
        background-color: transparent;
        color: white;
        border: none;
        border-bottom: 3px solid #fff;
        cursor: pointer;
        &:hover {
            border-bottom: none;
        }
    }
          /* p.tel {
            margin: 0 15px;
            font-size: 1.3em;
          }
          .box-input-nome {
            input {
                background-color: transparent;
                border: none;
                border-bottom: 2px solid orange;
                color: white;
            }
            button {
                background-color: transparent;
                border: none;
                outline: none;
                color: white;
                cursor: pointer;
            }
          }
          .box-telefone {
            display: flex;
            align-items: center;
            margin: 10px;
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
          } */
        
`

export default function Perfil(props) {
    const [imagem, setImagem] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [imagemPadrao, setImagemPadrao] = useState(ImagemPadrao)
    const [telefone, setTelefone] = useState('')
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
    const [popUpNome, setPopUpNome] = useState(false)
    const [popUpEmail, setPopUpEmail] = useState(false)
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [alterarNome, setAlterarNome] = useState(false)
    const [alterarEmail, setAlterarEmail] = useState(false)
    const [alterartelefone, setAlterarTelefone] = useState(false)


    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    const gerarCodigo = () => {
         
        const body = {
            nome: 'fthfhvhjffjhvjhusiawgdwjxjsopucxsfxcshxask',
            email: 'fthfhvhjffjhvjhusiawgdwfffffjxjsopucxsfxcshxask@agendaqui.com',
            telefone: novoTelefone,
            password: 'fghfjh',
            codigo: codigo,
        }
    
        api.post('/api/user', body, {
            headers: {
            'Accept': 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            setCodigo(response.data)
            setTelaAlterarTelefone(false)
            setPaginaCodigo(true)
        }).catch((err) => {
            console.log(err.response.data)
            setErro(err.response.data.errors.telefone)
        })
        
    }

    const atualizarTelefone = () => {
        setErro('')
        if(codigo != confirmacaoCodigo) {
          setErro('Código incorreto')
        } else {
          const body = {
            nome: user.nome,
            email: user.email,
            telefone: novoTelefone
          }
          api.patch(`/api/user/${user.id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            dispatch(putTelefone(res.data))
            setPaginaCodigo(false)
            setNovoTelefone('')
          }).catch((err) => {
            console.log(err.response.data)
            setErro(err.response.data.errors.telefone)
          })
        }
    }

    const atualizarEmail = () => {
        setErro('')
          const body = {
            nome: user.nome,
            email: email,
            telefone: user.telefone
          }
          api.patch(`/api/user/${user.id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            dispatch(putUser(res.data))
            setEmail('')
            setAlterarEmail(false)
          }).catch((err) => {
            console.log(err.response.data)
            setErro(err.response.data.errors.email)
          })
    }

    const atualizarFotoUsuario = () => {
        setErro('')
        let formData = new FormData();
        formData.append('_method', 'patch')
        formData.append('nome', user.nome)
        formData.append('email', user.email)
        formData.append('telefone', user.telefone)
        if(imagem && imagem !== user.foto_do_perfil) {
            formData.append('foto_do_perfil', imagem)
        }
        dispatch(updateUser(user.id, formData))
        setImagem('')
    }

    const atualizarNomeUsuario = () => {
        setErroNome('')
        let formData = new FormData();
        formData.append('_method', 'patch')
        formData.append('nome', nome)
        formData.append('email', user.email)
        formData.append('telefone', user.telefone)
        if(imagem && imagem !== user.foto_do_perfil) {
            formData.append('foto_do_perfil', imagem)
        }
        api.post(`/api/user/${user.id}`, formData, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((res) => {
            console.log(res)
            dispatch(putUser(res.data))
            setNome('')
            setAlterarNome('')
        }).catch((err) => {
            console.log(err.response.data)
            setErroNome(err.response.data.errors.nome)
        })
    }

    const excluirPhoto = () => {
        if (imagem) {
            setErro('')
            setImagem('')
            console.log('Entrei no if')
        } else {
            setErro('')
            let formData = new FormData();
            formData.append('_method', 'patch')
            formData.append('foto_do_perfil', '')
            formData.append('excluir', true)
            dispatch(deleteFoto(user.id, formData))
            console.log('Entrei no else')
            setImagem('')
        }
    }

    const logout = () => {
        const token = localStorage.getItem('token-agendaqui')
        const body = {}
          api.post('http://localhost:8000/api/v1/logout', body, {
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((response) => {
            console.log(response)
            localStorage.removeItem('token-agendaqui')
            //window.location.href = 'http://localhost:3000/login'
            props.history.push('/login')
          }).catch((err) => {
            console.log(err)
          })
    }

    const novaSenha = () => {
        setErro('')
        if(senha !== senhaRepetida) {
          setErro('As senhas não correspondem')
        } else {
          const body = {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            password: senha,
          }
          api.put(`/api/user/${user.id}`, body, {
            headers: {
              Accept : 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            dispatch(newSenha(res.data))
            setTelaDefinirNovaSenha(false)
            setSenha('')
            setSenhaRepetida('')
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
        setPaginaCodigo(false)
        setNovoTelefone('')
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
        setErro('')
    }

    const pegarRepitaSenha = (event) => {
        setSenhaRepetida(event.target.value)
        setErro('')
    }

    const pegarConfirmacaoCodigo = (event) => {
        setConfirmacaoCodigo(event.target.value)
        setErro('')
    }

    const pegarNovoTelefone = (event) => {
        setErro('')
        setNovoTelefone(event.target.value)
    }

    const onclickErroNome = () => {
        setAlterarNome(false)
        setNome('')
        setErroNome('')
    }

    const onclickErroEmail = () => {
        setAlterarEmail(false)
        setEmail('')
        setErro('')
    }

    const abrirFecharPopUpNome = () => {
        if(popUpNome) {
            setPopUpNome(false)
        } else {
            setPopUpNome(true)
        }
    }

    const abrirFecharPopUpEmail = () => {
        if(popUpEmail) {
            setPopUpEmail(false)
        } else {
            setPopUpEmail(true)
        }
    }


  return (
    <ContainerPerfil>
        <App>
            <div className='center'>
                {telaAlterarTelefone ? 
                <div className='box-definir-novo-telefone'>
                    <button onClick={voltarTela} className='botao-icone-seta'>
                        {iconeSeta}
                    </button>
                    <p>Defina um novo número de telefone</p>
                    <InputMask className='telefone' mask="(99)99999-9999" value={novoTelefone} onChange={pegarNovoTelefone} placeholder='Novo telefone'/>
                    <p className='erro'>{erro}</p>
                    <button className='sucesso' onClick={gerarCodigo}>Enviar</button>
                </div> : telaDefinirNovaSenha ? 
                <div className='box-nova-senha'>
                    <button onClick={voltarTela} className='botao-icone-seta'>
                        {iconeSeta}
                    </button>
                    <NovaSenha 
                        nomeUsuario={user.nome}
                        valorSenha={senha}
                        mensagemErro={erro}
                        valorRepitaSenha={senhaRepetida}
                        onchangePegarSenha={pegarSenha}
                        onchangePegarSenhaRepetida={pegarRepitaSenha}
                        atualizarSenha={() => novaSenha()}
                    />
                </div> : paginaCodigo ? 
                <div className='box-confirmar-codigo'>
                    <button onClick={voltarTela} className='botao-icone-seta'>
                        {iconeSeta}
                    </button>
                    <Codigos 
                        numeroTelefoneEmail={novoTelefone}
                        mensagemErro={erro}
                        atualizarSenha={() => atualizarTelefone()}
                        verificacaoCodigo={pegarConfirmacaoCodigo}
                        valorCodigo={confirmacaoCodigo}
                        nomeUsuario={nome}
                    /> 
                </div> : 
                <div className='box-perfil'>
                    {popUpNome ? <PopUp onclickFecharPopUp={abrirFecharPopUpNome} value={nome} onchange={pegarNome} erro={erroNome} label="Nome"/> : ''}
                    {popUpEmail ? <PopUp onclickFecharPopUp={abrirFecharPopUpEmail} value={email} onchange={pegarEmail} erro={erroEmail} label="Email"/> : ''}

                    <div className='box-imagem'>
                        {imagem ? <img src={URL.createObjectURL(imagem)} alt="Imagem" onClick={clicarImg}/> :
                        user.foto_do_perfil ? <img src={`${urlBase}/storage/${user.foto_do_perfil}`} alt="ImagemAb" onClick={clicarImg}/> :
                        <img src={imagemPadrao} alt="Selecione uma imagem" onClick={clicarImg} />
                        }
                    </div>
                    <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setImagem(e.target.files[0])}/>

                    { imagem && !user.foto_do_perfil ? 
                        <div className='btn-del-sal'>
                            <button onClick={excluirPhoto} className='del'>Excluir</button> 
                            <button onClick={atualizarFotoUsuario} className='sal'>Salvar</button>
                        </div>: 
                    user.foto_do_perfil && !imagem ?  
                        <button onClick={excluirPhoto} className='del'>Excluir</button> : 
                    imagem && user.foto_do_perfil ? 
                        <div className='btn-del-sal'>
                            <button onClick={excluirPhoto} className='del'>Excluir</button> 
                            <button onClick={atualizarFotoUsuario} className='sal'>Salvar</button>
                        </div> : ''}

                    <BoxInfos>
                        <div className='box-input'>
                            <p>Nome:</p>
                            {!alterarNome ? 
                            <div className='input-botao'>
                                <input value={user.nome} disabled/>
                                <button onClick={() => setAlterarNome(true)}>Editar</button>
                            </div>
                            : 
                            <div className='input-botao'>
                                <input autofocus onChange={pegarNome} className='nome' value={nome} autoComplete="none" autoCorrect='off'/>
                                <button onClick={onclickErroNome}>X</button>
                                <button onClick={atualizarNomeUsuario}>Salvar</button>
                            </div>
                            }
                        </div>
                        <p className='erro'>{erroNome}</p>

                        <div className='box-input'>
                            <p>Telefone:</p>
                            <div className='input-botao'>
                                <input className='telefone' value={user.telefone} disabled/>
                                <button onClick={irTelaTelefone}>Editar</button>
                            </div>
                        </div> 

                        <div className='box-input'>
                            <p>Email:</p>
                            {!alterarEmail ? 
                            <div className='input-botao'>
                                <input className='email' value={user.email} disabled/>
                                <button onClick={() => setAlterarEmail(true)}>Editar</button>
                            </div>
                            : 
                            <div className='input-botao'>
                                <input autofocus onChange={pegarEmail} className='email' value={email} autoComplete="none" autoCorrect='off'/>
                                <button onClick={onclickErroEmail}>X</button>
                                <button onClick={atualizarEmail}>Salvar</button>
                            </div> }
                        </div>
                        <p className='erro'>{erro}</p>

                        <button onClick={irTelaDefinirNovaSenha} className='btn-alterar-senha'>Alterar a Senha</button>
                    </BoxInfos>
                </div>
                }
                
            </div>
      </App>
    </ContainerPerfil>
  );
}
