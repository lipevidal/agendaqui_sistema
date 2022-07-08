import api from "../../services/api";
import { addUser, novaSenha, putTelefone, putUser } from "./Users.actions";
import { getNegocios } from "../Negocios/Negocios.fetch.actions";

const token = localStorage.getItem('token-agendaqui')

export const getUser = (token) => {
    return (dispatch) => {
        const body = {}
        api.post('/api/v1/me', body, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then((res) => {
            dispatch(addUser(res.data))
            const dados = dispatch(getNegocios(res.data, token))
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const updateUser = (id, user) => {
    return dispatch => {
        api.post(`/api/user/${id}`, user, {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((res) => {
            console.log(res)
            dispatch(putUser(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const deleteFoto = (id, user) => {
    return dispatch => {
        api.post(`/api/user/${id}`, user, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            }).then((res) => {
                console.log(res)
                dispatch(putUser(res.data))
                document.location.reload(true);
            }).catch((err) => {
                console.log(err.response)
            })
    }
}

export const updateTelefone = (id, user) => {
    return dispatch => {
        api.patch(`/api/user/${id}`, user, {
            headers: {
              Accept : 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            dispatch(putTelefone(res.data))
          }).catch((err) => {
            console.log(err.response)
          })
    }
}

export const newPassword = (id, user) => {
    return dispatch => {
        api.put(`/api/user/${id}`, user, {
            headers: {
              Accept : 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            dispatch(novaSenha(res.data))
          }).catch((err) => {
            console.log(err.response.data.errors)
          })
    }
}