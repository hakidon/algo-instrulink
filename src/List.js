import React, { Component } from 'react'

const ListHeader = () => {
    return (<header>
        <div class="ownership-title">
            <h1>CHAIN OF OWNERSHIP</h1>
        </div>
    </header>)
}

const ListBody = (props) => {
    var lis
    const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ'

    const first_li = () => {
        return (
            <li><strong> Manufacture </strong>{walletAdmin}</li>
        )
    }
    if (props.lisData) {
        lis = props.lisData.map((li, index) => {
            return (
                <li><strong> Distributor {index + 1} </strong>{li["asset-transfer-transaction"].receiver}</li>
            )
        })

        return <ol>{first_li()}{lis}</ol>
    }

    return <ol>{first_li()}</ol>
}


class Li extends Component {

    render() {
        const { dataIns, roles, navigation } = this.props

        if (!dataIns) {
            return (
               <h1>Please wait loading</h1>
            )  
        }
        if (roles) {
            return (
                <div className="display">
                        <ListHeader />
                        <ListBody lisData = {dataIns}/>
                    <button onClick={() => navigation('/ViewAll')}>Back</button>
                </div>
            )
        }
        return (
            <div className="display">
                    <ListHeader />
                    <ListBody lisData = {dataIns}/>
            </div>
        )

    }
}

export default Li
