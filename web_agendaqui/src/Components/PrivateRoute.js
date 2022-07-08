import React from "react";
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute(props) {
    const isLogged = !!localStorage.getItem('token-agendaqui')
    return isLogged ? <Route {...props}/> : <Redirect to="/erro"/>
}