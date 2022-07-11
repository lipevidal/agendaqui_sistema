import { createReducer } from '@reduxjs/toolkit'
import { addUnidades } from './Unidades.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addUnidades.type]: (state, action) =>  action.payload,
    //[addNegocio.type]: (state, action) => [...state, action.payload]
})