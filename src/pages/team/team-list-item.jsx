
import { useDispatch } from "react-redux";
import { setTeam } from "../../store/actions/team-action";

const TeamListItem = ({_id, coach, name, userId }) => {

    
    const dispatch = useDispatch();

    const handleSelectedTeam = () => {

            // dispatch(setTeam({name:name, teamId: _id}));
            dispatch(setTeam({name, teamId: _id}));

    }

    return (
        <>
            <button onClick={handleSelectedTeam}>
                <p>{name}</p>
                <p>{coach.firstname}</p>
            </button>
            {/* <p>{userId}</p> */}
        </>
    )
};

export default TeamListItem;