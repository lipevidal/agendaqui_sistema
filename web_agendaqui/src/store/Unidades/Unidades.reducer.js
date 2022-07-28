import { createReducer } from '@reduxjs/toolkit'
import { addUnidades, addUnidade } from './Unidades.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addUnidades.type]: (state, action) =>  action.payload,
    [addUnidade.type]: (state, action) => [...state, action.payload]
    //[addNegocio.type]: (state, action) => [...state, action.payload]
})