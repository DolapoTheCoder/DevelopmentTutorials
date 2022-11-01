import React, {Component} from 'react';

class SubmitModal extends Component {

    render() {
        return (
            <>
                <div className="modal-class" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-body">
                            <h2 className="titleHeader">Submit a transaction</h2>
                            <div className="row">
                                <div className="col-md-9 fieldContainer">
                                    <input
                                        className="inputField"
                                        placeholder="Address"
                                        onChange={e => this.props.sendSubmit(e.target.value, 'address')}
                                    />
                                    <input
                                        className="inputField"
                                        placeholder="Value"
                                        type='number'
                                        onChange={e => this.props.sendSubmit(e.target.value, 'value')}
                                    />
                                    <input
                                        className="inputField"
                                        placeholder="Message"
                                        onChange={e => this.props.sendSubmit(e.target.value, 'data')}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    onClick={() => this.props.submitTran()}
                                    className="orangeButton"
                                >  
                                    Submit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SubmitModal;