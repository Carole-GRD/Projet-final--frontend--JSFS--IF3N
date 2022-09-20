import { useSelector } from "react-redux";


const AllPlayerList = ({lastname, firstname, _id}) => {

    // const teamSelectedId = useSelector(state => state.teams.teamSelectedId);
    const userId = useSelector(state => state.auth.userId);
    
    return (
        <>  
            <div className='cardAnswer'>
                <p>{firstname} {lastname}</p>
                {userId === _id &&
                    <div className='containerButton'>
                        <div className='buttonAnswer'>
                            <button className='buttonPresent'>Présent</button>
                            <button className='buttonAbsent'>Absent</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
};

export default AllPlayerList;