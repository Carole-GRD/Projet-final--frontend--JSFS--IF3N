import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';


import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/actions/auth-action';
import { resetTeam } from '../../store/actions/team-action';

const Header = ({ onOpenMenu }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
        dispatch(logoutUser());
        dispatch(resetTeam());
        navigate('/team')
    }

    return (
        <>
            <div className='header'>
            
                <button onClick={() => onOpenMenu()} className='menu'>
                    <SportsVolleyballIcon fontSize='large' className='sportsVolleyballIcon' />
                </button>

                <h2>React Volley Club</h2>

                <div className='btn'>
                    <Link to='/login'><button className='login'>Login</button></Link>
                    <Link to='/register'><button className='register'>Register</button></Link>
                    <button onClick={handleLogout} className='logout'>Logout</button>
                </div>

            </div>

            
        </>        
    );
};

export default Header;