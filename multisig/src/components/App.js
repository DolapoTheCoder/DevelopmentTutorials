import React, {Component} from 'react';
import './App.css'
import Web3 from 'web3';
import MultiSig from '../truffle_abis/MultiSig.json'
import NavBar from './NavBar';
import AddOwnerModal from './Modals/AddOwnerModal';
import DepositModal from './Modals/DepositModal';
import SubmitModal from './Modals/SubmitModal';
//import Balance from './Balance';
import ListOfTrans from './ListOfTrans';
import ListOfOwners from './ListOfOwners';
import {AiOutlineUserAdd, AiOutlineFileAdd, BsPiggyBank, BsHandThumbsUp, BsHandThumbsDown, BiMailSend} from 'react-icons/all'

class App extends Component {

    //useEffect(() => {});
    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            contractAddress: '',
            multiSig: {},
            loading: true,
            contractBalance: 0,
            listOfTrans: [],
            owners: [],
            showAddOwner: false,
            newOwner: '',
            showDepositModal: false,
            depositAmount: 0,
            showSubmitModal: false,
            newTranTo: '',
            newTranValue: 0,
            newTranData: '',
            newTran: {
                to:'0x0',
                value:0,
                data:''
            }
        }
    }

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
        this.setState({contractAddress: multiSigData.address})

        //checking for multiSig data
        if(multiSigData) {
            //multiSig contract abi(JSON) and address
            const multiSig = new web3.eth.Contract(MultiSig.abi, multiSigData.address)
            this.setState({multiSig}) //set state to multiSig contract so we can use props
            
            //multiSig.methods()...?
            const conBalance = Web3.utils.fromWei(await multiSig.methods.walletBalance().call(), "ether")
            
            //walletBalance coming back as undefined
            if (conBalance > 0) {
                this.setState({contractBalance: conBalance})
            } else {
                this.setState({contractBalance: 0})
            }

            //RENDER OWNERS

            let owners = []
            
            let count = await multiSig.methods.ownersCount().call()
            
            for(let i = 0; i <= count; i++) {
                let tempOwn = await multiSig.methods.owners(i).call()
                //console.log(tempOwn)
                owners.push(tempOwn)
            }

            //console.log(owners)
            this.setState({owners})
          
            //RENDER TRANSACTIONS

            if(await multiSig.transCount >= 0) {
                let listOfTrans = []
                
                let countTrans = await multiSig.methods.transCount().call()
                
                for(let i = 0; i <= countTrans; i++) {
                    let tempOwnTrans = await multiSig.methods.transactions(i).call()
                    listOfTrans.push(tempOwnTrans)
                }

                this.setState({listOfTrans})

                if (this.state.newOwner !== '') {
                    let ownerAddress = []
                    ownerAddress.push(this.state.newOwner)
                    await multiSig.methods.newOwner(ownerAddress).call()
                    window.location.reload(false)
                }
            }

    
            
        } else {
            //if no multiSigdata
            window.alert('Error!  contract not deployed.')
        }

    }

    //ADD OWNER MODAL
    openAddOwner = async () => {
        this.setState({showAddOwner: true})
    }

    //add owner then to the new state
    changeAddOwner = async (newOwnerAdd) =>  {
        this.setState({newOwner: newOwnerAdd})
        //console.log(this.state.newOwner)
    }

    //add owner to contract
    addOwner = async () => {
        this.setState({showAddOwner: false})
        //console.log(this.state.newOwner)
        let ownerAddress = []
        ownerAddress.push(this.state.newOwner)
        console.log(ownerAddress)
        await this.state.multiSig.methods.newOwner(ownerAddress).send({from: this.state.account})
        //window.location.reload(false)
    }


    //DEPOSIT MODAL
    openDepositModal = async () => {
        this.setState({showDepositModal: true})
    }

    //add deposit then to the new state
    sendDeposit = async (depositAmount) =>  {
        this.setState({depositAmount})
    }

    //add deposit to contract
    depositFun = async () => {
        this.setState({showDepositModal: false})
        // need to send the ether to an address
        await this.state.multiSig.methods.deposit().send({from: this.state.account, to:this.state.contractAddress, value: Web3.utils.toWei(this.state.depositAmount, "ether")})
    }

    //SUBMIT TRANSACTION MODAL
    openSubmitModal = () => {
        this.setState({showSubmitModal: true})
    }

    sendSubmit = (newTranVariable, info) => {

        if (info === "address") {
            this.setState({newTranTo: newTranVariable})

            this.setState({
                newTran: {
                    ...this.state.newTran,
                    to: newTranVariable
                }
            })
        } else if (info === 'value') {
            this.setState({
                newTran: {
                    ...this.state.newTran,
                    value: newTranVariable
                }
            })
        } else {
            this.setState({
                newTran: {
                    ...this.state.newTran,
                    data: newTranVariable
                }
            })
        }
    }

    submitTran = () => {
        //ONLY WORKS ON SECOND PRESS OF BUTTON
        console.log('TRANSATION SUBMITTED')
        console.log(this.state.newTran)
    }

    

    //add owner, deposit, submit, confirm, revoke, execute

    render(){
        return (
            <div className="App">
                <div>
                    <NavBar account={this.state.account} contractBalance={this.state.contractBalance}/>
                </div>
      
                <div className="appBody">


                    <div className="marketContainer">
                        <div className="subContainer">
                            <span>
                                {/* <img className="logoImg" src="eth-logo.webp"/> */}
                            </span>
                            <span className="marketHeader">Multi-Signature Wallet 🏧</span>
                        </div>
        
                        <div className="row">
                            <div className="col-md-4">
                                <div onClick={this.openAddOwner} className="marketOption">
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
                                <div onClick={this.openDepositModal} className="marketOption">
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

                            <div className="col-md-4">
                                <div onClick={this.openSubmitModal} className="marketOption">
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

                {this.state.showAddOwner && (
                    <AddOwnerModal
                        onClose={() => this.setState({showAddOwner:false})}
                        addOwner={this.addOwner}
                        changeAddOwner={this.changeAddOwner}
                    />
                )}

                {this.state.showDepositModal && (
                    <DepositModal
                        onClose={() => this.setState({showDepositModal:false})}
                        depositFun={this.depositFun}
                        sendDeposit={this.sendDeposit}
                    />
                )}

                {this.state.showSubmitModal && (
                    <SubmitModal
                        onClose={() =>  this.setState({showSubmitModal: false})}
                        sendSubmit={this.sendSubmit}
                        submitTran={this.submitTran}
                    />
                )}

            </div>
        )
    }
}
export default App;