import React, { Component } from 'react'
import TableView from './TableView' 

class ApiView extends Component {
    state = {
        data: []
        }
      
    // Code is invoked after the component is mounted/inserted into the DOM tree.
    componentDidMount() {
        const _this = this;
        const { index } = _this.props

        const url =
            'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/120764329/transactions?note-prefix=' +  btoa({index}.index)
        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                let records = [];

                result.transactions.forEach(element => {
                    records.push(element);
                });

                this.setState({ data: records })
            })
    }

    render() {
        const { data } = this.state;
        const { changePage } = this.props

        return (
            < div className="container" >
                <TableView tableData={data} changePage={changePage} />
            </div >
        )
    }
}

export default ApiView