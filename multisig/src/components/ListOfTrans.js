import React, {Component} from "react";
import './App.css';

class ListOfTrans extends Component {

    render() {
        return (
            <>
                <div className="assetContainer">
                    <div className="subContainer">
                        <span className="marketHeader">Transactions</span>
                    </div>
                    <div>
                        <div className="row columnHeaders">
                        <div className="col-md-2">Index</div>
                        <div className="col-md-2">Transaction</div>
                        <div className="col-md-2">Reciever</div>
                        <div className="col-md-2">Amount</div>
                        <div className="col-md-2">Confirmations</div>
                        </div>
                    </div>
                    {this.props.listOfTrans.length == this.props.transCount && this.props.listOfTrans.map((transaction, idx) => {
                        return(
                            <div className="row" key={transaction}>
                                <div className="col-md-2">
                                    {idx}
                                </div>
                                <div className="col-md-2">
                                    {console.log(transaction)}
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