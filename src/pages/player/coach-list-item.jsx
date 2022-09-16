

const CoachListItem = ({firstname, lastname}) => {

    return (
        <>            
            <div className='cardPlayer'>
                <p>{firstname} {lastname}</p>
            </div>
        </>
    );
};

export default CoachListItem;