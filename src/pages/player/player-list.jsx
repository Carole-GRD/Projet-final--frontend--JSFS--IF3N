
import CoachListItem from "./coach-list-item";
import PlayerListItem from "./player-list-item";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const PlayerList = () =>{

    const [listPlayers, setListPlayers] = useState([]);
    const [listCoach, setListCoach] = useState([]);
    const teamId = useSelector(state => state.teams.teamId);
    const teamName = useSelector(state => state.teams.teamName);

    useEffect(() => {
        if (teamId !== '') {
            axios.get(`http://localhost:8080/api/team/${teamId}`)
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
    }, [teamId]);

    
    return (
        <>
            <main>
                {teamName === '' && <h1>Liste de tous les membres du React Volley Club</h1>}
                {teamName !== '' && <h1>Liste de tous les membres de l'équipe : {teamName}</h1>}
                <h2>Coach(s)</h2>
                    {listCoach.map(coach => <CoachListItem key={coach._id} {...coach}/>)}
                <h2>Joueurs</h2>
                <div className='gridPlayer'>
                    {listPlayers.map(user => <PlayerListItem key={user.id} {...user}/>)}
                </div>
            </main>
            
        </>
    );
};

export default PlayerList;