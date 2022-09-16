

const CalendarListItem = ({/*teamId,*/ name, date, time, opposingTeam/*, presentId, absentId*/}) => {
    return (
        <>
            <div className='cardEvent'>
                <p>{name}</p>
                <p>{date}</p>
                <p>{time}</p>
                <p>{opposingTeam !== '' && (opposingTeam)}</p>
            </div>
            
        </>
    );
};

export default CalendarListItem;