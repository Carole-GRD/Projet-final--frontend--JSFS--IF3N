
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


import HomeIcon from '@mui/icons-material/Home';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';

const NavBar = ({onSelectedMenu, _id}) => {

    const isConnected = useSelector(state => state.auth.isConnected);
    const userFirstName = useSelector(state => state.auth.userFirstName);
    const userLastName = useSelector(state => state.auth.userLastName);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    return (
        <div className='nav'>
            {/* ↓ voir fichier _header.scss */}
            <article>
                {isConnected === false &&
                <>
                    <div>
                        <h2>Photo</h2>
                    </div> 
                    <p>Prénom Nom</p>
                    <p>Équipe</p>
                </>
                }

                {isConnected &&
                <>
                    <div>
                        <h2>Photo</h2>
                    </div> 
                    <p>{userFirstName} {userLastName}</p>
                    {teamSelectedName ?
                        <p>{teamSelectedName}</p>
                        : <p>Sélectionne ton équipe</p>
                    }
                </>
                }
                
            </article>
            <hr />
            <ul>
                <li><Link to="/home" onClick={onSelectedMenu}><HomeIcon className='iconNavBar' />Accueil</Link></li>
                <li><Link to="/user" onClick={onSelectedMenu}><SportsHandballIcon className='iconNavBar' />Effectif</Link></li>
                <li><Link to="/calendar" onClick={onSelectedMenu}><EventAvailableIcon className='iconNavBar' />Calendrier</Link></li>
                <li><Link to="/rating" onClick={onSelectedMenu}><GradeIcon className='iconNavBar' />Classement</Link></li>
                <li><Link to="/team"  onClick={onSelectedMenu}><GroupsIcon className='iconNavBar' />Équipes</Link></li>
            </ul>
        </div>
        
    );
};

export default NavBar;