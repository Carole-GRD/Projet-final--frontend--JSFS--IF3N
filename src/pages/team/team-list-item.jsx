import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTeam } from "../../store/actions/team-action";

const TeamListItem = ({_id, coach, name }) => {

    const dispatch = useDispatch();
    const handleSelectedTeam = () => {
            // dispatch(setTeam({name:name, teamId: _id}));
            dispatch(setTeam({name, teamId: _id}));
    }

    const [userConnected, setUserConnected] = useState('');
    const userId = useSelector(state => state.auth.userId);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${userId}`)
            .then((response) => {
                setUserConnected(response.data)
            })
    })

    const onDeleteTeam = () => {
        axios.delete(`http://localhost:8080/api/team/${_id}`)
            .then()
            .catch()
    }
    
    return (
        <>
                <div role='button' onClick={handleSelectedTeam}>
                    <h3>{name}</h3>
                    <p>Coach : {coach.firstname}</p>
                    {userConnected === 'admin' && (
                        <div>
                            <Link to='/teamToUpdate'><button>Modifier</button></Link>
                            <button onClick={onDeleteTeam}>Supprimer</button>
                        </div>
                    )}
                </div>
        </>
    )
};

export default TeamListItem;