//Where the main part of the frontend is stored

import React, {Component} from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import { CLIENT_RENEG_WINDOW } from 'tls';

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        //checks for metamask
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            //or if we find another provider we go with that...
            window.web3 = new Web3(window.eth.currentProvider)
        } else {
            window.alert('No Ethereum browser detected! Please use MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()

        
        //load the tether contract
        const tetherData = Tether.networks[networkId]

        //checking for tether data
        if(tetherData) {
            //tether contract abi(JSON) and address
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether}) //set state to tether contract so we can use props
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call() //getting the balance of the account
            this.setState({tetherBalance: tetherBalance.toString()})
            console.log({balance: tetherBalance})
        } else {
            //if no tetherdata
            window.alert('Error! Tether contract not deployed.')
        }
    }
        

    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }

    }

    //our react code goes here
    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                    <div className='text-center'>
                        <h1></h1>
                    </div>
            </div>
        )
    }
}

export default App;