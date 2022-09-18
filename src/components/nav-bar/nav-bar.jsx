
import { Link } from 'react-router-dom';


import HomeIcon from '@mui/icons-material/Home';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';

const NavBar = ({onSelectedMenu, _id}) => {

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
                <li><Link to="/home" onClick={onSelectedMenu}><HomeIcon />Accueil</Link></li>
                <li><Link to="/user" onClick={onSelectedMenu}><SportsHandballIcon />Effectif</Link></li>
                <li><Link to="/calendar" onClick={onSelectedMenu}><EventAvailableIcon />Calendrier</Link></li>
                <li><Link to="/rating" onClick={onSelectedMenu}><GradeIcon />Classement</Link></li>
                <li><Link to="/team"  onClick={onSelectedMenu}><GroupsIcon />Équipes</Link></li>
            </ul>
        </div>
        
    );
};

export default NavBar;