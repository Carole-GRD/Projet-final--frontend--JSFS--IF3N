import { createReducer } from '@reduxjs/toolkit';
import { setTeam, resetTeam } from '../actions/team-action';

const initialState = {
    teamName: '',
    teamId: ''
}

const teamReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setTeam, (state, action) => {
            state.teamName = action.payload.name;
            state.teamId = action.payload.teamId
        })
        .addCase(resetTeam,(state, action) => {
            state.teamName = '';
            state.teamId = ''
        })
});

export default teamReducer;