import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Negocios from '../Pages/Negocios';
import Logo_agendaqui_laranja from '../imagens/logo_agendaqui/logo-agendaqui-laranja.png'
import IconeSino from '../imagens/icones/bell.png'
import IconeCalendario from '../imagens/icones/calendario.png'
import IconeEstrela from '../imagens/icones/estrela.png'
import IconeHome from '../imagens/icones/home.png'
import IconeMaleta from '../imagens/icones/maleta.png'
import IconeLogin from '../imagens/icones/login.png'

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
`

const BoxNegocio = styled.div`
    position: absolute;
    top: var(--altura-header);
    right: 0;
    max-width: 400px;
    width: 100%;
    height: calc(100vh - var(--altura-header));
    padding: 20px;
    background-color: #ccc;
    box-shadow: -4px 0 15px 0px #000;
`

export default function Header() {
    const token = localStorage.getItem('token-agendaqui')
    const [urlBase, setUrlBase] = useState('http://localhost:8000')
    const [paginaNegocio, setPaginaNegocio] = useState(false)

    const user = useSelector((state) => {
        return state.user
    })

  const abrirFecharAbaNegocio = () => {
    if(paginaNegocio) {
        setPaginaNegocio(false)
    } else {
        setPaginaNegocio(true)
    }
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
                            <Link to="/perfil" className='perfil'>
                                {user.foto_do_perfil ? 
                                <img src={`${urlBase}/storage/${user.foto_do_perfil}`}/>
                                : <img src="img/perfilneutra.jpg"/>
                                }
                            </Link> 
                            : 
                            <Link to='/login' className='login'>Entrar<img src={IconeLogin}/></Link>
                        }
                    </Perfil>

                </Cabecalho>
            </div>
        
    </ContainerHeader>
  );
}
