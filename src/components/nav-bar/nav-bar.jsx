
import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';

const NavBar = ({onCloseMenu}) => {

    return (
        <div className='nav'>
            {/* ↓ voir fichier _header.scss */}
            <article>
                <div>
                    <p>Photo</p>
                </div>
                <p>Prénom Nom</p>
                <p>Équipe</p>
            </article>
            <hr />
            <ul>
                <li><Link to="/accueil" onClick={() => onCloseMenu()}><HomeIcon />Accueil</Link></li>
                <li><Link to="/effectif" onClick={() => onCloseMenu()}><SportsHandballIcon />Effectif</Link></li>
                <li><Link to="/calendrier" onClick={() => onCloseMenu()}><EventAvailableIcon />Calendrier</Link></li>
                <li><Link to="/classement" onClick={() => onCloseMenu()}><GradeIcon />Classement</Link></li>
                <li><Link to="/equipe" onClick={() => onCloseMenu()}><GroupsIcon />Équipes</Link></li>
            </ul>
        </div>
        
    );
};

export default NavBar;