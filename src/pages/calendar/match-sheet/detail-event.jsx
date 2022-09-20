import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailEventItem from './detail-event-item';




const DetailEvent = () => {

    
    const [listEvent, setListEvent] = useState([]);
    // const [listPresents, setListPresents] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/event/team/${teamSelectedId}`)
            .then((response) => {
                // console.log(response);
                console.log(response.data);
                setListEvent(response.data);
            })
    }, [teamSelectedId]);
    
    return (
        <>
            <main>
                <h1>Détail de l'évènement</h1>

                
                {listEvent.map(detail => <DetailEventItem key={detail._id} {...detail} />)}
                

                {/* <section className='containerAnswer'>
                    <article className='answer'>
                        <h2>En attente</h2>
                        <div className='gridAllPlayerList'>
                            {listPlayers.map(player => <AllPlayerList key={player._id} {...player} />)}
                        </div>
                    </article>
                    <article className='answer'>
                        <h2>Présent</h2>
                        
                    </article>
                    <article className='answer'>
                        <h2>Absent</h2>
                        
                    </article>
                </section> */}
                
            </main>
        </>
    )
};

export default DetailEvent;

