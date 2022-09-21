import { createReducer } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../actions/auth-action';


const initialState = {
    isConnected: false,
    token: null,
    errorMsg: null,
    userId: '',
    userRole: '',
    userFirstName: '',
    userLastName: ''
};

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isConnected = true;
            state.token = action.payload.token;       // payload -> response.data
            state.userId = action.payload.userId;       // payload -> response.data
            state.userRole = action.payload.userRole;       // payload -> response.data
            state.userFirstName = action.payload.userFirstName;       // payload -> response.data
            state.userLastName = action.payload.userLastName;       // payload -> response.data
            state.errorMsg = null;
            
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isConnected = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userRole = action.payload.userRole;
            state.userFirstName = action.payload.userFirstName; 
            state.userLastName = action.payload.userLastName;      
            state.errorMsg = null;
            
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.errorMsg = 'Veuillez remplir toutes les données necessaires';
            console.log(action);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.errorMsg = 'Vos données sont invalides !';
            console.log(action);
        })
        .addCase(logoutUser, (state, action) => {
            state.isConnected = false;
            state.token = null;
            state.userId = '';
            state.userRole = '';
            state.userFirstName = ''; 
            state.userLastName = ''; 
            state.errorMsg = null;
        });
});

export default authReducer;