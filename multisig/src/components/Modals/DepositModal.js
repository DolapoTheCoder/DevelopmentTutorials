import React, {Component} from 'react';

class DepositModal extends Component {

    render() {
        return (
            <>
                <div className="modal-class" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-body">
                            <h2 className="titleHeader">Deposit</h2>
                            <div className="row">
                                <div className="col-md-9 fieldContainer">
                                    <input
                                        className="inputField"
                                        placeholder="0"
                                        onChange={e => this.props.sendDeposit(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    onClick={() => this.props.depositFun()}
                                    className="orangeButton"
                                >  
                                    Deposit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DepositModal;