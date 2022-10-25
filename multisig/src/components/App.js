import React, {Component} from 'react';
import './App.css'
import Web3 from 'web3';
import MultiSig from '../truffle_abis/MultiSig.json'
import NavBar from './NavBar';
//import Balance from './Balance';
import ListOfTrans from './ListOfTrans';
import ListOfOwners from './ListOfOwners';
import {AiOutlineUserAdd, AiOutlineFileAdd, BsPiggyBank, BsHandThumbsUp, BsHandThumbsDown, BiMailSend} from 'react-icons/all'


class App extends Component {

    //useEffect(() => {});

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        //await this.loadTransOwners()
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
            
            //multiSig.methods()...?
            const conBalance = await multiSig.walletBalance
            
            if (conBalance !== undefined) {
                this.setState({contractBalance: conBalance})
            } 

            let owners = ['0x0000000000000000000000000000000000000']
            
            let count = await multiSig.methods.ownersCount().call()

            //console.log(await multiSig.methods.owners(0).call())

            //works
            //temp.push(await multiSig.methods.owners(0).call())

            //console.log(await multiSig.owners[0])
            
            for(let i = 0; i <= count-1; i++) {
                let tempOwn = await multiSig.methods.owners(i).call()
                console.log(tempOwn)
                owners.push(tempOwn)
            }

            //console.log(owners)
            this.setState({owners})
                    
            
        } else {
            //if no multiSigdata
            window.alert('Error!  contract not deployed.')
        }

    }

    /* //getTransactions function
    async loadTransOwners() {
        //this.setState({loading: true})
        // let transCount = await this.state.multiSig.transCount
        // if (transCount > 0) {
        //     //if there are transactions load them into
        //     let temp = []
        //     for (let i = 0; i < transCount; i++) {
        //         temp.push(await this.state.multiSig.transactions[i])
        //     }
        //     this.setState({listOfTrans: temp})
        // }

        let ownersCount = await this.state.multiSig.ownersCount
        if (ownersCount >= 0) {
            //if there are transactions load them into
            let temp = []
            temp.push(this.state.account)
            console.log(temp)
            // for (let i = 0; i < ownersCount; i++) {
            //     temp.push(await this.state.multiSig.owners[i])
            // }
            this.setState({owners: temp})
            //console.log(ownersCount)
        }
    } */
    
    

    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            multiSig: {},
            loading: true,
            contractBalance: 0,
            listOfTrans: [],
            owners: []
        }
    }

    //add owner, deposit, submit, confirm, revoke, execute

    render(){
        return (
            <div className="App">
                <div>
                    <NavBar account={this.state.account} contractBalance={this.state.contractBalance}/>
                </div>
      
                <div className="appBody">

                    {/* <div>
                        <Balance contractBalance={this.state.contractBalance}/>
                    </div> */}

                    <div className="marketContainer">
                        <div className="subContainer">
                            <span>
                                {/* <img className="logoImg" src="eth-logo.webp"/> */}
                            </span>
                            <span className="marketHeader">Multi-Signature Wallet 🏧</span>
                        </div>
        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <AiOutlineUserAdd/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Add Owner</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <AiOutlineFileAdd/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Submit</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <BsPiggyBank/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Deposit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className='row'>
                            
                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <BiMailSend/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Execute</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <BsHandThumbsUp/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Confirm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="marketOption">
                                    <div className="glyphContainer hoverButton">
                                        <span className="glyph">
                                            <BsHandThumbsDown/>
                                        </span>
                                    </div>
                                    <div className="optionData">
                                        <span>Revoke</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <br></br>

                        
                        <div>
                            <ListOfOwners 
                                owners={this.state.owners}
                            />
                        </div>

                        <div>
                            <ListOfTrans 
                                transactions={this.state.listOfTrans}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default App;