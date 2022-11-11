import { Component } from 'react'

class Api extends Component {

    componentDidMount() {
        const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ' //Manufacter
        const asset_id = '121415136' //Instrument token
        const wallet = this.props.wallet
        const index = this.props.index

        // alice:
        // TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ

        // bob:
        // UOUTANWCKCKCVGNERCTD5HJILD6JLAYRUQIN4IZWHW5PS4ZHGSJWHQIVUY

        // choco:
        // 43M32JQKI5BU2L3K5AYJPJGSOPXOJ3GM57D3VCXHRA42BVHV6PBRQZ7DGI

        // irfan:
        // YL4XXE77R6O5B2X4EM2MGABN47SSF6G6YDDPXMKNUIZJGUSOWWBF2Y5POM

        let url = () => {
            if (index) {
                const base_txt = 'serial_id:'
                return 'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?note-prefix=' + btoa(base_txt + index)
            }
            if (wallet) {
                return 'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?address=' + wallet
            }
            return 'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?address-role=sender&address=' + walletAdmin
        }

        if (wallet) {
            if (this.props.dataView)
                return
        }

        fetch(url())
            .then((result) => result.json())
            .then((result) => {


                //If view instrument
                if (index) {
                    let temp_arr = []

                    result.transactions.forEach(element => {
                        temp_arr.push(element);
                    })
                    this.props.setDataIns(temp_arr)
                    return
                }

                //If user login
                if (wallet) {
                    let temp_arr_assign = []
                    let temp_arr_view = []

                    var elem = result.transactions
                    let allIns = this.props.dataAll

                    allIns.forEach((instrument) => {
                        var hasReceive = false
                        var hasSend = false

                        if (wallet !== walletAdmin) {
                            for (let i = 0; i < elem.length - 1; i++) {
                                if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                    if (elem[i]["asset-transfer-transaction"].receiver === wallet) {
                                        hasReceive = true
                                        break
                                    }
                                }
                            }

                            //Check send
                            for (let i = 0; i < elem.length - 1; i++) {
                                if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                    if (elem[i].sender === wallet) {
                                        hasSend = true
                                        break
                                    }
                                }
                            }

                        } else {
                            hasReceive = true
                            for (let i = 0; i < elem.length - 1; i++) {
                                if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                    if (elem[i]["asset-transfer-transaction"].receiver !== wallet) {
                                        hasSend = true
                                        break
                                    }
                                }
                            }
                        }


                        //append available into available assign
                        if (hasReceive && !hasSend)
                            temp_arr_assign.push(instrument);

                        //append available into available view
                        if (hasReceive)
                            temp_arr_view.push(instrument)
                    });

                    this.props.setDataAssign(temp_arr_assign)
                    this.props.setDataView(temp_arr_view)
                    return
                }

                //Fetch all instrument and distributer
                let temp_arr_instument = []
                let temp_arr_dist = []
                result.transactions.forEach((element, index, array) => {
                    if (index === (array.length - 1))
                        return

                    if (element["asset-transfer-transaction"].receiver === walletAdmin) {
                        let json_note
                        try {
                            json_note = JSON.parse(atob(element.note))
                            temp_arr_instument.push(json_note)
                        } catch (e) {
                            let dist_elem = atob(element.note).split('distributer:')[1]
                            if (dist_elem)
                                temp_arr_dist.push(dist_elem)
                        }
                    }
                });

                this.props.setDataAll(temp_arr_instument)
                this.props.setDataDistributer(temp_arr_dist)
                return
            })



    }

    render() {
        return
    }
}
export default Api