import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTeam from './user-team';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PlayerListItem = ({firstname, lastname, position, _id, deleteUser}) => {


    const [teams, setTeams] = useState([]);
    const userRole = useSelector(state => state.auth.userRole);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/user/${_id}`)
            .then((response) => {
                // console.log(response.data);
                setTeams(response.data)
            })
        }, [_id])

    const onDelete = () => {
        // axios.delete(`http://localhost:8080/api/team/${_id}`)
        //     .then((response) => {
        //         navigate('/team');
        //     })
        //     .catch()
        deleteUser(_id);
    }

    return (
        <>  
            <article className='containerPlayerAndCoach'>
                <div className='card'>
                    <h3>{firstname} {lastname}</h3>
                    <div className='userTeam'>
                        {teams.map(team => <UserTeam key={team._id} {...team}/>)}
                    </div>
                    <p><span>Position : </span>{position}</p>
                </div>
                <div className='buttonContainer'>
                    {userRole === 'admin' && (
                        <div className='spaceButton'>
                            <Link to={`/userToUpdate/${_id}`}><button className='buttonAdmin'>Modifier</button></Link>
                            <button onClick={onDelete} className='buttonAdmin'>Supprimer</button>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
};

export default PlayerListItem;