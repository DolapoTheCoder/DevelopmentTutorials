//Where the main part of the frontend is stored

import React, {Component} from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';

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
        } else {
            //if no tetherdata
            window.alert('Error! Tether contract not deployed.')
        }

        const rwdData = RWD.networks[networkId]
        //checking for tether data
        if(rwdData) {
            //tether contract abi(JSON) and address
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd}) //set state to tether contract so we can use props
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call() //getting the balance of the account
            this.setState({rwdBalance: rwdBalance.toString()})
        } else {
            //if no tetherdata
            window.alert('Error! RewardToken contract not deployed.')
        }

        const decentralBankData = DecentralBank.networks[networkId]
        //checking for tether data
        if(decentralBankData) {
            //tether contract abi(JSON) and address
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank}) //set state to tether contract so we can use props
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call() //getting the balance of the account
            this.setState({stakingBalance: stakingBalance.toString()})
        } else {
            //if no tetherdata
            window.alert('Error! RewardToken contract not deployed.')
        }
        this.setState({loading: false})
    }
        
    //deposit and unstaking tokens will be used here
    //for the actual Staking:

    //staking function:
    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false})
            })
        })
    }

    unstakeTokens = () => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
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
        let content 
        {this.state.loading ? 
            content = <p id='loader' className='text-center' style={{margin: '30px'}}>
                LOADING...</p> : content = 
                <Main 
                    tetherBalance = {this.state.tetherBalance}
                    rwdBalance = {this.state.rwdBalance}
                    stakingBalance = {this.state.stakingBalance}
                    stakeTokens = {this.stakeTokens}
                    unstakeTokens = {this.unstakeTokens}
                />}
        return (
            <div>
                <Navbar account={this.state.account}/>
                    <div className='container-fluid mt-5'>
                        <div className='row content'>
                            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'700px', minHeight: '100vm'}}>
                                <div>
                                    {content}    
                                </div>  
                            </main>
                        </div>
                    </div>
            </div>
        )
    }
}

export default App;