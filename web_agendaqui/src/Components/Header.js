import React, { useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar, faCalendarDays, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const home = <FontAwesomeIcon icon={faHouse} className='icone'/>
const favorito = <FontAwesomeIcon icon={faStar} className='icone'/>
const agendamento = <FontAwesomeIcon icon={faCalendarDays} className='icone'/>
const negocio = <FontAwesomeIcon icon={faBriefcase} className='icone'/>

const ContainerHeader = styled.div`
    height: 50px;
    background-color: #141f36;
    color: #ececf6;
    width:100%;
    .conteudo-header {
        display: flex;
        justify-content: space-around;
        align-items: center;


        /* .mobile, .web {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .box-icone {
                color: white;
                line-height: 50px;
                margin: 0 15px;
            }
            .perfil {
                height: 1.1em;
                width: 1.1em;
                border-radius: 50%;
                background-color: red;
                background-image: url('img/perfilneutra.jpg');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                border: none;
                cursor: pointer;
            }
            .login {
                font-size: 0.9em;
                text-decoration: none;
                text-align: center;
                color: orange;
            }
        } */
        .box-icone {
            color: white;
            margin: 0 15px;
            text-decoration: none;
            .mobile {
                display: none;
                font-size: 1.2em;
            }
            .web {
                .perfil {
                    font-size: 1.8em;
                }
            }
        }

        .perfil {
            height: 1.4em;
            width: 1.4em;
            border-radius: 50%;
            background-image: url('img/perfilneutra.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border: none;
            cursor: pointer;
        }

        .login {
            font-size: 0.9em;
            text-decoration: none;
            text-align: center;
            color: orange;
        }
        
    }

    /* .box-perfil {
        width: 100%;
        min-height: calc(100vh - 50px);
        background-color: white;
    } */

    @media (max-width: 600px)  {
        position: fixed;
        top: calc(100vh - 50px);
        left: 0;
        .conteudo-header {
            .box-icone {
                .mobile {
                    display: flex;
                }
                .web {
                    display: none;
                }
            }
        }
        .box-perfil {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
`

export default function Header({ token,  onclickMostarPerfil }) {
    const [tkn, setTkn] = useState(token);

    
  return (
    <ContainerHeader>
        <div className='center'>
            <div className='conteudo-header'>

                <Link to={token ? `/${token}` : '/'} className='box-icone'>
                    <p className='web'>Home</p>
                    <p className='mobile'>{home}</p>
                </Link>

                <Link to={token ? `/${token}` : '/'} className='box-icone'>
                    <p className='mobile'>{favorito}</p>
                    <p className='web'>Favoritos</p>
                </Link>

                <Link to={token ? `/${token}` : '/'} className='box-icone'>
                    <p className='mobile'>{agendamento}</p>
                    <p className='web'>Agendamentos</p>
                </Link>

                <Link to={token ? `/${token}` : '/'} className='box-icone'>
                    <p className='mobile'>{negocio}</p>
                    <p className='web'>Negócios</p>
                </Link>

                {token ? 
                    <button onClick={onclickMostarPerfil} className='perfil'></button> 
                    : 
                    <Link to='/login' className='login'>Fazer<br />Login</Link>
                }
                
                {/* <div className='mobile'>
                    <Link to='/' className='box-icone'>
                        {home}
                    </Link>

                    <Link to='/' className='box-icone'>
                        {favorito}
                    </Link>

                    <Link to='/' className='box-icone'>
                        {agendamento}
                    </Link>

                    <Link to='/' className='box-icone'>
                        {negocio}
                    </Link>

                    {token ? <button onClick={props.onclickMostarPerfil} className='box-icone perfil'></button> : <Link to='/login' className='login'>Fazer<br />Login</Link>}
                    
                </div>

                <div className='web'>
                    <Link to='/' className='box-icone'>
                        Home
                    </Link>

                    <Link to='/' className='box-icone'>
                        Favoritos
                    </Link>

                    <Link to='/' className='box-icone'>
                        Agendamentos
                    </Link>

                    <Link to='/' className='box-icone'>
                        Negócios
                    </Link>

                    {token ? <button onClick={props.onclickMostarPerfil} className='box-icone perfil'></button> : <Link to='/login' className='login'>Fazer Login</Link>}
                </div> */}



            </div>
        </div>
    </ContainerHeader>
  );
}
