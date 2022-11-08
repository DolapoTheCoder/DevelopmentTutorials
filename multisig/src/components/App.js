import React, {Component} from 'react';
import './App.css'
import Web3 from 'web3';
import MultiSig from '../truffle_abis/MultiSig.json'
import NavBar from './NavBar';
import AddOwnerModal from './Modals/AddOwnerModal';
import DepositModal from './Modals/DepositModal';
import SubmitModal from './Modals/SubmitModal';
import ListOfTrans from './ListOfTrans';
import ListOfOwners from './ListOfOwners';
import TransationManager from './Modals/TransacionManager';
import {AiOutlineUserAdd, AiOutlineFileAdd, BsPiggyBank, BsHandThumbsUp, BsHandThumbsDown, BiMailSend} from 'react-icons/all'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            contractAddress: '',
            multiSig: {},
            loading: true,
            contractBalance: 0,
            listOfTrans: [],
            transCount: 0,
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
            },
            showTransacionManager: false,
            isExecutable: false,
            isConfirmable: false,
            isRevokable: false
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
                owners.push(tempOwn)
            }

            this.setState({owners})
          
            //RENDER TRANSACTIONS


            let tranCount = await this.state.multiSig.methods.transCount().call()
            this.setState({transCount:tranCount})            

            for (let j = 0; j<tranCount+1; j++) {
                this.getTransaction(j)
            }


            if (this.state.newOwner !== '') {
                let ownerAddress = []
                ownerAddress.push(this.state.newOwner)
                await multiSig.methods.newOwner(ownerAddress).call()
                window.location.reload(false)
            }
                            
        } else {
            //if no multiSigdata
            window.alert('Error!  contract not deployed.')
        }

    }

    getTransaction = async (tran) => {
        let tempTranArray = []
        let tempTran= await this.state.multiSig.methods.transactions(tran).call()
        tempTranArray.push([tempTran.data, tempTran.to, tempTran.value, tempTran.numOfConfirmations])
        
            let bigTempArray= []

            for (let k = 0; k<this.state.listOfTrans.length; k++) {
                bigTempArray.push(this.state.listOfTrans[k])
            }

            bigTempArray.push(tempTranArray)

            this.setState({listOfTrans: bigTempArray})
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
        this.setState({showSubmitModal: false})
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
                    value: Number(newTranVariable)
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

    submitTran = async () => {
        this.setState({openSubmitModal:false})

        //send transaction to contract
        
        //Is this sending to SMART CONTRACT
        await this.state.multiSig.methods.submit(this.state.newTran.to, this.state.newTran.value, this.state.newTran.data).send({from:this.state.account})
    }

    //handle the transaction
    handleTrans = async (idx, confirmations) => {
       //console.log(confirmations)

       this.setState({showTransacionManager: true})

        let isConfirmed = this.state.multiSig.methods.checkConfirmation(this.state.account, idx)
        if (isConfirmed == true) {
            this.setState({isRevokable: true})
            
            let minConfir = await this.state.multiSig.methods.minNumOfConfirmations().call() 
            
            if(confirmations >= minConfir) {
               this.setState({isExecutable: true})
            }
        }
        else {
            //LOAD A BUTTON TO CONFIRM
            this.setState({isConfirmable: true})
        }
        //check if user address has confirmed the transaction already:
        //if isConfirmed[idx][this.state.account] == true DONE
        // load a button that allows a user to revoke a transaction DONE
        // then if numOfConfirmations (this.state.listOfTrans[idx][3]) >= this.state.multiSig.methods.minNumOfConfirmations().call() then
        // a button that lets you execute transaction is displayed
        // through a this.setState.({isExecutable:true}) then
        // send this to the modal for transactions

        //if isConfirmed[idx][this.state.account] == false then
        // load a button that allows a user to confirm
        // through this.setState({isConfirmable:true}) 
        
    }

    whatTransaction = async (key) => {
        //confirm?
        //revoke?
        //execute?
        this.setState({showTransacionManager: false})
        console.log(key)
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
                                transCount={this.state.transCount}
                                listOfTrans={this.state.listOfTrans}
                                handleTrans={this.handleTrans}
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

                {this.state.showTransacionManager && (
                    <TransationManager
                        onClose={() =>  this.setState({showTransacionManager: false})}
                        whatTransaction = {this.whatTransaction}
                        isConfirmable={this.state.isConfirmable}
                        isExecutable={this.state.isExecutable}
                        isRevokable={this.state.isRevokable}
                    />
                )}

            </div>
        )
    }
}
export default App;