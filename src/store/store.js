import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer';
import teamReducer from './reducers/team-reducer';
// import eventReducer from './reducers/event-reducer';


const store = configureStore({
    reducer: {
        auth: authReducer,
        teams: teamReducer
        // event: eventReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
    // ↑ précise la variable d'environnement ->  dev  
});

export default store;