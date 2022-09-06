import api from "../../services/api";
import store from '../store'
import { addServicos, addServico } from "./Servicos.actions";

const token = localStorage.getItem('token-agendaqui')
const user = store.replaceReducer.user

export const getServicos = (unidades, token) => {
    return (dispatch) => {
        api.get(`/api/v1/servico`, {
        headers: {
            'Accept' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            console.log('Dados da requisição getUnidades res.data')
            console.log(res.data)

            const servicosDoUsuario = res.data.filter((servico) => {
                const unidadesDoUsuario = unidades.filter((unidade) => {
                    return servico.unidade_id === unidade.id
                })
                return unidadesDoUsuario
            })

            dispatch(addServicos(servicosDoUsuario))

            
        }).catch((err) => {
            console.log(err)
        })
    }
}