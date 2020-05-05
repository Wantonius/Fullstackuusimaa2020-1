import React from 'react';
import {connect} from 'react-redux';

class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type:"",
			count:0,
			price:0
		}
	}


	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let tempObject = {
			type:this.state.type,
			price:this.state.price,
			count:this.state.count
		}
		console.log("ShoppingForm - dispatch ADD_TO_LIST");
		this.props.dispatch({
			type:"ADD_TO_LIST",
			item:tempObject
		})
		this.setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="type">Type</label>
				<input type="text"
						name="type"
						value={this.state.type}
						onChange={this.onChange}/>
				<br/>
				<label htmlFor="type">Count</label>
				<input type="number"
						name="count"
						value={this.state.count}
						onChange={this.onChange}/>
				<br/>
				<label htmlFor="type">Price</label>
				<input type="number"
						name="price"
						value={this.state.price}
						onChange={this.onChange}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
}

export default connect()(ShoppingForm);