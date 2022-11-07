import React, {Component} from 'react';

class TransacionManager extends Component {



    render() {
        return (
            <>
                <div className="modal-class" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-body">
                            <h2 className="titleHeader">Transaction Manager</h2>
                            <div className="row">
                                <div
                                    onClick={() => this.props.whatTransaction()}
                                    className="orangeButton"
                                >  
                                    
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