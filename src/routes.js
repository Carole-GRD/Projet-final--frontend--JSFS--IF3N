import Home from "./pages/home/home";
import PlayerList from "./pages/player/player-list";
import Calendar from "./pages/calendar/calendar";
import Rating from "./pages/rating/rating";
import TeamList from "./pages/team/team-list";
import NotFound from "./pages/errors/not-found";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import TeamToAdd from "./pages/team/team-to-add/team-to-add";


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
        path:'calendar',
        element: <Calendar />
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

