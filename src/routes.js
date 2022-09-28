import Home from "./pages/home/home";
import PlayerList from "./pages/player/player-list";
import CalendarList from "./pages/calendar/calendar-list";
import Rating from "./pages/rating/rating";
import TeamList from "./pages/team/team-list";
import NotFound from "./pages/errors/not-found";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import TeamToAdd from "./pages/team/team-list-admin/team-to-add";
import TeamToUpdate from "./pages/team/team-list-admin/team-to-update";
import MatchSheet from "./pages/calendar/match-sheet/match-sheet";
import UserToUpdate from "./pages/player/user-list-admin/user-to-update";
import EventToAdd from "./pages/calendar/calendar-list-admin-coach/event-to-add";
import EventToUpdate from "./pages/calendar/calendar-list-admin-coach/event-to-update";



export const routes = [
    {
        path:'',
        element: <Home />
    },
    {
        path:'home',
        element: <Home />
    },
    {
        path:'user',
        element: <PlayerList />
    },
    {
        path:'userToUpdate/:idUserToUpdate',
        element: <UserToUpdate />
    },
    {
        path:'calendar',
        element: <CalendarList />
    },
    {
        path:'matchSheet/:id',
        element: <MatchSheet />
    },
    {
        path:'eventToAdd',
        element: <EventToAdd />
    },
    {
        path:'eventToUpdate/:idEvent',
        element: <EventToUpdate />
    },
    {
        path:'rating',
        element: <Rating />
    },
    {
        path:'team',
        element: <TeamList />
    },
    {
        path:'teamToAdd',
        element: <TeamToAdd />
    },
    {
        path:'teamToUpdate/:teamId',
        element: <TeamToUpdate />
    },
    {
        path:'login',
        element: <Login />
    },
    {
        path:'register',
        element: <Register />
    },
    {
        path:'*',
        element: <NotFound />
    }
];

