import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { multiSigAbi, contractAddress } from './utils/constants';
import {useEffect, useState} from 'react';

const web3 = new Web3("ws://localhost:8545")
const multiSigContract = new web3.eth.Contract(multiSigAbi, contractAddress);



function App() {
  const [depositAmount, newdepositAmount] = useState("");
  const [recipient, newRecipient] = useState("");
  const [amount, newAmount] = useState("");

  const sendDeposit = async () => {
    await multiSigContract.methods.deposit().send({from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'})
    await multiSigContract.methods.deposit().send({from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'})
    await multiSigContract.methods.deposit().send({from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'})
  }

  const subtmitTrans = async () =>{
    await multiSigContract.methods.submit(recipient, amount, "OxOO").send({from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'})
  }

  return (
    <>
      <div>
        <input placeholder='Deposit amount' value={depositAmount} onChange={(e) => newdepositAmount(e.target.value)} />
        <button onClick={() => sendDeposit()}>
          Deposit!
        </button>
      </div>
      
      <div>
        <input placeholder='Recipient address' value={recipient} onChange={(e) => newRecipient(e.target.value)}/>
        <input placeholder='Amount' value={amount} onChange={(e) => newAmount(e.target.value)}/>
        <button onClick={() => subtmitTrans()}>
          Submit Transaction
        </button>
      </div>
  </> 
  );
}

export default App;
