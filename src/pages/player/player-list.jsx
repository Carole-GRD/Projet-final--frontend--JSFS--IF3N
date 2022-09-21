
import CoachListItem from "./coach-list-item";
import PlayerListItem from "./player-list-item";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { resetTeam } from "../../store/actions/team-action";
import { useParams } from "react-router-dom";

const PlayerList = () =>{

    const { id } = useParams();
    const [listPlayers, setListPlayers] = useState([]);
    const [listCoach, setListCoach] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    useEffect(() => {
        if (teamSelectedId !== '') {
            axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
                .then((response) => {
                    // console.log(response);
                    setListPlayers(response.data.userId);
                    setListCoach([response.data.coach])
                })
        }
        if (teamSelectedId === '') {
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
    }, [teamSelectedId, resetTeam]);


    const dispatch = useDispatch();
    const setAllMembers = () => {
        dispatch(resetTeam());
    }


    const onDeleteUser = (id) => {
        axios.delete(`http://localhost:8080/api/user/${id}`)
            .then((response) => {
                axios.get(`http://localhost:8080/api/user?role=player`)
                    .then((response) => {
                        console.log(response.data);
                        setListPlayers(response.data);
                    })
            })
            .then((response) => {
                axios.get(`http://localhost:8080/api/user?role=coach`)
                    .then((response) => {
                        setListCoach(response.data);
                    })
            })
            .catch()
    }

    return (
        <>
            <main>
                {teamSelectedName === '' ? <h1>Liste de tous les membres du React Volley Club</h1> : null}
                {teamSelectedName !== '' && <h1>Liste de tous les membres de l'équipe : {teamSelectedName}</h1>}
                
                <div className='containerButton'>
                    {teamSelectedName !== '' &&
                        <button onClick={setAllMembers} className='button'>Voir tous les membres</button>
                    }
                </div>

                {teamSelectedName === '' && <h2>Coachs</h2>}
                {teamSelectedName !== '' && <h2>Coach</h2>}
                <div className='grid'>
                    {listCoach.map(coach => <CoachListItem deleteUser={onDeleteUser} key={coach._id} {...coach}/>)}
                </div>

                <h2>Joueurs</h2>
                <div className='grid'>
                    {listPlayers.map(user => <PlayerListItem deleteUser={onDeleteUser} key={user._id} {...user}/>)}
                </div>
            </main>
            
        </>
    );
};

export default PlayerList;