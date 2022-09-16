import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarListItem from "./calendar-list-item";
import axios from 'axios';

const CalendarList = () =>{

    const [listEvent, setListEvent] = useState([]);
    const teamId = useSelector(state => state.teams.teamId);
    const teamName = useSelector(state => state.teams.teamName);

    useEffect(() => {
        if (teamId !== '') {
            axios.get(`http://localhost:8080/api/event/team/${teamId}`)
                .then((response) => {
                    // console.log(response);
                    setListEvent(response.data);
                })
        }
        else {
            axios.get(`http://localhost:8080/api/event`)
            .then((response) => {
                console.log(response.data);
                setListEvent(response.data);
            })
        } 
    }, [teamId]);


    return (
        <>
            <main>
                <h1>Calendrier</h1>
                {teamName === '' && <h1>Liste de toutes les activités du React Volley Club</h1>}
                {teamName !== '' && <h1>Liste de toutes les activités de l'équipe : {teamName}</h1>}
                <div className='gridEvent'>
                    {listEvent.map(event => <CalendarListItem key={event._id} {...event}/>)}
                </div>
            </main>
        </>
    );
};

export default CalendarList;