
import CoachListItem from "./coach-list-item";
import PlayerListItem from "./player-list-item";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const PlayerList = () =>{

    const [listPlayers, setListPlayers] = useState([]);
    const [listCoach, setListCoach] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // const isConnected = useSelector(state => state.auth.isConnected);
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    useEffect(() => {
        if (teamSelectedId !== '') {
            axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
                .then((response) => {
                    // console.log(response);
                    setListPlayers(response.data.userId);
                    setListCoach([response.data.coach])
                })
        }
        else {
            axios.get(`http://localhost:8080/api/user?role=player`)
            .then((response) => {
                // console.log(response);
                setListPlayers(response.data);
            })
            axios.get(`http://localhost:8080/api/user?role=coach`)
            .then((response) => {
                // console.log(response);
                setListCoach(response.data);
            })
        } 
    }, [teamSelectedId]);

    
    return (
        <>
            <main>
                {/* {(teamSelectedName === '' && isConnected === false) && <h1>Liste de tous les membres du React Volley Club</h1>} */}
                {/* {isConnected === true && <h1>Liste de tous les membres de ton équipe ! (variable pour l'équipe !=</h1>} */}
                {teamSelectedName === '' && <h1>Liste de tous les membres du React Volley Club</h1>}
                {teamSelectedName !== '' && <h1>Liste de tous les membres de l'équipe : {teamSelectedName}</h1>}
                {teamSelectedName === '' && <h2>Coachs</h2>}
                {teamSelectedName !== '' && <h2>Coach</h2>}
                <div className='gridPlayer'>
                    {listCoach.map(coach => <CoachListItem key={coach.id} {...coach}/>)}
                </div>
                <h2>Joueurs</h2>
                <div className='gridPlayer'>
                    {listPlayers.map(user => <PlayerListItem key={user.id} {...user}/>)}
                </div>
            </main>
            
        </>
    );
};

export default PlayerList;