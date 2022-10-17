import React, {Component} from "react";
import eth_logo from '../eth_logo.png';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor: 'black', height: '50px'}}>
                <a 
                className='navbar-brand col-sm-3 col-md-2 mr-0' 
                style={{color:'white'}}>
                    <img src={eth_logo} alt='eth icon' width='30' height='30' className='d-inline-black align-top'/>
                    &nbsp; Multi-Sig Wallet
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

export default NavBar;