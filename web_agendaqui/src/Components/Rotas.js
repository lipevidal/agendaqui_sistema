import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import RecuperarSenha from '../Pages/RecuperarSenha';

export default function Rotas() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recuperar-senha" component={RecuperarSenha} />
            <Route exact path="/:token" component={Home} />
            <Route exact path="/" component={Home} />
        </Switch>
    </BrowserRouter>
  );
}
