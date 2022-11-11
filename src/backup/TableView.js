import React, { Component } from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Ownership</th>
          {/* <th>View</th> */}
        </tr>
      </thead>
    )
  }

const TableBody = (props) => {
    const first_row = props.tableData.slice(0,1).map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.sender}</td>
            </tr>
        )
    })

    const rows = props.tableData.map((row, index) => {
        return (
            <tr key={index}>
                {/* <td>{row.sender}</td> */}
                <td>{row["asset-transfer-transaction"].receiver}</td>
                {/* <td><button onClick={() => props.changePage("view", row.ins_id)}>View</button></td> */}
            </tr>
        )
    })

    return <tbody> {first_row} {rows}</tbody>
}

class TableView extends Component {
    render() {
        const { tableData, changePage } = this.props

        return (
            <table>
                <TableHeader />
                <TableBody tableData={tableData} changePage={changePage}/>
                <button onClick={() => changePage('', '')}>Back</button>
            </table>
        )
    }
}

export default TableView
