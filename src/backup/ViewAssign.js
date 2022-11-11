import Api from './Api'
import {useNavigate} from "react-router-dom";

const ViewAssign = ()  => {
    const navigate = useNavigate()

    return (

        <Api render_type='view_assign' navigation={navigate}/>

    )
};

export default ViewAssign;