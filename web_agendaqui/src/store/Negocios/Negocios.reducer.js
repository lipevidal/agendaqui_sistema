import { createReducer } from '@reduxjs/toolkit'
import { addNegocios } from './Negocios.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addNegocios.type]: (state, action) =>  [action.payload]
})