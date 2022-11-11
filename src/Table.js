import React, { Component } from 'react'
import { createSearchParams } from "react-router-dom";

const TableHeader = (props) => {
    if (props.render_type === 'view_all') {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>View</th>
                </tr>
            </thead>
        )
    } else if (props.render_type === 'view_assign') {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assign</th>
                </tr>
            </thead>
        )
    }

    return
}

const TableBody = (props) => {
    var rows
    const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ'

    let page = props.render_type === 'view_all' ? '/ViewInstrument' : '/Assign'
    let page_txt = props.render_type === 'view_all' ? 'View' : 'Assign'
    rows = props.tableData.map((row, index) => {
        if (props.roles) {
            return (
                <tr key={index}>
                    <td>{row.ins_id}</td>
                    <td>{row.ins_name}</td>
                    <td>{row.ins_type}</td>
                    <td><button
                        onClick={() => {
                            props.navigation(
                                {
                                    pathname: page,
                                    search: createSearchParams({
                                        id: row.ins_id,
                                        roles: props.roles
                                    }).toString()
                                }
                            );
                        }}>{page_txt}</button></td>
                </tr>
            )
        }
        return (
            <tr key={index}>
                <td>{row.ins_id}</td>
                <td>{row.ins_name}</td>
                <td>{row.ins_type}</td>
                <td><button
                    onClick={() => {
                        props.navigation(
                            {
                                pathname: page,
                                search: createSearchParams({
                                    id: row.ins_id
                                }).toString()
                            }
                        );
                    }}>{page_txt}</button></td>
            </tr>
        )
    })
    // }

    // if (!props.tableData)
    //     return <tbody>{first_row()}</tbody>

    // if (props.render_type === 'view_instrument')
    //     return <tbody>{first_row()}{rows}</tbody>

    return <tbody>{rows}</tbody>
}


class Table extends Component {

    render() {
        const { dataView, dataAssign, roles, navigation } = this.props

        var button_page
        var render_type

        button_page = '/MainMenu'
        if (dataAssign) {
            render_type = 'view_assign'
            if (!dataAssign.length)
                return <h1>No available instrument to assign</h1>

            return (
                <div className="display">
                    <table>
                        <TableHeader render_type={render_type} />
                        <TableBody tableData={dataAssign} render_type={render_type} navigation={navigation} />
                    </table>
                    <button onClick={() => navigation(button_page)}>Back</button>
                </div>
            )

        } else if (dataView) {
            render_type = 'view_all'
            if (!dataView.length)
                return <h1>No instrument to view</h1>

            if (roles) {
                return (
                    <div className="display">
                        <table>
                            <TableHeader render_type={render_type} />
                            <TableBody tableData={dataView} render_type={render_type} roles={roles} navigation={navigation} />
                        </table>
                        <button onClick={() => navigation(button_page)}>Back</button>
                    </div>
                )
            }

            return (
                <div className="display">
                    <table>
                        <TableHeader render_type={render_type} />
                        <TableBody tableData={dataView} render_type={render_type} navigation={navigation} />
                    </table>
                    <button onClick={() => navigation(button_page)}>Back</button>
                </div>
            )
        }
        //Return nothing if error
        return
        // }
    }
}

export default Table
