import Home from "./pages/home/home";
import PlayerList from "./pages/player/player-list";
import Calendar from "./pages/calendar/calendar";
import Rating from "./pages/rating/rating";
import Team from "./pages/team/team";
import NotFound from "./pages/errors/not-found";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";


export const routes = [
    {
        path:'',
        element: <Home />
    },
    {
        path:'accueil',
        element: <Home />
    },
    {
        path:'effectif',
        element: <PlayerList />
    },
    {
        path:'calendrier',
        element: <Calendar />
    },
    {
        path:'classement',
        element: <Rating />
    },
    {
        path:'equipe',
        element: <Team />
    },
    {
        path:'connexion',
        element: <Login />
    },
    {
        path:'enregistrement',
        element: <Register />
    },
    {
        path:'*',
        element: <NotFound />
    }
];

