import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';



import { Link } from 'react-router-dom';



const Header = ({ onOpenMenu }) => {

    return (
        <>
            <div className='header'>
            
                <button onClick={() => onOpenMenu()} className='menu'>
                    <SportsVolleyballIcon className='sportsVolleyballIcon' />
                </button>

                <h2>React Volley Club</h2>

                <div className='btn'>
                    <Link to='/connexion'><button className='login'>Login</button></Link>
                    <button className='logout'>Logout</button>
                </div>

            </div>

            
        </>        
    );
};

export default Header;