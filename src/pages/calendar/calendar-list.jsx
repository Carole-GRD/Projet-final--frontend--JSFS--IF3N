import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarListItem from "./calendar-list-item";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const CalendarList = () =>{

    const [listEvent, setListEvent] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);
    const userRole = useSelector(state => state.auth.userRole);
    const navigate = useNavigate();

    useEffect(() => {
        setupEvents();
    }, [teamSelectedId]);


    const setupEvents = () => {
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
    }


    const onDeleteEvent = (id) => {
        axios.delete(`http://localhost:8080/api/event/${id}`)
            .then((response) => {
                setupEvents();
            })
            .catch()
    }


    return (
        <>
            <main>
                <div className='pageContainer'>
                    <h1>Calendrier</h1>
                    {teamSelectedName === '' && <h2>Liste de toutes les activités du React Volley Club</h2>}
                    {teamSelectedName !== '' && <h2>Liste de toutes les activités de l'équipe : {teamSelectedName}</h2>}
                    
                    {((userRole === 'coach' && teamSelectedName !== '') || userRole === 'admin') && 
                        <div>
                            <Link to='/eventToAdd'><button>Ajouter</button></Link>
                        </div>
                    }

                    <div className='gridCalendar'>
                        {listEvent.map(event => <CalendarListItem isPresent={setupEvents} isAbsent={setupEvents} deleteEvent={onDeleteEvent} key={event._id} {...event}/>)}
                    </div>
                </div>
            </main>
        </>
    );
};

export default CalendarList;