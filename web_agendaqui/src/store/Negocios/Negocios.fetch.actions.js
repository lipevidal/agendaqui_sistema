import api from "../../services/api";
import store from '../store'
import { addNegocios } from "./Negocios.actions";

const token = localStorage.getItem('token-agendaqui')
const user = store.replaceReducer.user

export const getNegocios = (user, token) => {
    return (dispatch) => {
        api.get(`/api/v1/negocio?filtroUsuario=user_id:=:${user.id}`, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            dispatch(addNegocios(res.data))
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
}