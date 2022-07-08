import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './Users/Users.reducer';
import negociosReducer from './Negocios/Negocios.reducer';

export default configureStore({
    reducer: {
        user: usersReducer,
        negocios: negociosReducer
    }
})