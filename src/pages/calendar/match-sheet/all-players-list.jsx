import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const AllPlayerList = ({lastname, firstname, _id, isPresent, isAbsent}) => {

    const userId = useSelector(state => state.auth.userId);
    
    const [listPlayers, setListPlayers] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
            .then(function (response) {
                // console.log(response.data);
                setListPlayers(response.data.userId);
            })  
    }, []);


    const present = () => {
        // console.log(_id);
        isPresent(_id);
    }

    const absent = () => {
        // console.log(_id);
        isAbsent(_id);
    }

    return (
        <>  
            <div className='cardAnswer'>
                <p>{firstname} {lastname}</p>
                {userId === _id &&
                    <div className='containerButton'>
                        <div className='buttonAnswer'>
                            <button onClick={present} className='buttonPresent'>Présent</button>
                            <button onClick={absent} className='buttonAbsent'>Absent</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
};

export default AllPlayerList;