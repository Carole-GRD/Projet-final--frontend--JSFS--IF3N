import CoachListItem from "./coach-list-item";
import PlayerListItem from "./player-list-item";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { resetTeam } from "../../store/actions/team-action";
// import { useParams } from "react-router-dom";

const PlayerList = () =>{

    // const { id } = useParams();
    const [listPlayers, setListPlayers] = useState([]);
    const [listCoach, setListCoach] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    useEffect(() => {
        if (teamSelectedId !== '') {
            axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
                .then((response) => {
                    // console.log(response);
                    // ↓ les joueurs récupérés, d'une équipe en particulier, sont déjà sous forme de tableau (voir 'userId' dans insomnia)
                    setListPlayers(response.data.userId);
                    // ↓ le coach récupéré, d'une équipe en particulier, est sous forme d'un objet, il faut créer un tableau pour pouvoir 'mapper'  (voir 'coach' dans insomnia) - on doit 'mapper' car s'il n'y a pas d'équipe séctionnée par l'utilisateur, on récupère tous les coachs (voir condition ci-dessous)
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
    }, [teamSelectedId]);


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
                <div className='pageContainerPlayer'>
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

                    <h2 className='playerTitle'>Joueurs</h2>
                    <div className='grid'>
                        {listPlayers.map(user => <PlayerListItem deleteUser={onDeleteUser} key={user._id} {...user}/>)}
                    </div>
                </div>
            </main>
            
        </>
    );
};

export default PlayerList;