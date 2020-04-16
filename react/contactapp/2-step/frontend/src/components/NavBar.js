import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';


export default class NavBar extends React.Component {

	render() {
		let style = {
			height:100,
			backgroundColor:"lightblue"
		}
	if(this.props.isLogged) {
		return( <div style={style}>
					<Header>Contact App</Header>
					<List>
						<List.Item><Link to="/list">Contacts</Link></List.Item>
						<List.Item><Link to="/form">Add new contact</Link></List.Item>
						<List.Item><Link to="/" 
						onClick={()=>{this.props.onLogout()}}>Logout</Link></List.Item>
					</List>
				</div>
		)
	} else {
		return (<div style={style}>
					<Header>Contact App</Header>
				</div>)
	}
	}

}