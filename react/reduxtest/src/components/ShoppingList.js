import React from 'react';
import {connect} from 'react-redux';

class ShoppingList extends React.Component {
	
	removeFromList = (event) => {
		console.log("ShoppingLIST - REMOVE_FROM_LIST");
		this.props.dispatch({
			type:"REMOVE_FROM_LIST",
			id:event.target.name			
		})
	}

	render() {
		let items = this.props.list.map(item => {
			return <tr key={item.id}>
						<td>{item.type}</td>
						<td>{item.count}</td>
						<td>{item.price}</td>	
						<td><button name={item.id}
						onClick={this.removeFromList}>Remove</button></td>
					</tr>
		})
		return(
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Count</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
				{items}
				</tbody>
			</table>
			
		)
	}
}

const mapStateToProps = (state) => {
	console.log("ShoppingList - mapStateToProps");
	return {
		list:state.list
	}
}

export default connect(mapStateToProps)(ShoppingList);