import React, {Component} from "react";
import bank from '../bank.png'

class Navbar extends Component {
    //our react code goes here
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor: 'black', height: '50px'}}>
                <a 
                className='navbar-brand col-sm-3 col-md-2 mr-0' 
                style={{color:'white'}}>
                    <img src={bank} alt='bank icon' width='50' height='30' className='d-inline-black align-top'/>
                    &nbsp; DApp Yeild Staking (Decentralized Bank) 
                </a>
                <ul className="navbar-nav">
                    <li>
                        <small style={{color: 'white'}}>
                            ACCOUNT NUMBER: {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;