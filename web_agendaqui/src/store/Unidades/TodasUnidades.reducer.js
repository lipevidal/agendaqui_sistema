import { createReducer } from '@reduxjs/toolkit'
import { addTodasUnidades } from './Unidades.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addTodasUnidades.type]: (state, action) =>  action.payload
})