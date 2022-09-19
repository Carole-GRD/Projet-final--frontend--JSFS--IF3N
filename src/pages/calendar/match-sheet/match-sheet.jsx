import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AllPlayerList from "./all-players-list";



const MatchSheet = () => {

    const [listPlayers, setListPlayers] = useState([]);
    const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    // const teamSelectedName = useSelector(state => state.teams.teamSelectedName);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/team/${teamSelectedId}`)
            .then(function (response) {
                // console.log(response.data.userId);
                setListPlayers(response.data.userId)
            })
    }, [teamSelectedId])

    return (
        <>
            <main>
                <h1>Feuille de match</h1>
                <section className='containerAnswer'>
                    <article className='answer'>
                        <h2>En attente</h2>
                        <div className='gridAllPlayerList'>
                            {listPlayers.map(player => <AllPlayerList key={player._id} {...player} />)}
                        </div>
                    </article>
                    <article className='answer'>
                        <h2>Présent</h2>
                        {/* <div className='gridAllPlayerList'>
                            {listPlayers.map(player => <AllPlayerList key={player._id} {...player} />)}
                        </div> */}
                    </article>
                    <article className='answer'>
                        <h2>Absent</h2>
                        {/* <div className='gridAllPlayerList'>
                            {listPlayers.map(player => <AllPlayerList key={player._id} {...player} />)}
                        </div> */}
                    </article>
                </section>
                
            </main>
        </>
    )
};

export default MatchSheet;