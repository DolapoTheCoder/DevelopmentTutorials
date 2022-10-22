import React,{ Component } from "react";


class Balance extends Component {
    render() {
        return (
            <>
                <div>
                    BALANCE: {this.props.contractBalance}
                </div>
            </>
        )
    }
}

export default Balance;