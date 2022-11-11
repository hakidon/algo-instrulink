import {useNavigate} from "react-router-dom";

const Assign = ()  => {
    const navigate = useNavigate()

    return (

        <div className="add">
            <h1>This is assign page</h1>
            <button onClick={() => navigate('/ViewAssign')}>Back</button>
        </div>
    )
};

export default Assign;
