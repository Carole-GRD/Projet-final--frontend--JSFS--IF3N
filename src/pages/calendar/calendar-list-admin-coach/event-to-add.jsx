import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const EventToAdd = () => {

    const { handleSubmit, register } = useForm();

    const onRegisterEvent = (data) => {
        console.log('test fonction ajouter un évènement');
        console.log(data);
    }

    return (
        <>
            <main>
                <h1>Ajouter un évènement</h1>

                <form onSubmit={handleSubmit(onRegisterEvent)}>
                    <select {...register('Évènement')}>
                        <option selected='Évènement' value="Entrainement">Sectionnez un évènement</option>
                        <option value="Entrainement">Entrainement</option>
                        <option value="Match">Match</option>
                        <option value="Tournoi">Tournoi</option>
                    </select>
                    <input id='date' type='text' placeholder='JJ /MM/AAAA' {...register('date')} />
                    <button type='submit'>Ajouter</button>
                </form>
                <Link to='/calendar'><button>Retourner au calendrier</button></Link>
            </main>
        </>
    )
};

export default EventToAdd;