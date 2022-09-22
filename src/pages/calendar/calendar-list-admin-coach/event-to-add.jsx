import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link/*, useNavigate*/ } from "react-router-dom";

const EventToAdd = () => {

    const { handleSubmit, register } = useForm();
    const [coachList, setCoachList] = useState([]);
    // const navigate = useNavigate();
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user?role=coach`)
            .then((response) => {
                console.log(response);
                setCoachList(response.data)
            })    
    }, []);

    const onRegisterEvent = (data) => {
        console.log('test fonction ajouter un évènement');
        console.log(data);
    }

    return (
        <>
            <main>
                <h1>Ajouter un évènement</h1>

                <form onSubmit={handleSubmit(onRegisterEvent)}>
                    <input id='teamId' type="text" value={teamSelectedName} {...register('teamId')}  />
                    <select id="coach" {...register('coach')}>
                        {coachList.map(coach => <option key={coach._id} value={coach._id}>{coach.firstname} {coach.lastname}</option>)}
                    </select>
                    <select {...register('Évènement')}>
                        <option value="Entrainement">Entrainement</option>
                        <option value="Match">Match</option>
                        <option value="Tournoi">Tournoi</option>
                    </select>
                    <input id='place' type='text' placeholder='Lieu' {...register('place')} />
                    <input id='date' type='text' placeholder='JJ/MM/AAAA' {...register('date')} />
                    <input id='time' type='text' placeholder='Heure (00h00)' {...register('time')} />
                    <input id='opposingTeam' type='text' placeholder='Équipe adverse' {...register('opposingTeam')} />
                    <button type='submit'>Ajouter</button>
                </form>
                <Link to='/calendar'><button>Retourner au calendrier</button></Link>
            </main>
        </>
    )
};

export default EventToAdd;