//Where the main part of the frontend is stored

import React, {Component} from 'react';
import Navbar from './Navbar';

class App extends Component {

    //props sends property from one component to another
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0'
        }

    }

    //our react code goes here
    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className='text-center'>
                    <h1>Hello DeCentral Bank</h1>
                </div>
            </div>
        )
    }
}

export default App;