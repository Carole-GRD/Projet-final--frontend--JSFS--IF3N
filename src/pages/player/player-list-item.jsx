// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTeam from './user-team';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

const PlayerListItem = ({firstname, lastname, position, id}) => {

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
            <div className='cardPlayer'>
                <p>{firstname} {lastname}</p>
                <p>{teams.map(team => <UserTeam key={team._id} {...team}/>)}</p>
                <p>{position}</p>
            </div>
        </>
    );
};

export default PlayerListItem;