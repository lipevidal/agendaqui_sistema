import { createReducer } from '@reduxjs/toolkit'
import { addServico, addServicos } from './Servicos.actions'

const ESTADO_INICIAL = []

export default createReducer(ESTADO_INICIAL, {
    [addServicos.type]: (state, action) =>  action.payload,
    [addServico.type]: (state, action) => [...state, action.payload]
})