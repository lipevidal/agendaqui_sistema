import api from "../../services/api";
import store from '../store'
import { addUnidades, addTodasUnidades } from "./Unidades.actions";
import { getServicos } from '../Servicos/Servicos.server.actions'

const token = localStorage.getItem('token-agendaqui')
const user = store.replaceReducer.user

export const getUnidades = (todosNegociosUsuarioLogado, token) => {
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

            //retorna todas as unidades do sistema
            const todoUnidades = res.data.map((unidade) => {
                return unidade
            })

            console.log('Todas as unidades')
            console.log(todoUnidades)

            //Armazeno todas as uniddaes na store de todas as unidades
            dispatch(addTodasUnidades(todoUnidades))

            //retorna somente as unidades que pertence ao usuário logado
            const unidades = todoUnidades.filter((unidade) => {
                const negocio = todosNegociosUsuarioLogado.filter((negocio) => {
                    return negocio.id === unidade.negocio_id
                })
                return negocio
            })

            if (!unidades.length) {
                console.log('este usuário nao tem unidades')
                //atualizar dadosNegocio.entrou pra hoje
            } 

            console.log('Unidades')
            console.log(unidades)

            //Adiciono somente as unidades pertencentes ao usuário logado na store especifica
            dispatch(addUnidades(unidades))

            //Chamo a requisição para buscar todos os serviços pertencentes as unidades do usuário logado
            dispatch(getServicos(unidades, token))
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