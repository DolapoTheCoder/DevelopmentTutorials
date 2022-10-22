import React, {Component} from "react";
import './App.css';

class ListOfTrans extends Component {
    render() {
        return (
            <>
                <div className="appBody">
                    <div className="marketContainer">
                        <div className="subContainer">
                            <span className="marketHeader">Transactions List</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ListOfTrans;