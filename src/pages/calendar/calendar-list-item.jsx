import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const CalendarListItem = ({_id, teamId, name, place, date, time, opposingTeam, presentId, absentId}) => {
    // récupérer l'id du joueur actuellement connecté dans le store
    // 2 fonctions present et absent
    // l'idPlayer du joueur à ajouter sera dans le store (voir ligne 5)
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const isConnected = useSelector(state => state.auth.isConnected);
    const userRole = useSelector(state => state.auth.userRole);
    // pas de setListPresent et setListAbsent
    // dans axios il faut construire les data
    // les données au lieu d'être dans currentEvent seront directement dans mon composent (CalendarListItem)
    
    return (
        <>
            <article className='containerCalendar'>
                <div className='cardCalendar'>
                    <div className='cardTextCalendar'>
                        <h3>{name}</h3>
                        <h4>{(isConnected === false && teamSelectedName === '') && teamId.name}</h4>
                        <p>{opposingTeam !== '' && 'React VC - ' + opposingTeam}</p>
                        <p>{date}</p>
                        <p>{time}</p>
                        <p>{place !== '' && 'Lieu : ' + place}</p>
                    </div>
                    <div className='containerButton'>
                        {(isConnected && userRole === 'player') && 
                            <div className='buttonPlayer'>
                                <button className='buttonPresent'>Présent</button>
                                <button className='buttonAbsent'>Absent</button>
                            </div>
                        }
                        {(isConnected && teamSelectedName !== '') &&
                            <Link to={`/matchSheet/${_id}`}><button className='matchSheet'>Voir la feuille de match</button></Link>
                        }
                    </div>
                </div>
            </article>
        </>
    );
};

export default CalendarListItem;