
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';


const TeamToAdd = () => {

    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const [coachList, setCoachList] = useState([]);
    // const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user?role=coach`)
            .then((response) => {
                console.log(response);
                setCoachList(response.data)
            })       
        // axios.get(`http://localhost:8080/api/user?role=player`)
        //     .then((response) => {
        //         console.log(response);
        //         setPlayerList(response.data)
        //     })
    }, []);

    const onRegisterTeam = (data) => {
        console.log(data);    // data contient tout ce qu'il y a dans register

        axios.post('http://localhost:8080/api/team', data)
            .then(function (response) {
                console.log(response);
                navigate('/team')
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
            <main>
                <div>
                    <div className='teamTitleAndButton'>
                        <h1>Ajouter une équipe</h1>
                        <Link to='/team'><button className='buttonAdmin'>Retourner à la liste des équipes</button></Link>
                    </div>
                    <article className='formTeamToAdd'>
                        <form onSubmit={handleSubmit(onRegisterTeam)}>
                            <div>
                                <label htmlFor='name'>Équipe</label>
                                <input id="name" type="text" placeholder="Nom de l'équipe" {...register('name')} />
                            </div>

                            <div>
                                <label htmlFor='coach'>Coach</label>    
                                <select id="coach" {...register('coach')}>
                                    {coachList.map(coach => <option key={coach._id} value={coach._id}>{coach.firstname} {coach.lastname}</option>)}
                                </select>
                            </div>

                            {/* <select id="userId" {...register('userId')}>
                                {playerList.map(player => <option key={player._id} value={player._id}>{player.firstname} {player.lastname}</option>)}
                            </select> */}

                            <div className='buttonContainer'>
                                <button type='submit'>Ajouter</button>
                            </div>

                            {/* {errorMsg && (
                                <p>{errorMsg}</p>
                                )} */}
                        </form>
                    </article>
                    
                </div>
            </main>
        </>
    );
};

export default TeamToAdd;