import React, {Component} from "react";
import './App.css';

class ListOfOwners extends Component {
    render() {
        return (
            <>
                <div className="assetContainer">
                    <div className="subContainer">
                        <span className="marketHeader">Owner's List</span>
                    </div>
                    <div>
                        <div className="row columnHeaders">
                        <div className="col-md-2">Index</div>
                        <div className="col-md-2">Owner</div>
                        <div className="col-md-2"></div>
                        </div>
                    </div>
                        <br />

                        {this.props.owners.length > 0 && this.props.owners.map((o, idx) => {
                            return(
                                <div className="row">
                                    <div className='col-md-2'>
                                        {idx}
                                    </div>
                                    <div className='col-md-2'>
                                        {o}
                                    </div>
                                </div>    
                            )
                        })}
                </div>
            </>
        )
    }
}

export default ListOfOwners;
