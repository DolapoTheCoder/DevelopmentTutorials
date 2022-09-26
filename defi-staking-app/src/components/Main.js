import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

class Main extends Component {
    render() {
        return (
            <div id='content' className='mt-3'>
                <Table stiped bordered hovers>
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
            </div>
        )
    }
}

export default Main;