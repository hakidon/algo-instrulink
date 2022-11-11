import { useNavigate, useSearchParams } from "react-router-dom";

import Api from './Api'

const ViewInstrument = ()  => {
    const navigate = useNavigate()
    const [url_param] = useSearchParams()

    return (

        <Api render_type='view_instrument' index={url_param.get('id')} navigation={navigate}/>

    )
};

export default ViewInstrument;