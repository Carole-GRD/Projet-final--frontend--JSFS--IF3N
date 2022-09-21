import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from "react-router-dom";

const TeamToUpdate = () => {

    const { teamId } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    const [listPlayer, setListPlayer] = useState([]);
    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/${teamId}`)
            .then(function(response) {
                console.log(response);
                setListPlayer(response.data.userId);
                
                // const inputModification = ['name', 'coach'];
                // inputModification.forEach(input => {setValue(input, response.data[input])});
                setValue('name', response.data.name);
                setValue('coach', response.data.coach._id);
            })
        axios.get(`http://localhost:8080/api/user`)
            .then((response) => {
                // console.log(response);
                setUserList(response.data)
            })
    }, [teamId, setValue]);


    const onTeamUpdated = (data) => {
        data.userId = listPlayer.map(player => player._id);

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
        setListPlayer(current => current.filter(player => player._id !== _id));
    }

    const onPlayerAdd = () => {
        const idPlayerToAdd = document.getElementById('player').value;
        const playerToAdd = userList.find(user => user._id === idPlayerToAdd);
        setListPlayer(current => [...current, playerToAdd]);
    }

    return (
        <>
            <main>

                <p>Modifier une équipe</p>

                <form onSubmit={handleSubmit(onTeamUpdated)}>
                    <input id='name' type='text' placeholder='Équipe' {...register('name')} />
                    <select id='coach' {...register('coach')}>
                        {userList
                            .filter(user => user.role === 'coach')
                            .map(coach => <option key={coach._id} value={coach._id}>{coach.firstname} {coach.lastname}</option>
                        )}
                    </select>
                    <button type='submit'>Modifier</button>
                </form>

                {listPlayer.map(player => 
                        <div>
                            <div>{player.firstname} {player.lastname}</div>
                            <button onClick={() => {onPlayerDelete(player._id)}}>Supprimer</button>
                        </div>    
                )}

                <select id='player'>
                    {userList
                        .filter(user => user.role === 'player')
                        .filter(user => !listPlayer.some(player => player._id === user._id))
                        .map(player => <option key={player._id} value={player._id}>{player.firstname} {player.lastname}</option>
                    )}
                </select>
                <button onClick={onPlayerAdd}>Ajouter</button>

                <Link to='/team'><button>Retourner à la liste des équipes</button></Link>

            </main>
        </>
    )
};

export default TeamToUpdate;