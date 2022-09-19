import { createAction } from '@reduxjs/toolkit';

export const setTeam = createAction('team/user', (teamId, coachId) => ({
    payload : teamId, coachId
}));


export const resetTeam = createAction('resetTeam');

