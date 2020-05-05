import React from 'react';
import {Link} from 'react-router-dom';


export default class NavBar extends React.Component {
	
	
	render() {
		let style = {
			height:60,
			backgroundcolor:"lightblue"
		}
		return (
			<div style={style}>
				<ul>
					<li><Link to="/">Shopping List</Link></li>
					<li><Link to="/form">Add to List</Link></li>
				</ul>
			</div>
		)
	}
}