import React, {Component} from "react";

class Airdrop extends Component {

    constructor() {
        super()
        this.state = {time: {}, seconds: 20};
        this.timer = 0;
        //this.startTime = this.startTime.bind(this);
        //this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours, seconds, minutes
        hours = Math.floor(secs / (60*60))

        let devisor_for_minutes = secs % (60*60)
        minutes = Math.floor(devisor_for_minutes / 60)

        let devisor_for_seconds = devisor_for_minutes % 60
        seconds = Math.ceil(devisor_for_seconds)

        let obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        }

        return obj
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar})
    }

    render() {
        return(
            <div style={{color: 'black'}}> {this.state.time.m}:{this.state.time.s}</div>
        )
    }
}

export default Airdrop;