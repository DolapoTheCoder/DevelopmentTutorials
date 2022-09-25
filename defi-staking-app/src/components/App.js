//Where the main part of the frontend is stored

import React, {Component} from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';

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
        console.log(account)
    }

    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0'
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