import { createAction } from '@reduxjs/toolkit';

export const setTeam = createAction('team/user', (teamId) => ({
    payload : teamId
}));


export const resetTeam = createAction('resetTeam');