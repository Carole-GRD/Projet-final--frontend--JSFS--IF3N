// TODO: ↓ à supprimer lorsque la BDD sera faite
import player from '../../data/player.json';

import PlayerListItem from "./player-list-item";



const PlayerList = () =>{

    // console.log(player);
    

    // const playerRender = player.map(
    //     player => <PlayerListItem key={player.licence} {...player} />
    // );

    // const equipe = player.team;

    return (
        <>
            <main>
                <h1>Joueurs</h1>
                <button>P3H</button>
                <button>P3D</button>
                {/* <ul>
                    {playerRender}
                </ul> */}
                <div className='gridPlayer'>
                    {player.map(
                        onePlayer => <PlayerListItem key={onePlayer.licence} {...onePlayer} />
                    )}
                </div>
            </main>
            
        </>
    );
};

export default PlayerList;