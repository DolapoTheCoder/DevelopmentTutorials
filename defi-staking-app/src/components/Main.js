import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

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

                <Form>
                    <Form.Group className='mb-3' >
                        <Form.Label><b>Stake tokens Balance:</b></Form.Label>
                        <Form.Control type='text' placeholder='0' required/>
                    </Form.Group>

                </Form>
            </div>
        )
    }
}

export default Main;