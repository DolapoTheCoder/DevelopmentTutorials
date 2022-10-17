import React, {Component} from 'react';
import Web3 from 'web3';
import MultiSig from '../truffle_abis/MultiSig.json'
import NavBar from './NavBar';

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
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()

        
        //load the multiSig contract
        const multiSigData = MultiSig.networks[networkId]

        //checking for multiSig data
        if(multiSigData) {
            //multiSig contract abi(JSON) and address
            const multiSig = new web3.eth.Contract(MultiSig.abi, multiSigData.address)
            this.setState({multiSig}) //set state to multiSig contract so we can use props
        } else {
            //if no multiSigdata
            window.alert('Error!  contract not deployed.')
        }
    }

    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            multiSig: {},
            loading: true
        }
    }


    render(){
        return (
            <div>
                <NavBar account={this.state.account}/>
                <h1>Hello</h1>
            </div>
        )
    }
}
export default App;