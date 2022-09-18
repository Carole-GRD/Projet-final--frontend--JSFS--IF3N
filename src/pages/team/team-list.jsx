
import TeamListItem from './team-list-item';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const TeamList = () =>{

    const [teams, setTeams] = useState([]);
    // +++++++++++++++++++++++++++++++++++++++++++++++
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
        }
        if (isConnected === false) {
            axios.get(`http://localhost:8080/api/team`)
                .then((response) => {
                    // console.log(response);
                    setTeams(response.data)
                })
        }
    }, [userId])
    // +++++++++++++++++++++++++++++++++++++++++++++++
        
    return (
        <>
            <main>
                {isConnected === true ? <h1>Mes équipes</h1> : <h1>Toutes les équipes</h1>}
                
                <Link to='/teamToAdd'><button>Ajouter une équipe</button></Link>


                <div className='gridTeam'>
                    {teams.map(team => <TeamListItem  key={team._id} {...team}/>)}
                </div>


            </main>
            
        </>
    );
};

export default TeamList;