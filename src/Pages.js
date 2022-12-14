import Api from './Api'
import Table from './Table'
import Li from './List'
import React, { Component } from 'react'
import { createSearchParams } from "react-router-dom";


import * as buffer from "buffer";

// import 'https://fonts.googleapis.com/css?family=Open+Sans:300,400'
// import './layout/styles/font-awesome.min.css'
// import './layout/styles/bootstrap.min.css'
// import './layout/styles/templatemo-style.css'
// import './layout/scripts/modernizr.custom.86080.js'
// import './layout/scripts/particles.js'
// import './layout/scripts/app.js'

import QRCode from 'react-qr-code'
import { useState } from 'react'
import algosdk from "algosdk"
import MyAlgoConnect from "@randlabs/myalgo-connect"

window.Buffer = buffer.Buffer;
var isDistributer = false
var isAdmin = false
var isUser = false

const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ' //Manufacter
const assetId = 121415136

const reset = () => {
    isDistributer = false
    isAdmin = false
    isUser = false
}

const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2(
    "",
    "https://node.testnet.algoexplorerapi.io",
    ""
);
const encoder = new TextEncoder();


// class Main extends Component {
//     state = {
//         inputWalletTemp: ''
//         }

//     render() {
//         let {inputWalletTemp} = this.state
//         const { setWallet, setDataAll, setDataDistributer,  navigation } = this.props

//         //Ridirect function
//         const setRedirect = () => {
//             setWallet(inputWalletTemp)
//             navigation('/MainMenu')
//         }

//         return (
//             <div className="main">
//                 <Api setDataAll={setDataAll} setDataDistributer={setDataDistributer} />

//                 <h1>This is login page</h1>
//                 <center>
//                     <input
//                         type="text"
//                         onChange={(e) => this.setState({ inputWalletTemp: e.target.value })}
//                         placeholder="Insert wallet"
//                     />
//                 </center>
//                 {/* Set user wallet */}
//                 <button onClick={() => setRedirect()}>login</button>
//             </div >
//         )
//     }

// };

class Main extends Component {

    state = {
        inputWalletTemp: '',
        account: null,
        signedTx: null,
        challenge: ''
    }

    render() {
        let { account } = this.state
        const { setWallet, setDataAll, setDataDistributer, navigation } = this.props

        const connect = async () => {
            const [acc] = await myAlgoConnect.connect({
                shouldSelectOneAccount: true
            })

            setWallet(acc.address)
            navigation('/MainMenu')
        }

        return (

            <div className="App">
                <Api setDataAll={setDataAll} setDataDistributer={setDataDistributer} />

                <h1>Login account</h1>
                <button disabled={account} onClick={connect}>
                    Connect
                </button>

                {/* {account && (
                    <>
                        <h2>Connected Account Name: {account.name}</h2>
                        <h2>Connected Address: {account.address}</h2>

                        <h2>Deploy Here</h2>
                        <input onChange={updateChallenge} value={challenge} />
                        <button disabled={!challenge} onClick={sign}>
                            Deploy
                        </button>

                        <h2>Assign here</h2>
                        <input onChange={updateChallenge} value={challenge} />
                        <button disabled={!challenge} onClick={assign}>
                            Assign
                        </button>
                        <h2 id="status">Transaction Status: </h2>
                    </>
                )} */}
            </div>
        )
    }

};

class MainMenu extends Component {

    componentDidMount() {
        if (!this.props.wallet) {
            this.props.setWallet('')
            this.props.navigation('/')
            return
        }

        if (!isUser) {
            alert('Account has not been registered yet!')
            this.props.navigation('/')
            return
        }
    }
    render() {
        const { wallet, setWallet, dataDistributer, dataAll, dataView, setDataView, setDataAssign, navigation } = this.props

        if (wallet) {
            if (wallet === walletAdmin)
                isAdmin = true
            else {
                dataDistributer.forEach(distributer => {
                    if (wallet === distributer)
                        isDistributer = true
                })
            }
            if (isDistributer || isAdmin)
                isUser = true
        }

        if (!dataAll) {
            return (
                <div className="App">
                    <h1>Loading</h1>
                </div>
            )
        }

        if (isAdmin) {
            return (
                <div className="App">
                    <Api wallet={wallet} dataAll={dataAll} dataView={dataView} setDataView={setDataView} setDataAssign={setDataAssign} />

                    <h1>Instrument Check (Admin) </h1>
                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/Add')
                        }}
                    >Add</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAssign');
                        }}
                    >Assign</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAll');
                        }}
                    >View</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            setWallet('')
                            setDataView('')
                            setDataAssign('')
                            reset()
                            navigation('/');
                        }}
                    >Logout</button>
                </div>
            )
        }

        if (isDistributer) {
            return (
                <div className="App">
                    <Api wallet={wallet} dataAll={dataAll} dataView={dataView} setDataView={setDataView} setDataAssign={setDataAssign} />

                    <h1>Instrument Check (Distributer)</h1>
                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAssign');
                        }}
                    >Assign</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAll');
                        }}
                    >View</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            setWallet('')
                            setDataView('')
                            setDataAssign('')
                            reset()
                            navigation('/');
                        }}
                    >Logout</button>
                </div>
            )
        }


    }
};


const ViewAll = (props) => {
    if (isUser) {
        return (
            < div className="container" >
                <Table dataView={props.dataView} roles='user' navigation={props.navigation} />
            </div >
        )
    }

    return (
        < div className="container" >
            <Table dataView={props.dataView} navigation={props.navigation} />
        </div >
    )
};

const ViewAssign = (props) => {
    const wallet = props.wallet

    let [insId, setInsId] = useState()
    let [signedTx, setSignedTx] = useState()


    const assign_txt = 'serial_id:'

    const assign = async () => {
        try {
            let recieverAddress = prompt("Please enter receiver wallet address:", "");
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: wallet,
                to: recieverAddress,
                assetIndex: assetId,
                amount: 1,
                note: encoder.encode(assign_txt + insId)
            });

            const stx = await myAlgoConnect.signTransaction(txn.toByte());
            const b64Stx = Buffer.from(stx.blob).toString("base64");
            const response = await algodClient.sendRawTransaction(stx.blob).do();
            setSignedTx(b64Stx)
            alert("success")
            props.navigation('/')
        } catch (err) {
            console.error(err);
            alert("failed")
        }
    }

    if (insId) {
        if (!signedTx)
            assign()
    }

    return (
        < div className="container" >
            <Table dataAssign={props.dataAssign} setInsId={setInsId} navigation={props.navigation} />
        </div >
    )
};

const ViewInstrument = (props) => {
    return (
        < div className="container" >
            <Api dataIns={props.dataIns} setDataIns={props.setDataIns} index={props.index} navigation={props.navigate} />

            <Li dataIns={props.dataIns} roles={props.roles} navigation={props.navigation} />
        </div >
    )

    // if (!props.dataIns || props.lastIndex !== props.index) {
    //     props.setLastIndex(props.index)
    //     return ( 
    //         < div className="container" >
    //             <Api dataIns={props.dataIns} setDataIns={props.setDataIns} index={props.index} navigation={props.navigate} />
    //         </div >
    //     )
    // }

    // return (
    //     < div className="container" >
    //         <Li dataIns={props.dataIns} roles={props.roles} navigation={props.navigation} />
    //     </div >
    // )
};

const Qr = (props) => {
    const index = props.index
    const base_url = 'http://localhost:3000'
    const app_url = '/algo-test/ViewInstrument?id='
    const view_url = base_url + app_url + index

    return (
        <div className="detail">
            <QRCode
                title="Instrument"
                value={view_url}
                bgColor='white'
                fgColor='black'
                size={300}
            />
            <button onClick={() => props.navigation('/')}>Back</button>
        </div>
    )
};


const Add = (props) => {
    const wallet = props.wallet

    // let { account, signedTx, challenge } = this.state

    let [insId, setInsId] = useState()
    let [insName, setInsName] = useState()
    let [insType, setInsType] = useState()

    let [signedTx, setSignedTx] = useState()

    const getJson = () => {
        let instrument_json = {}

        instrument_json.ins_id = insId;
        instrument_json.ins_name = insName;
        instrument_json.ins_type = insType;

        return instrument_json
    }

    const sign = async () => {
        // console.log(getJson())
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: wallet,
                to: wallet,
                assetIndex: assetId,
                amount: 1,
                note: encoder.encode(JSON.stringify(getJson()))
            });

            const stx = await myAlgoConnect.signTransaction(txn.toByte());
            const b64Stx = Buffer.from(stx.blob).toString("base64");
            const response = await algodClient.sendRawTransaction(stx.blob).do();
            setSignedTx(b64Stx)
            alert("success")
            props.navigation(
                {
                    pathname: 'Qr',
                    search: createSearchParams({
                        id: insId
                    }).toString()
                }
            )
        } catch (err) {
            console.error(err);
            alert("failed")
        }
    };

    return (
        <div className="add">
            <label>Serial id:</label>
            <input
                type="text"
                onChange={(e) => setInsId(e.target.value)}
                placeholder="Input instrument id here"
            />
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setInsName(e.target.value)}
                placeholder="Input instrument name here"
            />
            <label>Type:</label>
            <input
                type="text"
                onChange={(e) => setInsType(e.target.value)}
                placeholder="Input instrument type here"
            />

            {/* <button onClick={() => set_full_url(view_url + instrument_id)}>Add</button> */}
            <button onClick={() => sign()}>Add</button>

            <button onClick={() => props.navigation('/MainMenu')}>Back</button>
        </div>
    )
};


const Assign = (props) => {
    return (

        <div className="assign">
            <h1>This is assign page</h1>
            <button onClick={() => props.navigation('/ViewAssign')}>Back</button>
        </div>
    )
};


const Detail = (props) => {
    return (

        <div className="detail">
            <h1>This is detail page</h1>
            <button onClick={() => props.navigation('/')}>Back</button>
        </div>
    )
};


export { Main, MainMenu, ViewAll, ViewAssign, ViewInstrument, Add, Qr, Assign, Detail };
