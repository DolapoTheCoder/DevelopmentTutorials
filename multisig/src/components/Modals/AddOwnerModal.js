import React, {Component} from 'react';

class AddOwnerModal extends Component {


    render() {
        return (
            <>
                <div className="modal-class" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-body">
                            <h2 className="titleHeader">Add owner</h2>
                            <div className="row">
                                <div className="col-md-9 fieldContainer">
                                    <input
                                        className="inputField"
                                        placeholder="0x0"
                                        onChange={e => this.props.changeAddOwner(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    onClick={() => this.props.addOwner()}
                                    className="orangeButton"
                                >  
                                    Add
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddOwnerModal;