


const PlayerListItem = ({firstname, lastname, team, role, poste}) => {

    // console.log(team);

    return (
        <>
            {/* <li>
                <p>{firstname + ' ' + lastname}</p>
            </li> */}
            
            {/* {team === ${team} && */}
            {team === "P3H" && (
                <div className='cardPlayer'>
                    <p>{firstname + ' ' + lastname}</p>
                    <p>{'Equipe : ' + team}</p>
                    <p>{'Role : ' + role}</p>
                    <p>{'Poste : ' + poste}</p>
                </div>
            )}
        </>
    );
};

export default PlayerListItem;