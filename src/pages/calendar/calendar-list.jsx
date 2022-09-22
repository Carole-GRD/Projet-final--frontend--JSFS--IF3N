import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarListItem from "./calendar-list-item";
import axios from 'axios';
import { Link } from "react-router-dom";

const CalendarList = () =>{

    const [listEvent, setListEvent] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const isConnected = useSelector(state => state.auth.isConnected);
    const userRole = useSelector(state => state.auth.userRole);

    useEffect(() => {
        if (teamSelectedId !== '') {
            axios.get(`http://localhost:8080/api/event/team/${teamSelectedId}`)
                .then((response) => {
                    // console.log(response.data);
                    setListEvent(response.data);
                })
        }
        else {
            axios.get(`http://localhost:8080/api/event`)
            .then((response) => {
                // console.log(response.data);
                setListEvent(response.data);
            })
        } 
    }, [teamSelectedId]);

    return (
        <>
            <main>
                <h1>Calendrier</h1>
                {teamSelectedName === '' && <h2>Liste de toutes les activités du React Volley Club</h2>}
                {teamSelectedName !== '' && <h2>Liste de toutes les activités de l'équipe : {teamSelectedName}</h2>}
                
                {(isConnected && (userRole === 'coach' || userRole === 'admin')) && 
                    <div>
                        <Link to='/eventToAdd'><button>Ajouter</button></Link>
                    </div>
                }

                <div className='gridCalendar'>
                    {listEvent.map(event => <CalendarListItem key={event._id} {...event}/>)}
                </div>
            </main>
        </>
    );
};

export default CalendarList;