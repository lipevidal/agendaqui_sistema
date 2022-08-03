import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Negocios from '../Pages/Negocios/Negocios';
import Logo_agendaqui_laranja from '../imagens/logo_agendaqui/logo-agendaqui-laranja.png'
import FotoPerfilPadrao from '../imagens/perfilneutra.jpg'
import IconeSino from '../imagens/icones/bell.png'
import IconeCalendario from '../imagens/icones/calendario.png'
import IconeEstrela from '../imagens/icones/estrela.png'
import IconeHome from '../imagens/icones/home.png'
import IconeMaleta from '../imagens/icones/maleta.png'
import IconeLogin from '../imagens/icones/login.png'
import IconeUser from '../imagens/icones/user.png'
import IconeAfiliado from '../imagens/icones/afiliado.png'
import IconeSair from '../imagens/icones/sair.png'
import IconePortalAfiliado from '../imagens/icones/portal-afiliado.png'
import api from '../services/api';

const ContainerHeader = styled.div`
    color: #ececf6;
    background-color: #141f36;
    display: flex;
    position: fixed;
    top: 0;
    height: var(--altura-header);
    width: 100%;
    z-index: 2000;
    button {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }
`

const Cabecalho = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Logo = styled.div`
    width: 150px;
    cursor: pointer;
    img {
        width: 100%;
    }
`

const Links = styled.nav`
display: flex;
color: white;
margin: 0 15px;
text-decoration: none;
.box-icone {
    text-decoration: none;
}
.web {
    color: white;
    margin: 0 10px;
    &:hover {
        color: #F2272C;
    }
}
.mobile {
    display: none;
    width: 25px;
}

@media (max-width: 650px) {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 200;
    max-width: 650px;
    width: 100%;
    margin-left: -1px;
    background-color: var(--cor-bg-escura);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 -5px 10px 0.6px black;
    .mobile {
        display: flex;
    }
    .web {
        display: none;
    }
}

`

const Perfil = styled.div`
display: flex;
position: relative;
.perfil {
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    /* background-image: url('img/perfilneutra.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; */
    border: none;
    cursor: pointer;
    margin: 15px;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
}
.login {
    font-size: 0.9em;
    text-decoration: none;
    text-align: center;
    color: #F2272C;
    display: flex;
    align-items: center;
    img {
        width: 15px;
        margin: 0 5px;
    }
} 
.icone {
    width: 30px;
    margin: 15px;
    cursor: pointer;
    img {
        width: 80%;
        &:hover {
            width: 100%;
        }
    }
}
.BoxTollbarPerfil {
position: absolute;
top: var(--altura-header);
right: 0;
width: 250px;
background-color: white;
}
button {
    width: 100%;
}
.link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    letter-spacing: 0.1em;
    padding: 15px 10px;
    border-bottom: 1px solid #ccc;
    &:hover {
        background-color: #ccc;
    }
}
.sair {
    color: #F2272C;
}
.imagem {
        width: 25px;
        height: 25px;
        margin-right: 15px;
        img {
            width: 100%;
            height: 100%;
        }
    }
`
const BoxAdm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: calc(var(--altura-header) + 5px);
    right: 10px;
    background-color: red;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    button {
        width: 100%;
        height: 100%;
        color: white;
        font-size: 1.5em;
    }
`

export default function Header(props) {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [boxPerfil, setBoxPerfil] = useState(false)

    const user = useSelector((state) => {
        return state.user
    })

  const abrirPerfil = () => {
    setBoxPerfil(true)
  }

  const fecharPerfil = () => {
    if(boxPerfil) {
        setBoxPerfil(false)
    }
  }

  const abrirFecharPerfil = () => {
    if (boxPerfil) {
        setBoxPerfil(false)
    } else {
        setBoxPerfil(true)
    }
  }

  const logout = () => {
    const token = localStorage.getItem('token-agendaqui')
    const body = {}
      api.post('/api/v1/logout', body, {
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
        localStorage.removeItem('token-agendaqui')
        window.location.href = 'http://localhost:3000/login'
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem('token-agendaqui')
        window.location.href = 'http://localhost:3000/login'
      })
}

    
  return (
    <ContainerHeader>
            <div className='center'>
                <Cabecalho>
                    <Logo>
                        <Link to="/">
                            <img src={Logo_agendaqui_laranja} />
                        </Link>
                    </Logo>

                    <Links>
                        <Link to="/" className='box-icone'>
                            <img src={IconeHome} className='mobile' />
                            <p className='web'>Home</p>
                        </Link>

                        <Link to="/favorito" className='box-icone'>
                            <img src={IconeEstrela} className='mobile' />
                            <p className='web'>Favoritos</p>
                        </Link>

                        <Link to="/agendamento" className='box-icone'>
                            <img src={IconeCalendario} className='mobile' />
                            <p className='web'>Agendamentos</p>
                        </Link>

                        <Link to="/negocios" className='box-icone'>
                            <img src={IconeMaleta} className='mobile' />
                            <p className='web'>Negócios</p>
                        </Link>
                    </Links>

                    <Perfil>
                        {token ?
                        <button className='icone shake-top'>
                            <img src={IconeSino}/>
                        </button> : ''
                        }
                        {token ? 
                            <button onMouseOver={abrirPerfil} onClick={abrirFecharPerfil} className='perfil'>
                                {user.foto_do_perfil ? 
                                <img src={`${urlBase}/storage/${user.foto_do_perfil}`}/>
                                : <img src={FotoPerfilPadrao}/>
                                }
                            </button> 
                            : 
                            <Link to='/login' className='login'>Entrar<img src={IconeLogin}/></Link>
                        }
                        {boxPerfil ?
                            <div className='BoxTollbarPerfil' onMouseOver={abrirPerfil} onMouseOut={fecharPerfil}>
                                <Link to="/perfil" className='link'><div className='imagem'><img src={IconeUser}/></div>Perfil</Link>
                                {user.afiliado ? 
                                    <Link className='link'>
                                        <div className='imagem'>
                                            <img src={IconePortalAfiliado}/>
                                        </div>
                                        Portal do afiliado
                                    </Link> : 
                                    <Link className='link'>
                                        <div className='imagem'>
                                            <img src={IconeAfiliado}/>
                                        </div>
                                        Seja um afiliado
                                    </Link>
                                }
                                <button onClick={logout} className='link sair'><div className='imagem'><img src={IconeSair}/></div>Sair</button>
                            </div>: ''
                        }
                    </Perfil>

                </Cabecalho>
            </div>
            {user.adm ? <BoxAdm>
                <button>+</button>
            </BoxAdm> : ''}
    </ContainerHeader>
  );
}
