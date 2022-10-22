import React,{ Component } from "react";


class Balance extends Component {
    render() {
        return (
            <>
                <div>
                    Multi-Sig Balance: {this.props.contractBalance}
                </div>
            </>
        )
    }
}

export default Balance;