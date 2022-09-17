import { createReducer } from '@reduxjs/toolkit';
import { setTeam, resetTeam } from '../actions/team-action';

const initialState = {
    teamSelectedName: '',
    teamSelectedId: ''
}

const teamReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setTeam, (state, action) => {
            state.teamSelectedName = action.payload.name;
            state.teamSelectedId = action.payload.teamId
        })
        .addCase(resetTeam,(state, action) => {
            state.teamSelectedName = '';
            state.teamSelectedId = ''
        })
});

export default teamReducer;