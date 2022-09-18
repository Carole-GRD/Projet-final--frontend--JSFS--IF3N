import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';


import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../store/actions/auth-action';


const Header = ({ onOpenMenu }) => {


    const dispatch = useDispatch();
    // console.log(logoutUser);
    const handleLogout = () =>{
        dispatch(logoutUser());
    }

    return (
        <>
            <div className='header'>
            
                <button onClick={() => onOpenMenu()} className='menu'>
                    <SportsVolleyballIcon className='sportsVolleyballIcon' />
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