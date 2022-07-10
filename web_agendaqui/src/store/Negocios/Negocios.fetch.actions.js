import Negocios from "../../Pages/Negocios";
import api from "../../services/api";
import store from '../store'
import { addNegocios, addNegocio } from "./Negocios.actions";
import { getUnidades } from '../Unidades/Unidades.fetch.actions'

const token = localStorage.getItem('token-agendaqui')
const user = store.replaceReducer.user

export const getNegocios = (idUser, token) => {
    return (dispatch) => {
        api.get(`/api/v1/negocio`, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            console.log('Dados da requisição getNegocios res.data')
            console.log(res.data)
            const dados = res.data.filter((negocio) => {
                return negocio.user_id === idUser
            })
            console.log('Vou guardar esses dados no store')
            dispatch(addNegocios(dados))
            dispatch(getUnidades(dados, token))
        }).catch((err) => {
            console.log(err)
        })
    }
}

//dispatch(addNegocios(res.data))

export const postNegocios = (dados) => {
    return (dispatch) => {
        api.post('/api/v1/negocio', dados, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            console.log(res.data)
            dispatch(addNegocio(res.data))
        }).catch((err) => {
            console.log(err.response)
        })
    }
}