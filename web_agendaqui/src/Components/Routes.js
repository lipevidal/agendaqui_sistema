import React from 'react';
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

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recuperar-senha" component={RecuperarSenha} />
            {/*<Route exact path="/:token" component={Home} />*/}
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/perfil" component={Perfil} />
            <PrivateRoute exact path="/favorito" component={Favoritos} />
            <PrivateRoute exact path="/agendamento" component={Agendamentos} />
            <Route exact path="/erro" component={Erro} />
        </Switch>
    </BrowserRouter>
  );
}
