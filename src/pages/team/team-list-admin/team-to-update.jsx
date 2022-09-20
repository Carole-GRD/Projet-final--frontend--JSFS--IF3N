import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from "react-router-dom";

const TeamToUpdate = () => {

    const { teamId } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    const [listPlayer, setListPlayer] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/${teamId}`)
            .then(function(response) {
                console.log(response);
                setListPlayer(response.data.userId);
                
                const inputModification = ['name', 'coach'];
                inputModification.forEach(input => {setValue(input, response.data[input])});
            })
    }, [teamId, setValue]);


    const [coachList, setCoachList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user?role=coach`)
            .then((response) => {
                // console.log(response);
                setCoachList(response.data)
            })
    }, []);


    const navigate = useNavigate();

    const onTeamUpdated = (data) => {
        axios.put(`http://localhost:8080/api/team/${teamId}`, data)
            .then(function (response) {
                console.log(response);
                navigate('/team');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onPlayerDelete = (_id) => {
        console.log(_id);
    }

    return (
        <>
            <main>
                <p>Modifier une équipe</p>
                <form onSubmit={handleSubmit(onTeamUpdated)}>
                    <input id='name' type='text' placeholder='Équipe' {...register('name')} />
                    <select id='coach' {...register('coach')}>
                        {coachList.map(coach => <option key={coach.id} value={coach.id}>{coach.firstname} {coach.lastname}</option>)}
                    </select>
                    
                    <button type='submit'>Modifier</button>
                </form>
                {listPlayer.map(player => 
                        <div>
                            <div>{player.firstname} {player.lastname}</div>
                            <button onClick={() => {onPlayerDelete(player._id)}}>Supprimer</button>
                        </div>    
                    )}
                <Link to='/team'><button>Retourner à la liste des équipes</button></Link>
            </main>
        </>
    )
};

export default TeamToUpdate;