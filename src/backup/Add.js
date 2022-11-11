import {useNavigate} from "react-router-dom";

const Add = () => {
    const navigate = useNavigate()

    return (

        <div className="add">
            <h1>This is add page</h1>
            <button onClick={() => navigate('/')}>Back</button>
        </div>

    )
};

export default Add;