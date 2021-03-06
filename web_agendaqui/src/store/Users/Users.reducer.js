import { createReducer } from '@reduxjs/toolkit'
import { addUser, delFoto, newSenha, putTelefone, putUser } from './Users.actions'

const ESTADO_INICIAL = {}

export default createReducer(ESTADO_INICIAL, {
    [addUser.type]: (state, action) =>  action.payload,
    [putUser.type]: (state, action) => action.payload,
    [putTelefone]: (state, action) => action.payload,
    [delFoto]: (state, action) => action.payload,
    [newSenha]: (state, action) => action.payload
})