import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const CalendarListItem = ({_id, teamId, name, place, date, time, opposingTeam, presentId, absentId, isPresent, isAbsent, deleteEvent}) => {
    
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const isConnected = useSelector(state => state.auth.isConnected);
    const userRole = useSelector(state => state.auth.userRole);
    const userId = useSelector(state => state.auth.userId);

    // pas de setListPresent et setListAbsent car on est sur la page des événements et pas sur la feuille de match donc on ne doit pas modifier le rendu
    // construire les 'data' pour la requête axios
    // les données au lieu d'être dans currentEvent (voir fichier match-sheet) seront directement dans mon composent (CalendarListItem)

    const present = () => {
        // console.log(userId);
        const data = {
            name,           
            place,
            date,
            time,
            opposingTeam,
            presentId : [...presentId.map(present => present._id), userId],   
            absentId : absentId.filter(user => user._id !== userId).map(absent => absent._id)  
        }
        console.log(data);
        axios.put(`http://localhost:8080/api/event/${_id}`, data)
            .then(function (response) {
                // console.log(response.date);
                isPresent();
            })
    }

    const absent = () => {
        const data = {
            name, 
            place,
            date,
            time,
            opposingTeam,
            presentId : presentId.filter(user => user._id !== userId).map(present => present._id),
            absentId : [...absentId.map(absent => absent._id), userId]  
        }
        axios.put(`http://localhost:8080/api/event/${_id}`, data)
            .then(function (response) {
                // console.log(response.data);
                isAbsent();
            })
    }
    
    const onDelete = () => {
        deleteEvent(_id);
    }

    return (
        <>
            <article className='containerCalendar'>
                <div className='cardCalendar'>
                    <div className='cardTextCalendar'>
                        <h2>{name}</h2>
                        {(teamSelectedName === ''  || (userRole === 'coach' || userRole === 'admin')) &&
                            <h3>{teamId.name}</h3>                     
                        }
                        <p>{opposingTeam !== '' && 'React VC - ' + opposingTeam}</p>
                        <p>{date}</p>
                        <p>{time}</p>
                        <p>{place !== '' && 'Lieu : ' + place}</p>
                    </div>
                    <div className='containerButton'>

                        {(userRole === 'player' && teamSelectedName !== '') && 
                            <div className='buttonPlayer'>
                                {/* Si le joueur n'est pas dans la liste des absents, ni dans la liste des présents; c'est-à-dire qu'il n'a pas encore répondu */}
                                {/* ou si le joueur est dans la liste des absents, alors le bouton 'present' s'affiche pour qu'il puisse changer d'avis */}
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                {/* {((!absentId.some(user => user._id === userId) && !presentId.some(user => user._id === userId))
                                    || absentId.some(user => user._id === userId) ) &&
                                        <button onClick={present} className='buttonPresent'>Présent</button>
                                } */}
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                {/* {((!absentId.some(user => user._id === userId) && !presentId.some(user => user._id === userId))
                                    || absentId.some(user => user._id === userId) ) &&
                                        <button onClick={present} className='buttonPresent'>Présent</button>
                                } */}
                                {(presentId.some(user => user._id === userId) ) ?
                                        <button onClick={present} className='buttonPresent present'>Présent</button>
                                        :
                                        <button onClick={present} className='buttonPresent'>Présent</button>
                                }
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                {/* Si le joueur n'est pas dans la liste des absents, ni dans la liste des présents; c'est-à-dire qu'il n'a pas encore répondu */}
                                {/* ou si le joueur est dans la liste des présents, alors le bouton 'absent' s'affiche pour qu'il puisse changer d'avis */}
                                {/* {((!absentId.some(user => user._id === userId) && !presentId.some(user => user._id === userId))
                                    || presentId.some(user => user._id === userId) ) &&
                                    <button onClick={absent} className='buttonAbsent'>Absent</button>
                                } */}
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                {/* {((!absentId.some(user => user._id === userId) && !presentId.some(user => user._id === userId))
                                    || presentId.some(user => user._id === userId) ) &&
                                        <button onClick={absent} className='buttonAbsent'>Absent</button>
                                } */}
                                {(absentId.some(user => user._id === userId) ) ?
                                        <button onClick={absent} className='buttonAbsent absent'>Absent</button>
                                        :
                                        <button onClick={absent} className='buttonAbsent'>Absent</button>
                                }

                            </div>
                        }

                        {/* TODO: ajouter fonction et style */}
                        {((teamSelectedName !== '' && userRole === 'coach') || userRole === 'admin') && 
                            <div className='spaceButtonCalendar'>
                                <Link to={`/eventToUpdate/${_id}`}><button className='buttonAdmin'>Modifier</button></Link>
                                <button onClick={onDelete} className='buttonAdmin'>Supprimer</button>
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