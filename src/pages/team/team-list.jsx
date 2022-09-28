
import TeamListItem from './team-list-item';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const TeamList = () => {

    const [teams, setTeams/*, updateTeams*/] = useState([]);

    const userRole = useSelector(state => state.auth.userRole);
    const isConnected = useSelector(state => state.auth.isConnected);
    const userId = useSelector(state => state.auth.userId);
    
    useEffect(() => {
        // console.log(data);
        if (isConnected === true && userRole !== 'admin'){
            axios.get(`http://localhost:8080/api/team/user/${userId}`)
                .then((response) => {
                    // console.log(response);
                    setTeams(response.data)
                })
        }
        if (isConnected === false || userRole === 'admin') {
            axios.get(`http://localhost:8080/api/team`)
                .then((response) => {
                    setTeams(response.data);
                })
        }
    }, [userId, isConnected])

    const onDeleteTeam = (id) => {
        axios.delete(`http://localhost:8080/api/team/${id}`)
            .then((response) => {
                axios.get(`http://localhost:8080/api/team`)
                .then((response) => {
                    setTeams(response.data);
                })
            })
            .catch()
    } 

    return (
        <>
            <main>
                <div className='pageContainerTeam'>

                    {(userRole === 'admin' || isConnected === false) ? 
                        <h1>Toutes les équipes</h1> : <h1>Mes équipes</h1>
                    }

        {/* Si l'utilisateur connecté est 'admin' alors il a accès aux différents boutons lui permettant d'ajouter, modifier ou supprimer une équipe */}
                    {(isConnected === true && userRole === 'admin') ?
                        <Link to='/teamToAdd'><button className='buttonAdmin'>Ajouter une équipe</button></Link>
                        : null
                    }
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}            

                    {<div className='gridContainer'>
                        <div  className='grid'>
                            {teams.map(team => <TeamListItem deleteTeam={onDeleteTeam} key={team._id} {...team}/>)}
                        </div>
                    </div>}
                </div>
            </main>
        </>
    );
};

export default TeamList;