import Negocios from "../../Pages/Negocios";
import api from "../../services/api";
import store from '../store'
import { addUnidades, addTodasUnidades } from "./Unidades.actions";

const token = localStorage.getItem('token-agendaqui')
const user = store.replaceReducer.user

export const getUnidades = (dadosNegocio, token) => {
    return (dispatch) => {
        api.get(`/api/v1/unidade`, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            console.log('Dados da requisição getUnidades res.data')
            console.log(res.data)

            const todoUnidades = res.data.map((unidade) => {
                return unidade
            })
            console.log('Todas as unidades')
            console.log(todoUnidades)
            dispatch(addTodasUnidades(todoUnidades))

            const unidades = todoUnidades.filter((unidade) => {
                const negocio = dadosNegocio.filter((negocio) => {
                    return negocio.id === unidade.negocio_id
                })
                return negocio
            })
            console.log('Unidades')
            console.log(unidades)
            dispatch(addUnidades(unidades))
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const getTodasUnidades = () => {
    return (dispatch) => {
        api.get(`/api/unidade`, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
        }).then((res) => {
            console.log('Dados da requisição getUnidades res.data')
            console.log(res.data)
            dispatch(addTodasUnidades(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}

//dispatch(addNegocios(res.data))

// export const postNegocios = (dados) => {
//     return (dispatch) => {
//         api.post('/api/v1/negocio', dados, {
//         headers: {
//             'Accept' : 'application/json',
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`
//         }
//         }).then((res) => {
//             console.log(res.data)
//             dispatch(addNegocio(res.data))
//         }).catch((err) => {
//             console.log(err.response)
//         })
//     }
// }