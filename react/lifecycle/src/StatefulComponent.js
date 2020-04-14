import React from 'react';

export default class StatefulComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log("StatefulComponent - constructor");
		console.log(props);
		this.state = {
			seconds:0,
			timerId:0
		}
	}
	
	static getDerivedStateFromProps(props,oldState) {
		console.log("StatefulComponent - getDerivedStateFromProps");
		console.log("Props:",props);
		console.log("State:",oldState);
		return oldState;
	}
	
	componentDidMount() {
		console.log("StatefulComponent - componentDidMount");
		let tempTimerId = setInterval(this.startTimer,1000);
		this.setState({
			timerId:tempTimerId
		})
	}
	
	componentWillUnmount() {
		console.log("StatefulComponent - componentWillUnmount");
		clearInterval(this.state.timerId);
	}
	
	componentDidUpdate() {
		console.log("StatefulComponent - componentDidUpdate");
	}
	
	
	startTimer = () => {
		let tempSeconds = this.state.seconds;
		tempSeconds++;
		this.setState({
			seconds:tempSeconds
		})
	}
	
	render() {
		let count = this.state.seconds.toString();
		return(
			<h2>{count} seconds since page loaded</h2>
		)
	}
}