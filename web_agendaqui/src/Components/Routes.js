import React, {useEffect, useState, Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Agendamentos from '../Pages/Agendamentos';
import Cadastro from '../Pages/Cadastro';
import Erro from '../Pages/Erro';
import Favoritos from '../Pages/Favoritos';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Perfil from '../Pages/Perfil';
import RecuperarSenha from '../Pages/RecuperarSenha';
import NovoNegocio from '../Pages/Negocios/NovoNegocio';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import { getTodasUnidades } from '../store/Unidades/Unidades.fetch.actions';
import store from '../store/store'
import { DetalhesUser } from '../context/UserContext';
import { addUser } from '../store/Users/Users.actions'
import { getNegocios } from '../store/Negocios/Negocios.fetch.actions'
import Loading from './Loading';
import Negocios from '../Pages/Negocios/Negocios';
import MeuNegocio from '../Pages/Negocios/MeuNegocio';
import Unidades from '../Pages/Unidades/Unidade';
import EditarNegocio from '../Pages/Negocios/EditarNegocio';
import NovaUnidade from '../Pages/Unidades/NovaUnidade';
import api from '../services/api';
import EditarUnidade from '../Pages/Unidades/EditarUnidade';
import ConfigUnidade from '../Pages/Unidades/ConfigUnidade';
import EnderecoUnidade from '../Pages/Unidades/EnderecoUnidade';
import ConfigNegocio from '../Pages/Negocios/ConfigNegocio';
import Servicos from '../Pages/Servicos/Servicos';
import NovoServico from '../Pages/Servicos/NovoServico';

export default function Routes() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token-agendaqui')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(token) {
      setLoading(true)
      console.log('Token existe vou chamar a função getUser')
      const body = {}
      api.post('/api/v1/me', body, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            console.log('Busquei os dados do usuário do token e esta é a minha resposta')
            console.log(res.data)
            console.log('Vou guardar esses dados no store')
            //adiciono o usuario retornado na requisição no store
            dispatch(addUser(res.data))
            console.log('Vou chamar chamar a função get negócios passando o id:')
            console.log(res.data.id)
            console.log('E o token:')
            console.log(token)
            //chamo a requisição pra buscar os negócios
            dispatch(getNegocios(res.data.id, token, res.data))
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
      
    } else {
      console.log('Token não existe, não faço requisição')
      dispatch(getTodasUnidades())
    }
  }, [])

  const user = useSelector((state) => {
    return state.user
  })

  return (
    <BrowserRouter>
        <Switch>
            {loading && <Loading />}
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recuperar-senha" component={RecuperarSenha} />
            {/*<Route exact path="/:token" component={Home} />*/}
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/perfil" component={Perfil} />
            <PrivateRoute exact path="/favorito" component={Favoritos} />
            <PrivateRoute exact path="/agendamento" component={Agendamentos} />
            <PrivateRoute exact path="/novo-negocio" component={NovoNegocio} />
            <PrivateRoute exact path="/negocios" component={Negocios} />
            <PrivateRoute exact path="/negocio/:nome_negocio" component={MeuNegocio} />
            <PrivateRoute exact path="/negocio/:nome_negocio/config" component={ConfigNegocio} />
            <PrivateRoute exact path="/negocio/:nome_negocio/nova-unidade" component={NovaUnidade} />
            <PrivateRoute exact path="/negocio/editar/:nome_negocio" component={EditarNegocio} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade" component={Unidades} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade/servicos" component={Servicos} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade/novo-servico" component={NovoServico} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade/editar" component={EditarUnidade} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade/endereco" component={EnderecoUnidade} />
            <PrivateRoute exact path="/negocio/:nome_negocio/:unidade/config" component={ConfigUnidade} />
            <Route exact path="/erro" component={Erro} />
        </Switch>
    </BrowserRouter>
  );
}
