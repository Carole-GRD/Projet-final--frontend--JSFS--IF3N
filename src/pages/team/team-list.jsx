
import TeamListItem from './team-list-item';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TeamList = () =>{

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // console.log(data);
        axios.get(`http://localhost:8080/api/team`)
            .then((response) => {
                // console.log(response);
                setTeams(response.data)
            })
        }, [])
        
    return (
        <>
            <main>
                <h1>Équipes</h1>
                
                <Link to='/teamToAdd'><button>Ajouter une équipe</button></Link>


                <div className='gridTeam'>
                    {teams.map(team => <TeamListItem  key={team._id} {...team}/>)}
                </div>


            </main>
            
        </>
    );
};

export default TeamList;