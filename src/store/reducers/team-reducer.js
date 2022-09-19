import { createReducer } from '@reduxjs/toolkit';
import { setTeam, resetTeam } from '../actions/team-action';


const initialState = {
    teamSelectedName: '',
    teamSelectedId: '',
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    coachId : '',           
    teamList : []
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

const teamReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setTeam, (state, action) => {
            state.teamSelectedName = action.payload.name;
            state.teamSelectedId = action.payload.teamId;
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
            state.coachId = action.payload.coach
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        })
        .addCase(resetTeam,(state, action) => {
            state.teamSelectedName = '';
            state.teamSelectedId = '';
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
            state.coachId = ''
            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        })
});

export default teamReducer;