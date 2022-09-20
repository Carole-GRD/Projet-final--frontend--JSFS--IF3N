import { useSelector } from "react-redux";

// import { useState } from "react";



const DetailEventItem = ({teamId, _id, presentId, absentId, name}) => {

    // const [listPresents, setListPresents] = useState([]);
    const eventSelectedName = useSelector(state => state.event.eventSelectedName);
    const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    return (
        <>  

            <h1>Évènement</h1>
            <p>Identifiant de l'évènement : {_id}</p>
            <p>Identifiant de l'équipe : {teamId._id}</p>
            <p>Nom de l'équipe : {teamId.name}</p>
            <p>Évènement : {name}</p>
            <p>Présent : {presentId.map(present => present.firstname + ' ' + present.lastname + ' - ')}</p>
            <p>Absents : {absentId.map(absent => absent.firstname + ' ' + absent.lastname + ' - ')}</p>

        </>
    )
};

export default DetailEventItem;