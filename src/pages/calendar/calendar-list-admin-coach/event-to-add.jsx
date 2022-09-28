import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const EventToAdd = () => {

    const { handleSubmit, register } = useForm();
    const [coachList, setCoachList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user?role=coach`)
            .then((response) => {
                // console.log(response);
                setCoachList(response.data)
            }) 
        axios.get(`http://localhost:8080/api/team`)
            .then((response) => {
                // console.log(response);
                setTeamList(response.data)
            })   
    }, []);

    const onRegisterEvent = (data) => {
        console.log('test de la fonction ajouter un évènement');
        console.log(data);

        axios.post(`http://localhost:8080/api/event`, data)
            .then(function (response) {
                // console.log(response);
                
                axios.get(`http://localhost:8080/api/event/team/${teamSelectedId}`)
                    .then((response) => {
                        // setListEvent(response.data);
                    })
                    navigate('/calendar');
            })
            .catch(function (error) {
                // console.log(error);
            })
    }

    return (
        <>
            <main>
                <div>
                    <div className='eventTitleAndButton'>
                        <h1>Ajouter un évènement</h1>
                        <Link to='/calendar'><button className='buttonAdmin'>Retourner au calendrier</button></Link>
                    </div>

                    <article className='formEventToAdd'>
                        <form onSubmit={handleSubmit(onRegisterEvent)}>
                            
                            <div>
                                <label htmlFor='teamId'>Équipe</label>
                                <select id='teamId' {...register('teamId')}>
                                    {teamList.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor='coach'>Coach</label>
                                <select id='coach' {...register('coach')}>
                                    {coachList.map(coach => <option key={coach._id} value={coach._id}>{coach.firstname} {coach.lastname}</option>)}
                                </select>
                            </div>

                            <div>
                                <label htmlFor='name'>Évènement</label>
                                <select id='name' {...register('name')}>
                                    <option value='Entrainement'>Entrainement</option>
                                    <option value='Match'>Match</option>
                                    <option value='Tournoi'>Tournoi</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor='place'>Lieu</label>
                                <input id='place' type='text' placeholder='Lieu' {...register('place')} />
                            </div>

                            <div>
                                <label htmlFor='date'>Date</label>
                                <input id='date' type='text' placeholder='JJ/MM/AAAA' {...register('date')} />
                            </div>

                            <div>
                                <label htmlFor='time'>Heure</label>
                                <input id='time' type='text' placeholder='Heure (00h00)' {...register('time')} />
                            </div>

                            <div>
                                <label htmlFor='opposingTeam'>Équipe adverse</label>
                                <input id='opposingTeam' type='text' placeholder='Équipe adverse' {...register('opposingTeam')} />
                            </div>

                            <div className='buttonContainer'>
                                <button type='submit'>Ajouter</button>
                            </div>
                        </form>
                    </article>

                </div>
            </main>
        </>
    )
};

export default EventToAdd;