import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import tether from'../tether.png';
import Airdrop from './Airdrop';

class Main extends Component {
    render() {
        return (
            <div id='content' className='mt-3'>
                <Table>
                    <thead>
                        <tr>
                            <th space='col'>Staking Balance</th>
                            <th scope='col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='card mb-2' style={{opacity: '.9'}}>
                    <form className='mb-3'
                        onSubmit={(event) => {
                            event.preventDefault() //prevent refresh
                            let amount
                            amount = this.input.value.toString()
                            amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.stakeTokens(amount)
                        }}
                    >
                        <div style={{borderSpacing: '0 1em'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}>
                                <b>Stake tokens: </b> {window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} 
                            </label>
                            <span className='float-right' style={{marginRight: '8px'}}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} 
                            </span>
                            <div className='input-group mb-4'>
                                <input 
                                    type="text" 
                                    placeholder='0' 
                                    required 
                                    ref={(input) => {this.input = input}}/>
                                <div className='inpute-group-open'>
                                    <div className='input-group-text'>
                                        <img src={tether}alt='tether' height='64'/>  
                                        &nbsp;&nbsp;&nbsp; USDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-black'>Deposit</button>
                        </div>
                    </form>
                    <button className='btn btn-primary btn-lg btn-black' onClick={this.props.unstakeTokens}>Withdraw</button>
                    <div className='card-body text-center' style={{color: 'blue'}}>
                        AIRDROP <Airdrop stakingBalance = {this.props.stakingBalance}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
