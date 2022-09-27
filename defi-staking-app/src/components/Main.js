import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import tether from'../tether.png'

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
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <form>
                        <div>
                            <label className='float-left' style={{marginLeft: '15px'}} for='stakeTokenBalance'>
                                Stake tokens Balance:
                            </label>
                            <input type="text" placeholder='0' required id='stakeTokenBalance'/>
                            <div className='inpute-grouped-open'>
                                <div className='input-group-text'>
                                    <img src={tether}alt='tether' height='64'/>  
                                    &nbsp;&nbsp;&nbsp; USDT
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-black'>Deposit</button>
                        </div>
                    </form>
                    <button className='btn btn-primary btn-lg btn-black'>Withdraw</button>
                    <div className='card-body text-center' style={{color: 'black'}}>
                        AIRDROP (add timer)
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;