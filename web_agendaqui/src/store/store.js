import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './Users/Users.reducer';
import negociosReducer from './Negocios/Negocios.reducer';
import unidadesReducer from './Unidades/Unidades.reducer';
import todasUnidadesReducer from './Unidades/TodasUnidades.reducer';
import servicosReducer from './Servicos/Servicos.reducer';

export default configureStore({
    reducer: {
        user: usersReducer,
        negocios: negociosReducer,
        unidades: unidadesReducer,
        todasUnidades: todasUnidadesReducer,
        servicos: servicosReducer,
    }
})