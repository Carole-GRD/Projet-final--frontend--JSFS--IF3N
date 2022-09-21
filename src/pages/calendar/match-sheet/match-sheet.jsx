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
        console.log(idPlayer);
        // ++++++++++++++++++++++++++++++++   pas besoin
        const userToAdd = listPlayers.find(player => player._id === idPlayer);
        setListPresents(current => [...current, userToAdd]);
        // ++++++++++++++++++++++++++++++
        const data = {
            name : currentEvent.name,         //  name : name,   ou   name
            place : currentEvent.place,
            date : currentEvent.date,
            time : currentEvent.time,
            opposingTeam : currentEvent.opposingTeam,
            // dans toutes les données de l'évènement, on ne renvoie que l'identifiant des joueurs présents
            // puis on ajoute l'identifiant du nouveau présent
            presentId : [...currentEvent.presentId.map(present => present._id), idPlayer],  
             // presentId : [...presentId.map(present => present._id), id du joueur connecté (store)]
            absentId : currentEvent.absentId          //  absentId : absentId
        }
        axios.put(`http://localhost:8080/api/event/${id}`, data)
            .then(function (response) {
                console.log(response.data);
            })
    }

    return (
        <>
            <main>
                <h1>Feuille de match</h1>

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
                                .map(player => <AllPlayerList isPresent={onIsPresent} key={player._id} {...player} />)
                            }
                        </div>
                    </article>

                    <article className='answer'>
                        <h2>Présent</h2>
                        <div className='gridAllPlayerList'>
                            {/* {listPresents.map(present => <AllPlayerList key={present._id} {...present} />)} */}
                            {listPresents.map(present => <AllPlayerList isPresent={onIsPresent} key={present._id} {...present} />)}
                        </div>
                    </article>

                    <article className='answer'>
                        <h2>Absent</h2>
                        <div className='gridAllPlayerList'>
                            {listAbsents.map(player => <AllPlayerList isPresent={onIsPresent} key={player._id} {...player} />)}
                        </div>
                    </article>

                </section>
                
            </main>
        </>
    )
};

export default MatchSheet;