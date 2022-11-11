import React, { Component } from 'react'
import Table from '../Table'

class Api extends Component {
    componentDidMount() {

    }


    render() {
        const { index, wallet,  } = this.props

        // var [dataAll, setDataAll] = useState();
        // var [dataView, setDataView] = useState();
        // var [dataAssign, setDataAssign] = useState();
        // var [dataIns, setDataIns] = useState();


        if (!{ getData }.getData)
            return <h5>Loading...</h5>

        if (!{ data }.data.length) {
            if ({ render_type }.render_type === 'view_instrument') {
                return (
                    < div className="container" >
                        <Table tableData={[]} render_type={render_type} navigation={navigation} />
                    </div >
                )
            }

            return <h5>No data fetch!</h5>
        }


        return (
            < div className="container" >
                <Table tableData={data} render_type={render_type} navigation={navigation} />
            </div >
        )
    }
}

export default Api