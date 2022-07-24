import { createAction } from '@reduxjs/toolkit'

export const addUnidades = createAction('ADD_UNIDADES') //Adiciona somente unidades do usuário logado na store
export const addUnidade = createAction('ADD_UNIDADE') //Adiciona uma única unidade na lista de unidades do usuário logado
export const addTodasUnidades = createAction('ADD_TODAS_UNIDADES') //Adiciona todas as unidades do DB na store