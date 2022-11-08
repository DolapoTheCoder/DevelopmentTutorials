import React, {Component} from 'react';

class TransacionManager extends Component {

    //need to check what is true 
    //if revokable == true then
    //load 1 button Revoke
        //if executable == true then
        //load antoher button Execute
    //if confirmable == true then
    //load 1 and only Confirm button

    //make a div that checks these things {&&return (<div>Confirm</div>)}


    render() {
        return (
            <>
                <div className="modal-class" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-body">
                            <h2 className="titleHeader">Transaction Manager</h2>
                            <div className="row">
                                <div className="orangeButton">  
                                    {this.props.isConfirmable && 
                                        <div 
                                            onClick={() => this.props.whatTransaction("confirm")}
                                            className="orangeButton">
                                            Confirm
                                        </div>
                                    }
                                    {this.props.isExecutable && 
                                        <div 
                                            onClick={() => this.props.whatTransaction("execute")}
                                            className="orangeButton">
                                            Execute
                                        </div>
                                    }
                                    {this.props.isRevokable && 
                                        <div 
                                            onClick={() => this.props.whatTransaction("revoke")}
                                            className="orangeButton">
                                            Revoke
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TransacionManager;