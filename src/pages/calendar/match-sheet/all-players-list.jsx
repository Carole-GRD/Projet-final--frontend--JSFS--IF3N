import { useSelector } from "react-redux";


const AllPlayerList = ({lastname, firstname, _id, isPresent}) => {

    const userId = useSelector(state => state.auth.userId);
    

    const present = () => {
        console.log(_id);
        isPresent(_id);
    }

    return (
        <>  
            <div className='cardAnswer'>
                <p>{firstname} {lastname}</p>
                {userId === _id &&
                    <div className='containerButton'>
                        <div className='buttonAnswer'>
                            {/* <button className='buttonPresent'>Présent</button> */}
                            <button onClick={present} className='buttonPresent'>Présent</button>
                            <button className='buttonAbsent'>Absent</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
};

export default AllPlayerList;