
import TeamListItem from './team-list-item';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import TeamToUpdate from './team-list-admin/team-to-update';


const TeamList = () => {

    const [teams, setTeams] = useState([]);
    // +++++++++++++++++++++++++++++++++++++++++++++++
    const [userConnected, setUserConnected] = useState('');
    const isConnected = useSelector(state => state.auth.isConnected);
    const userId = useSelector(state => state.auth.userId);
    // +++++++++++++++++++++++++++++++++++++++++++++++

    // useEffect(() => {
    //     console.log(data);
    //     axios.get(`http://localhost:8080/api/team`)
    //         .then((response) => {
    //             console.log(response);
    //             setTeams(response.data)
    //         })
    // }, [])

    // +++++++++++++++++++++++++++++++++++++++++++++++
    
    useEffect(() => {
        // console.log(data);
        if (isConnected === true){
            axios.get(`http://localhost:8080/api/team/user/${userId}`)
                .then((response) => {
                    // console.log(response);
                    setTeams(response.data)
                })
            axios.get(`http://localhost:8080/api/user/${userId}`)
                .then((response) => {
                    console.log(response.data);
                    setUserConnected(response.data)
                })
        }
        if (isConnected === false || userConnected.role === 'admin') {
            axios.get(`http://localhost:8080/api/team`)
                .then((response) => {
                    // console.log(userConnected);
                    console.log(response.data);
                    setTeams(response.data);
                    // setUserConnected(response.data)
                })
        }
        
    }, [userId, isConnected])
    // +++++++++++++++++++++++++++++++++++++++++++++++

    console.log(userConnected.role)  
    return (
        <>
            <main>
                {(userConnected.role === 'player' || userConnected.role === 'coach') ? 
                    <h1>Mes équipes</h1> : <h1>Toutes les équipes</h1>
                }

    {/* Si l'utilisateur connecté est 'admin' alors il a accès aux différents boutons lui permettant d'ajouter, modifier ou supprimer une équipe */}
                {userConnected.role === 'admin' &&
                    <Link to='/teamToAdd'><button>Ajouter une équipe</button></Link>
                }
    {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}            

                <div className='gridTeam'>
                    {teams.map(team => <TeamListItem  key={team._id} {...team}/>)}
                </div>
            </main>
            
        </>
    );
};

export default TeamList;