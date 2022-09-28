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
                <div>
                    <div className='teamTitleAndButton'>
                        <h1>Modifier une équipe</h1>
                        <Link to='/team'><button className='buttonAdmin'>Retourner à la liste des équipes</button></Link>
                    </div>

                    <article className='formTeamToUpdate'>
                        <form onSubmit={handleSubmit(onTeamUpdated)}>
                            <div>
                                <label htmlFor='name'>Équipe</label>
                                <input id='name' type='text' placeholder='Équipe' {...register('name')} />
                            </div>

                            <div>
                                <label htmlFor='coach'>Coach</label>
                                <select id='coach' {...register('coach')}>
                                    {userList
                                        .filter(user => user.role === 'coach')
                                        .map(coach => <option key={coach._id} value={coach._id}>{coach.firstname} {coach.lastname}</option>
                                    )}
                                </select>
                            </div>

                            <div className='buttonContainer'>
                                <button type='submit'>Modifier</button>
                            </div>
                        </form>

                        {listPlayer.map(player => 
                                <div key={player._id} className='listPlayer'>
                                    <div>{player.firstname} {player.lastname}</div>
                                    <button onClick={() => {onPlayerDelete(player._id)}}>Supprimer</button>
                                </div>    
                        )}

                        <div className='addPlayer'>
                            <select id='player'>
                                {userList
                                    .filter(user => user.role === 'player')
                                    .filter(user => !listPlayer.some(player => player._id === user._id))
                                    .map(player => <option key={player._id} value={player._id}>{player.firstname} {player.lastname}</option>
                                )}
                            </select>
                            <button onClick={onPlayerAdd}>Ajouter</button>
                        </div>
                    </article>
                </div>
            </main>
        </>
    )
};

export default TeamToUpdate;