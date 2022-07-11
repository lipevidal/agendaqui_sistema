import React, {useEffect, useState} from 'react';
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
import NovoNegocio from '../Pages/NovoNegocio';
import { useDispatch } from 'react-redux'
import { deleteFoto, getUser, newPassword, updateTelefone, updateUser } from '../store/Users/Users.fetch.actions';
import store from '../store/store'
import { DetalhesUser } from '../context/UserContext';
import Loading from './Loading';
import Negocios from '../Pages/Negocios';
import MeuNegocio from '../Pages/MeuNegocio';

export default function Routes() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token-agendaqui')
  const user = store.replaceReducer.user
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(token) {
      console.log('Token existe vou chamar a função getUser')
      dispatch(getUser(token))
    } else {
      console.log('Token não existe, não faço requisição')
    }
  }, [])

  return (
    <BrowserRouter>
        {loading ? <Loading /> : ''}
        <Switch>
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
            <Route exact path="/erro" component={Erro} />
        </Switch>
    </BrowserRouter>
  );
}
