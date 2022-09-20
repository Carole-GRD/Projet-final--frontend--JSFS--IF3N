// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTeam from './user-team';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

const CoachListItem = ({firstname, lastname, _id}) => {

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/user/${_id}`)
            .then((response) => {
                // console.log(response.data);
                setTeams(response.data)
            })
        }, [_id])
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return (
        <>  
            <article className='container'>      
                <div className='card'>
                    <h3>{firstname} {lastname}</h3>
                    <p>Équipe(s) : {teams.map(coach => <UserTeam key={coach._id} {...coach} />)}</p>
                </div>
            </article>   
        </>
    );
};

export default CoachListItem;