import axios from 'axios';
import { /*useState,*/ useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from "react-router-dom";

const EventToUpdate = () => {

    const { idEvent } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    // const [coachList, setCoachList] = useState([]);
    // const [listEvents, setListEvents] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/event/${idEvent}`)
            .then(function(response) {
                console.log(response);
                setValue('name', response.data.name);
                setValue('place', response.data.place);
                setValue('date', response.data.date);
                setValue('time', response.data.time);
                setValue('opposingTeam', response.data.opposingTeam);
            })
    }, [idEvent, setValue]);


    const onUpdatedEvent = (data) => {

        axios.put(`http://localhost:8080/api/event/${idEvent}`, data)
            .then(function (response) {
                console.log(response);
                navigate('/team');
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
                        <h1>Modifier un évènement</h1>
                        <Link to='/calendar'><button className='buttonAdmin'>Retourner à la liste des évènements</button></Link>
                    </div>

                    <article className='formEventToUpdate'>
                        <form onSubmit={handleSubmit(onUpdatedEvent)}>

                            <div>
                                <label htmlFor='name'>Évènement</label>
                                <select id='name' {...register('name')}>
                                    <option>Entrainement</option>
                                    <option>Match</option>
                                    <option>Tournoi</option>
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
                                <button type='submit'>Modifier</button>
                            </div>
                        </form>
                        
                    </article>
                </div>
            </main>
        </>
    )
};

export default EventToUpdate;