import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer';



const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
    // ↑ précise la variable d'environnement ->  dev  
});

export default store;