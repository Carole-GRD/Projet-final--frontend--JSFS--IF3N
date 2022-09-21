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
        axios.get(`http://localhost:8080/api/event/${id}`)
            .then(function (response) {
                // console.log(response.data);
                setListPresents(response.data.presentId);
                setListAbsents(response.data.absentId);
                setCurrentEvent(response.data);
            })  
    }, [teamSelectedId, id]);
    
    
    const onIsPresent = (idPlayer) => {
        // console.log(idPlayer);   // → identifiant du joueur qui clique sur le bouton 'present'

        // ++++++++++++++++++++++++++++++++   pas besoin dans la feuille de match  (match-sheet)
        // ↓ on retrouve le joueur qui clique sur le bouton 'present' dans la liste de tous les joueurs
        const userToAdd = listPlayers.find(player => player._id === idPlayer);  
        // ↓ on l'ajoute à la liste des joueurs présents
        setListPresents(current => [...current, userToAdd]);                      
        // ++++++++++++++++++++++++++++++

        // mise à jour des données
        // on modifie les données de 'currentEvent' car on a cliqué sur un évènement en particulier (on est sur la feuille de match de cet évènement) !
        const data = {
            name : currentEvent.name,            //  name : name,   ou juste   name   dans la feuille de match  (match-sheet)
            place : currentEvent.place,
            date : currentEvent.date,
            time : currentEvent.time,
            opposingTeam : currentEvent.opposingTeam,

            // dans toutes les données de l'évènement, on ne renvoie que l'identifiant des joueurs présents
            // puis on ajoute l'identifiant du nouveau joueur présent
            presentId : [...currentEvent.presentId.map(present => present._id), idPlayer],  
            //  ↓ dans la feuille de match  (match-sheet) 
            // presentId : [...presentId.map(present => present._id), id du joueur connecté (store)]  
            
            absentId : currentEvent.absentId          //  absentId : absentId
        }

        // on lance la requête en lui passant les données à modifier
        axios.put(`http://localhost:8080/api/event/${id}`, data)
            .then(function (response) {
                console.log(response.data);
            })
    }

    const onIsAbsent = (idPlayer) => {
        // console.log(idPlayer);    // → identifiant du joueur qui clique sur le bouton 'absent'

        // ↓ on retrouve le joueur qui clique sur le bouton 'absent' dans la liste de tous les joueurs
        const userToAdd = listPlayers.find(player => player._id === idPlayer);  
        // ↓ on l'ajoute à la liste des joueurs absents  
        setListAbsents(current => [...current, userToAdd]);

        const data = {
            name : currentEvent.name,           
            place : currentEvent.place,
            date : currentEvent.date,
            time : currentEvent.time,
            opposingTeam : currentEvent.opposingTeam,
            presentId : currentEvent.presentId,   
            absentId : [...currentEvent.absentId.map(absent => absent._id), idPlayer]
        }
        console.log(data);

        axios.put(`http://localhost:8080/api/event/${id}`, data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch()
    }

    return (
        <>
            <main>
                <h1>Feuille de match - {teamSelectedName}</h1>

                <h3>{currentEvent.name}</h3>
                <p>Date : {currentEvent.date}</p>
                <p>Heure : {currentEvent.time}</p>
                <p>Lieu : {currentEvent.place}</p>

                <div className='containerButton'>
                    <Link to='/calendar'><button className='button'>Retourner au calendrier</button></Link>
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
                            {/* {listPresents.map(present => <AllPlayerList key={present._id} {...present} />)} */}
                            {listPresents.map(present => <AllPlayerList isPresent={onIsPresent} isAbsent={onIsAbsent} key={present._id} {...present} />)}
                        </div>
                    </article>

                    <article className='answer'>
                        <h2>Absent</h2>
                        <div className='gridAllPlayerList'>
                            {listAbsents.map(player => <AllPlayerList isPresent={onIsPresent} isAbsent={onIsAbsent} key={player._id} {...player} />)}
                        </div>
                    </article>

                </section>
                
            </main>
        </>
    )
};

export default MatchSheet;