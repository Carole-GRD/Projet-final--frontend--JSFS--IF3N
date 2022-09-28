import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AllPlayerList from './all-players-list';
import { Link, useParams } from 'react-router-dom';



const MatchSheet = () => {

    const { id } = useParams();
    const [listPlayers, setListPlayers] = useState([]);
    const [listPresents, setListPresents] = useState([]);
    const [listAbsents, setListAbsents] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const [currentEvent, setCurrentEvent] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
            .then(function (response) {
                // console.log(response.data);
                setListPlayers(response.data.userId);
            })  
        setupEvent();
    }, [teamSelectedId, id]);
    
    // currentEvent est l'état de la page au chargement, il faut donc la mettre à jour à chaque modification du present absent
    const setupEvent = () => {
        console.log('setup');
        axios.get(`http://localhost:8080/api/event/${id}`)
            .then(function (response) {
                // console.log(response.data);
                setListPresents(response.data.presentId);
                setListAbsents(response.data.absentId);
                setCurrentEvent(response.data);
            })
    }

    const onIsPresent = (idPlayer) => {
        console.log(idPlayer);
        // mise à jour des données
        // on modifie les données de 'currentEvent' car on a cliqué sur un évènement en particulier (on est sur la feuille de match de cet évènement) !
        const data = {
            name : currentEvent.name,   
            place : currentEvent.place,
            date : currentEvent.date,
            time : currentEvent.time,
            opposingTeam : currentEvent.opposingTeam,
            // dans toutes les données de l'évènement, on ne renvoie que l'identifiant des joueurs présents
            // puis on ajoute l'identifiant du nouveau joueur présent
            presentId : [...currentEvent.presentId.map(present => present._id), idPlayer],   
            absentId : currentEvent.absentId.filter(user => user._id !== idPlayer).map(absent => absent._id)             
        }
        // on lance la requête en lui passant les données à modifier
        axios.put(`http://localhost:8080/api/event/${id}`, data)
            .then(function (response) {
                console.log(response.data);
                setupEvent();
            })
    }




    const onIsAbsent = (idPlayer) => {
        // console.log(idPlayer);    // → identifiant du joueur qui clique sur le bouton 'absent'
        console.log(idPlayer);
        const data = {
            name : currentEvent.name,           
            place : currentEvent.place,
            date : currentEvent.date,
            time : currentEvent.time,
            opposingTeam : currentEvent.opposingTeam,
            presentId : currentEvent.presentId.filter(user => user._id !== idPlayer).map(present => present._id),          
            absentId : [...currentEvent.absentId.map(absent => absent._id), idPlayer]
        }
        console.log(data);

        axios.put(`http://localhost:8080/api/event/${id}`, data)
            .then(function (response) {
                console.log(response.data);
                setupEvent();
            })
            .catch()
    }

    return (
        <>
            <main>
                <div>
                    <div className='matchSheetTitleAndButton'>
                        <div className='text'>
                            <h1>Feuille de match - {teamSelectedName}</h1>
                            <h3>{currentEvent.name}</h3>
                            <p>Date : {currentEvent.date}</p>
                            <p>Heure : {currentEvent.time}</p>
                            {currentEvent.place ?
                                <p>Lieu : {currentEvent.place}</p>
                                : <p>Lieu : Centre Sportif de MERN</p>
                            }
                        </div>
                        <div className='containerButton'>
                            <Link to='/calendar'><button className='button'>Retourner au calendrier</button></Link>
                        </div>
                    </div>

                    <section className='containerAnswer'>

                        <article className='answer'>
                            <h2>En attente</h2>
                            <div className='gridAllPlayerList'>
                                {listPlayers
                                    .filter(player => 
                                        !listPresents.some(present => present._id === player._id) 
                                        && 
                                        !listAbsents.some(absent => absent._id === player._id))
                                    .map(player => <AllPlayerList isPresent={onIsPresent} isAbsent={onIsAbsent} key={player._id} {...player} />)
                                }
                            </div>
                        </article>

                        <article className='answer'>
                            <h2>Présent</h2>
                            <div className='gridAllPlayerList'>
                                {listPresents.map(present => <AllPlayerList isPresent={onIsPresent} isAbsent={onIsAbsent} key={present._id} {...present} />)}
                                
                            </div>
                        </article>

                        <article className='answer'>
                            <h2>Absent</h2>
                            <div className='gridAllPlayerList'>
                                {listAbsents.map(absent => <AllPlayerList isPresent={onIsPresent} isAbsent={onIsAbsent} key={absent._id} {...absent} />)}
                                
                            </div>
                        </article>

                    </section>
                </div>
            </main>
        </>
    )
};

export default MatchSheet;