import { createReducer } from '@reduxjs/toolkit'
import { addTodasUnidades, addUnidade } from './Unidades.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addTodasUnidades.type]: (state, action) =>  action.payload,
    [addUnidade.type]: (state, action) => [...state, action.payload]
})