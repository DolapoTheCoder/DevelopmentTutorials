import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './utils/constants';

const web3 = new Web3("ws://localhost:8545")
const multiSigContract = new web3.eth.Contract(contractAbi, contractAddress);



function App() {
  //return ();
}

export default App;
