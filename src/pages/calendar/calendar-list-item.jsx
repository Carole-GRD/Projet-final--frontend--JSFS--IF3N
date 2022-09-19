import { useSelector } from "react-redux";
// import { Link } from 'react-router-dom';

const CalendarListItem = ({teamId, name, place, date, time, opposingTeam/*, presentId, absentId*/}) => {

    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const isConnected = useSelector(state => state.auth.isConnected);
    const userRole = useSelector(state => state.auth.userRole);

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
                    <div>
                        {(isConnected && userRole === 'player') && 
                            <div className='buttonPlayer'>
                                <button className='buttonPresent'>Présent</button>
                                <button className='buttonAbsent'>Absent</button>
                            </div>
                        }
                        {/* {isConnected && 
                        // route avec un id 'detailEvent'
                        // faire une page detail avec toutes les infos de l'évènement choisi 
                        // sur la page faire une requête 
                            <Link><button>Voir la feuille de match</button></Link>
                        } */}
                    </div>
                </div>
            </article>
        </>
    );
};

export default CalendarListItem;