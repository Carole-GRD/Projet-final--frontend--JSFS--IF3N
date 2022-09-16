
const PlayerListItem = ({firstname, lastname, position}) => {


    return (
        <>            
            <div className='cardPlayer'>
                <p>{firstname} {lastname}</p>
                <p>{position}</p>
            </div>
        </>
    );
};

export default PlayerListItem;