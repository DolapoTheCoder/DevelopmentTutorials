import React, {Component} from "react";
import './App.css';

class ListOfTrans extends Component {

    render() {
        return (
            <>
                <div className="assetContainerTransaction">
                    <div className="subContainerTransaction">
                        <span className="marketHeader">Transactions</span>
                    </div>
                    <div>
                        <div className="row columnHeaders">
                            <div className="col-md-2">Index</div>
                            <div className="col-md-2">Transaction</div>
                            <div className="col-md-2">Reciever</div>
                            <div className="col-md-2"></div>
                            <div className="col-md-2"></div>
                            <div className="col-md-2">Amount</div>
                        </div>
                    </div>
                    {this.props.listOfTrans.length == this.props.transCount && this.props.listOfTrans.map((transaction, idx) => {
                        return(
                            <div className="row" key={transaction} onClick={() => this.props.handleTrans(idx)}>
                                <div className="col-md-2">
                                    {idx}
                                </div>
                                <div className="col-md-2">
                                    {transaction[0][0]}
                                </div>
                                <div className="col-md-2">
                                    {transaction[0][1]}
                                </div>
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-2">
                                    {transaction[0][2]}
                                </div>
                            </div>
                        )})    
                    }
                </div>
            </>
        )
    }
}

export default ListOfTrans;