import { createAction } from '@reduxjs/toolkit'

export const addServicos = createAction('ADD_SERVICOS') //Adiciona somente unidades do usuário logado na store
export const addServico = createAction('ADD_SERVICO') //Adiciona uma única unidade na lista de unidades do usuário logado