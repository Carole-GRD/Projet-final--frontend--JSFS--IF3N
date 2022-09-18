import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarListItem from "./calendar-list-item";
import axios from 'axios';

const CalendarList = () =>{

    const [listEvent, setListEvent] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    useEffect(() => {
        if (teamSelectedId !== '') {
            axios.get(`http://localhost:8080/api/event/team/${teamSelectedId}`)
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
    }, [teamSelectedId]);


    return (
        <>
            <main>
                <h1>Calendrier</h1>
                {teamSelectedName === '' && <h1>Liste de toutes les activités du React Volley Club</h1>}
                {teamSelectedName !== '' && <h1>Liste de toutes les activités de l'équipe : {teamSelectedName}</h1>}
                <div className='gridEvent'>
                    {listEvent.map(event => <CalendarListItem key={event._id} {...event}/>)}
                </div>
            </main>
        </>
    );
};

export default CalendarList;