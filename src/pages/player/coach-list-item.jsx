// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTeam from './user-team';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

const CoachListItem = ({firstname, lastname, id}) => {

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/user/${id}`)
            .then((response) => {
                // console.log(response.data);
                setTeams(response.data)
            })
        }, [id])
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return (
        <>  
            <article className='container'>      
                <div className='card'>
                    <h3>{firstname} {lastname}</h3>
                    <p>Équipe(s) : {teams.map(team => <UserTeam key={team._id} {...team} />)}</p>
                </div>
            </article>   
        </>
    );
};

export default CoachListItem;